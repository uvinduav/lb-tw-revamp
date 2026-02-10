import React, { useState, useEffect, useRef, useMemo } from 'react';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  SquareArrowOutUpRight,
  Pencil,
  Trash2,
  Download,
  Plus,
  Settings,
  MoreVertical,
  AlertCircle,
  Loader2,
  RotateCw,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import csvFile from '../assets/accounts-test-sheet.csv?raw';

const HighlightText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }

  const parts = String(text).split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="highlight">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

const COLUMN_DEFS = [
  { id: 'accountNumber', label: 'ACCOUNT NO.', style: { fontWeight: 500 } },
  { id: 'bank', label: 'BANK', style: { fontWeight: 600 } },
  { id: 'branch', label: 'BRANCH' },
  { id: 'type', label: 'TYPE' },
  { id: 'currency', label: 'CURRENCY', style: { fontWeight: 500 } },
  { id: 'amount', label: 'AMOUNT', style: { fontFamily: 'monospace', fontWeight: 500 } },
  { id: 'rate', label: 'RATE', accessor: (row) => row.rate !== '-' && row.rate !== 'N/A' ? `${row.rate}%` : '-' },
  { id: 'interestType', label: 'INT. TYPE' },
  { id: 'startDate', label: 'START DATE' },
  { id: 'duration', label: 'DURATION' },
  {
    id: 'status',
    label: 'STATUS',
    accessor: (row, query) => (
      <span className={`status-pill ${row.status === 'Active' ? 'status-active' : 'status-renewed'}`}>
        <HighlightText text={row.status} highlight={query} />
      </span>
    )
  }
];

const AccountsTable = () => {
  const [allData, setAllData] = useState([]); // Store full dataset
  const [visibleData, setVisibleData] = useState([]); // Store displayed subset
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(COLUMN_DEFS.map(col => col.id))
  );
  const [isColumnPopoverOpen, setIsColumnPopoverOpen] = useState(false);

  const searchInputRef = useRef(null);
  useKeyboardShortcuts(searchInputRef, setIsFilterModalOpen);

  const lastScrollTopA = useRef(0);
  const tableContainerRef = useRef(null);
  const ITEMS_PER_BATCH = 20;

  const filteredData = useMemo(() => {
    return allData.filter(row => {
      // Global Search
      const searchMatch = !debouncedSearchQuery || Object.values(row).some(val =>
        String(val).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );

      // Granular Filters
      const filterMatch = Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;
        // Map UI keys to row object keys
        const rowKeyMap = {
          'Account No.': 'accountNumber',
          'Bank': 'bank',
          'Branch': 'branch',
          'Type': 'type',
          'Currency': 'currency',
          'Status': 'status'
        };
        const actualKey = rowKeyMap[key] || key;
        return String(row[actualKey]).toLowerCase().includes(value.toLowerCase());
      });

      return searchMatch && filterMatch;
    });
  }, [allData, debouncedSearchQuery, activeFilters]);

  // Count active filters (ignore empty strings or nulls)
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).filter(val => val && val.trim() !== '').length;
  }, [activeFilters]);

  // Search Debounce Effect
  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsSearching(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, debouncedSearchQuery]);

  useEffect(() => {
    const parseCSV = (csvText) => {
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      const rows = lines.slice(1).filter(line => line.trim() !== '').map((line, index) => {
        const values = line.split(',');
        const entry = {};
        headers.forEach((header, i) => {
          entry[header] = values[i]?.trim();
        });

        return {
          id: index,
          accountNumber: entry['Account Number'],
          bank: entry['Bank'],
          branch: entry['Branch'],
          type: entry['Product Type'],
          currency: entry['Currency'],
          amount: entry['Value'] || '-',
          rate: entry['Current Rate (%)'] || '-',
          interestType: 'Fixed',
          startDate: entry['Start Date'],
          duration: entry['Duration (Days)'] || '-',
          status: entry['Status']
        };
      });
      return rows;
    };

    if (csvFile) {
      const parsedData = parseCSV(csvFile);
      setAllData(parsedData);

      // Load initial batch
      setVisibleData(parsedData.slice(0, ITEMS_PER_BATCH));
      setHasMore(parsedData.length > ITEMS_PER_BATCH);
    }
  }, []);

  // Auto-fill screen if content is too short to scroll
  useEffect(() => {
    const checkScrollFill = () => {
      if (tableContainerRef.current && hasMore && !isLoading && visibleData.length > 0) {
        const { scrollHeight, clientHeight } = tableContainerRef.current;
        if (scrollHeight <= clientHeight) {
          const currentLength = visibleData.length;
          const nextBatch = filteredData.slice(currentLength, currentLength + ITEMS_PER_BATCH);

          if (nextBatch.length > 0) {
            setVisibleData(prev => [...prev, ...nextBatch]);
            if (currentLength + nextBatch.length >= filteredData.length) {
              setHasMore(false);
            }
          }
        }
      }
    };

    checkScrollFill();
  }, [visibleData, hasMore, isLoading, filteredData]);


  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // Handle Header Visibility
    const currentScrollTop = scrollTop;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    if (currentScrollTop > lastScrollTopA.current && currentScrollTop > 50) {
      if (isHeaderVisible) setIsHeaderVisible(false);
    } else if (currentScrollTop < lastScrollTopA.current) {
      // Only show header if we are NOT near the bottom (prevents stutter from rubber-band effect)
      if (distanceToBottom > 100) {
        if (!isHeaderVisible) setIsHeaderVisible(true);
      }
    }
    lastScrollTopA.current = currentScrollTop <= 0 ? 0 : currentScrollTop;

    // Trigger infinite scroll load
    if (distanceToBottom <= 50) {
      loadMoreRows();
    }
  };

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === visibleData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(visibleData.map(row => row.id)));
    }
  };

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(columnId)) {
        newSet.delete(columnId);
      } else {
        newSet.add(columnId);
      }
      return newSet;
    });
  };

  // Update visible data when filtered data changes or scrolling happens
  useEffect(() => {
    setVisibleData(filteredData.slice(0, ITEMS_PER_BATCH));
    setHasMore(filteredData.length > ITEMS_PER_BATCH);
  }, [filteredData]);

  const loadMoreRows = () => {
    if (!hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleData(prev => {
        const currentLength = prev.length;
        const nextBatch = filteredData.slice(currentLength, currentLength + ITEMS_PER_BATCH);
        if (currentLength + nextBatch.length >= filteredData.length) {
          setHasMore(false);
        }
        return [...prev, ...nextBatch];
      });
      setIsLoading(false);
    }, 600);
  };

  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
  };

  const handleClearFilters = () => {
    setTempFilters({});
    setActiveFilters({});
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setActiveFilters({});
    setTempFilters({});
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setIsLoading(true);

    // Simulate data reload
    setTimeout(() => {
      // Logic to "refresh" data - here we just reset visible data and let effects re-fill
      setVisibleData(filteredData.slice(0, ITEMS_PER_BATCH));
      setHasMore(filteredData.length > ITEMS_PER_BATCH);

      setIsRefreshing(false);
      setIsLoading(false);
    }, 1500);
  };

  // derived columns for rendering
  const displayedColumns = COLUMN_DEFS.filter(col => visibleColumns.has(col.id));

  // Debug: Log when popover state changes
  useEffect(() => {
    console.log('Popover open state changed:', isColumnPopoverOpen);
  }, [isColumnPopoverOpen]);

  return (
    <div className="page-content">
      <div className={`page-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
        <div>
          <div className="page-title">
            <h1>All Accounts</h1>
          </div>
          <div className="page-subtitle">Showing {visibleData.length} of {filteredData.length} results</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline">
            <Download size={16} />
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add New Account
          </button>
        </div>
      </div>

      <div className="table-controls">
        <div className={`search-bar ${isFilterModalOpen ? 'is-expanded' : ''}`}>
          {isSearching ? (
            <Loader2 size={16} className="text-secondary spinner" />
          ) : (
            <Search size={16} className="text-secondary" />
          )}
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search or press /"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {(searchQuery || activeFilterCount > 0) && (
            <button className="clear-search" onClick={handleClearAll} title="Clear all">
              <X size={14} />
            </button>
          )}

          <Dialog.Root
            open={isFilterModalOpen}
            onOpenChange={(open) => {
              setIsFilterModalOpen(open);
              if (open) setTempFilters(activeFilters);
            }}
          >
            <Dialog.Trigger asChild>
              <div
                className="filter-trigger-wrapper"
                onMouseDown={(e) => e.preventDefault()}
                title="Advanced Filters (Alt+/)"
              >
                <SlidersHorizontal size={16} className="text-secondary" />
                {activeFilterCount > 0 && (
                  <span className="filter-badge">{activeFilterCount}</span>
                )}
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <Dialog.Title className="dialog-title">Advanced Filters</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="dialog-close" aria-label="Close">
                    <X size={20} />
                  </button>
                </Dialog.Close>
                <div className="filter-form">
                  {[
                    'Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Status'
                  ].map(field => (
                    <div className="filter-field" key={field}>
                      <label>{field}</label>
                      <input
                        type="text"
                        placeholder={`Filter by ${field.toLowerCase()}`}
                        value={tempFilters[field] || ''}
                        onChange={(e) => setTempFilters(prev => ({ ...prev, [field]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <div className="dialog-actions">
                  <button className="btn-clear" onClick={handleClearFilters}>Clear all</button>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Dialog.Close asChild>
                      <button className="btn-search" onClick={handleApplyFilters}>Search</button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="control-icons">
          <div className="control-group-left">
            <div className="perma-controls">
              {isRefreshing ? (
                <Loader2 className="control-icon spinner" size={16} />
              ) : (
                <RotateCw
                  className="control-icon"
                  size={16}
                  onClick={handleRefresh}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>

            {selectedRows.size > 0 && (
              <div className="temp-icons">
                <div className="vertical-divider"></div>
                <SquareArrowOutUpRight className="control-icon" size={16} />
                <Pencil className="control-icon" size={16} />
                <Trash2 className="control-icon" size={16} />
              </div>
            )}
          </div>

          <div className="control-group-right" style={{ border: '1px solid blue' }} onClick={() => console.log('Control Group Right Clicked')}>
            <div className="alert-pill">
              <AlertCircle size={14} />
              2 Alerts
            </div>

            {/* Column Visibility Popover */}
            <Popover.Root open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
              <Popover.Trigger asChild>
                <button
                  className="control-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid red', // DEBUG: Visible hit area
                    background: 'transparent',
                    outline: 'none',
                    padding: '6px',
                    cursor: 'pointer',
                    zIndex: 20,
                    position: 'relative',
                    pointerEvents: 'auto'
                  }}
                  type="button"
                  title="Customize Columns"
                  onClick={() => {
                    console.log('Settings button clicked');
                    // e.stopPropagation(); // Let's see if it bubbles first
                  }}
                >
                  <Settings size={16} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="popover-content" align="end" sideOffset={5} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                  padding: '16px',
                  width: '260px',
                  zIndex: 2000,
                  border: '1px solid var(--color-border)'
                }}>
                  <div style={{ marginBottom: '12px', fontWeight: 600, fontSize: '14px' }}>Customize Columns</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                    {COLUMN_DEFS.map(col => {
                      const isVisible = visibleColumns.has(col.id);
                      return (
                        <label key={col.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', cursor: 'pointer', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={isVisible}
                              onChange={() => toggleColumnVisibility(col.id)}
                              style={{ accentColor: 'var(--color-primary)' }}
                            />
                            <span>{col.label}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: isVisible ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
                            {isVisible ? (
                              <>
                                <Eye size={12} /> Visible
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} /> Hidden
                              </>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <Popover.Arrow style={{ fill: 'white' }} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            <MoreVertical className="control-icon" size={16} />
          </div>
        </div>
      </div>

      <div
        className="table-wrapper"
        ref={tableContainerRef}
        style={{ backgroundColor: 'white' }}
        onScroll={handleScroll}
      >

        <table className="data-table">
          <thead style={{ position: 'sticky', top: 0, zIndex: 20 }}>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={visibleData.length > 0 && selectedRows.size === visibleData.length}
                  onChange={toggleAllSelection}
                />
              </th>
              {displayedColumns.map(col => (
                <th key={col.id} style={col.headerStyle}>{col.label}</th>
              ))}
              <th className="actions-col"></th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.id}>
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {displayedColumns.map(col => (
                  <td key={col.id} style={col.style}>
                    {col.accessor ? (
                      typeof col.accessor === 'function' ? col.accessor(row, debouncedSearchQuery) : col.accessor
                    ) : (
                      <HighlightText text={row[col.id]} highlight={debouncedSearchQuery} />
                    )}
                  </td>
                ))}
                <td className="actions-col">
                  <div className="row-actions">
                    <button className="action-btn" title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button className="action-btn" title="Delete">
                      <Trash2 size={14} />
                    </button>
                    <button className="action-btn" title="More">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="loading-indicator">
            <Loader2 className="spinner" size={24} />
            <span>Loading more...</span>
          </div>
        )}

        {/* Footer Summary & Spacing */}
        {!hasMore && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Everything loaded. Showing {visibleData.length} of {allData.length} accounts
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsTable;
