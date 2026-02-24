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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-status-active-bg text-status-active-text' : 'bg-status-renewed-bg text-status-renewed-text'}`}>
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
    <div className="flex flex-col flex-1 overflow-hidden p-0">
      <div className={`flex justify-between items-center px-6 pt-4 shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${!isHeaderVisible ? 'max-h-0 pt-0 opacity-0 pointer-events-none' : 'max-h-[100px] opacity-100'}`}>
        <div>
          <div>
            <h1 className="text-lg font-semibold mb-1">All Accounts</h1>
          </div>
          <div className="text-[13px] text-text-secondary">Showing {visibleData.length} of {filteredData.length} results</div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center p-2 rounded border border-border bg-white text-text-main cursor-pointer transition-all duration-200 hover:bg-bg-subtle">
            <Download size={16} />
          </button>
          <button className="inline-flex items-center justify-center px-4 py-2 rounded border border-transparent bg-primary-action text-white text-[13px] font-medium cursor-pointer transition-all duration-200 gap-1.5 hover:bg-primary-action-hover">
            <Plus size={16} />
            Add New Account
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 px-6 pt-4 shrink-0">
        <div className={`flex items-center gap-2 text-[13px] text-text-secondary px-4 py-2 border border-border rounded h-10 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isFilterModalOpen ? 'w-[480px] border-primary-action' : 'w-[300px]'} focus-within:w-[480px] focus-within:border-primary-action`}>
          {isSearching ? (
            <Loader2 size={16} className="text-text-secondary spinner" />
          ) : (
            <Search size={16} className="text-text-secondary" />
          )}
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search or press /"
            className="border-none bg-transparent outline-none w-full text-[13px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {(searchQuery || activeFilterCount > 0) && (
            <button className="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center p-1 rounded transition-all duration-200 -mr-1 hover:bg-gray-200 hover:text-primary-action" onClick={handleClearAll} title="Clear all">
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
                className="flex items-center justify-center cursor-pointer p-1 rounded transition-all duration-200 hover:bg-gray-200 relative"
                onMouseDown={(e) => e.preventDefault()}
                title="Advanced Filters (Alt+/)"
              >
                <SlidersHorizontal size={16} className="text-text-secondary" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary-action text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>
                )}
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-[0_16px_70px_-12px_rgba(0,0,0,0.25)] border border-border p-6 z-50 w-[90vw] max-w-[600px] animate-fade-in">
                <Dialog.Title className="text-base font-semibold text-text-main mb-4">Advanced Filters</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-gray-400 p-1 rounded hover:bg-gray-100 hover:text-gray-900" aria-label="Close">
                    <X size={20} />
                  </button>
                </Dialog.Close>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    'Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Status'
                  ].map(field => (
                    <div className="flex flex-col gap-1.5 col-span-1" key={field}>
                      <label className="text-xs font-medium text-text-secondary">{field}</label>
                      <input
                        type="text"
                        placeholder={`Filter by ${field.toLowerCase()}`}
                        value={tempFilters[field] || ''}
                        onChange={(e) => setTempFilters(prev => ({ ...prev, [field]: e.target.value }))}
                        className="border border-border rounded px-3 py-2 text-[13px] outline-none w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <button className="text-[13px] font-medium text-text-secondary bg-transparent border-none cursor-pointer hover:text-text-main" onClick={handleClearFilters}>Clear all</button>
                  <div className="flex gap-3">
                    <Dialog.Close asChild>
                      <button className="px-4 py-2 bg-primary-action text-white rounded text-[13px] font-medium border-none cursor-pointer hover:bg-primary-action-hover" onClick={handleApplyFilters}>Search</button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="flex-1 flex items-center justify-between gap-2 text-text-secondary bg-bg-subtle px-2 rounded h-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {isRefreshing ? (
                <Loader2 className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit spinner" size={16} />
              ) : (
                <RotateCw
                  className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action"
                  size={16}
                  onClick={handleRefresh}
                />
              )}
            </div>

            {selectedRows.size > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-5 w-px bg-gray-200"></div>
                <SquareArrowOutUpRight className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />
                <Pencil className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />
                <Trash2 className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 h-7 rounded bg-red-50 text-red-500 text-xs font-medium">
              <AlertCircle size={14} />
              2 Alerts
            </div>

            {/* Column Visibility Popover */}
            <Popover.Root open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
              <Popover.Trigger asChild>
                <button
                  className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit outline-none hover:bg-gray-200 hover:text-primary-action relative z-20"
                  type="button"
                  title="Customize Columns"
                >
                  <Settings size={16} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white rounded-lg shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] p-4 w-[260px] z-[2000] border border-border" align="end" sideOffset={5}>
                  <div className="mb-3 font-semibold text-sm">Customize Columns</div>
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                    {COLUMN_DEFS.map(col => {
                      const isVisible = visibleColumns.has(col.id);
                      return (
                        <label key={col.id} className="flex items-center justify-between py-1 cursor-pointer text-[13px]">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isVisible}
                              onChange={() => toggleColumnVisibility(col.id)}
                              className="accent-primary"
                            />
                            <span>{col.label}</span>
                          </div>
                          <div className={`flex items-center gap-1 text-xs ${isVisible ? 'text-green-600' : 'text-text-secondary'}`}>
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

            <MoreVertical className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />
          </div>
        </div>
      </div>

      <div
        className="overflow-auto mx-6 flex-1 bg-white"
        ref={tableContainerRef}
        onScroll={handleScroll}
      >

        <table className="w-full min-w-[1000px] border-collapse text-[13px]">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="w-10 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">
                <input
                  type="checkbox"
                  checked={visibleData.length > 0 && selectedRows.size === visibleData.length}
                  onChange={toggleAllSelection}
                />
              </th>
              {displayedColumns.map(col => (
                <th key={col.id} className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">{col.label}</th>
              ))}
              <th className="w-20 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8"></th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.id} className="hover:bg-bg-subtle">
                <td className="w-10 px-2.5 py-1 border-b border-border align-middle text-text-main whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {displayedColumns.map(col => (
                  <td key={col.id} style={col.style} className="px-2.5 py-1 border-b border-border align-middle text-text-main whitespace-nowrap">
                    {col.accessor ? (
                      typeof col.accessor === 'function' ? col.accessor(row, debouncedSearchQuery) : col.accessor
                    ) : (
                      <HighlightText text={row[col.id]} highlight={debouncedSearchQuery} />
                    )}
                  </td>
                ))}
                <td className="w-20 px-2.5 py-1 border-b border-border align-middle text-text-main whitespace-nowrap">
                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 [tr:hover_&]:opacity-100">
                    <button className="bg-transparent border-none cursor-pointer p-1 rounded text-text-secondary transition-all duration-200 hover:bg-gray-100 hover:text-primary-action" title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button className="bg-transparent border-none cursor-pointer p-1 rounded text-text-secondary transition-all duration-200 hover:bg-gray-100 hover:text-red-500" title="Delete">
                      <Trash2 size={14} />
                    </button>
                    <button className="bg-transparent border-none cursor-pointer p-1 rounded text-text-secondary transition-all duration-200 hover:bg-gray-100 hover:text-primary-action" title="More">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-4 text-text-secondary text-[13px]">
            <Loader2 className="spinner" size={24} />
            <span>Loading more...</span>
          </div>
        )}

        {/* Footer Summary & Spacing */}
        {!hasMore && (
          <div className="p-5 text-center text-text-secondary text-[13px]">
            Everything loaded. Showing {visibleData.length} of {allData.length} accounts
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsTable;
