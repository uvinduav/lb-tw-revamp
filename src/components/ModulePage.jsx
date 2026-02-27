import React, { useState, useEffect, useRef, useMemo } from 'react';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Search,
  SlidersHorizontal,
  RotateCw,
  SquareArrowOutUpRight,
  Pencil,
  Trash2,
  Download,
  Plus,
  Settings,
  MoreVertical,
  AlertCircle,
  Loader2,
  X,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import HighlightText from './common/HighlightText';
import emptyBox from '../assets/empty-box.png';

const ModulePage = ({
  title,
  columns = [],
  data = [],
  filterFields = [],
  dataMap = {}, // Maps UI columns to data keys
  renderRowActions, // Optional: function to render custom row actions (row) => JSX
  filterOptions = {}, // Optional: object mapping field names to array of options
  alertCount = 0, // Optional: number of alerts to show
  showAddButton = true, // Optional: whether to show the "Add New" button
  createButtonText, // Optional: custom text for the "Add New" button (without "Add New ")
  onCreate, // Optional: callback when "Add New" button is clicked
  renderHeaderActions = null, // Optional: function to render custom header actions () => JSX
  showDefaultRowActions = true, // Optional: whether to show default Edit and Delete actions
  showColumnCustomization = true, // Default to true
  onRowClick = null, // Optional: callback when a row is clicked (row) => void
  renderCell, // Optional: function to render custom cell content (row, col, value) => JSX
  onSelectionChange, // Optional: callback when row selection changes (selectedRows) => void
  renderActions, // Optional: function to render custom header actions () => JSX
  showSelection = true // Optional: whether to show the selection checkbox column
}) => {
  const [allData, setAllData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns));
  const [isColumnPopoverOpen, setIsColumnPopoverOpen] = useState(false);

  // Initialize visible columns when columns prop changes
  useEffect(() => {
    setVisibleColumns(new Set(columns));
  }, [columns]);

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

  const searchInputRef = useRef(null);
  useKeyboardShortcuts(searchInputRef, setIsFilterModalOpen);

  const lastScrollTopA = useRef(0);
  const tableContainerRef = useRef(null);
  const ITEMS_PER_BATCH = 20;

  useEffect(() => {
    if (data) {
      setAllData(data);
      setVisibleData(data.slice(0, ITEMS_PER_BATCH));
      setHasMore(data.length > ITEMS_PER_BATCH);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    let timer;
    if (visibleData.length === 0 && !isLoading) {
      timer = setTimeout(() => {
        setShowEmptyState(true);
      }, 1000);
    } else {
      setShowEmptyState(false);
    }
    return () => clearTimeout(timer);
  }, [visibleData.length, isLoading]);

  const filteredData = useMemo(() => {
    return allData.filter(row => {
      // Global Search
      const searchMatch = !debouncedSearchQuery || Object.values(row).some(val =>
        String(val).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );

      // Granular Filters
      const filterMatch = Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;

        // Handle value range filters
        if (key.endsWith('_currency') || key.endsWith('_min') || key.endsWith('_max')) {
          const baseKey = key.split('_').slice(0, -1).join('_');
          const actualKey = dataMap[baseKey] || baseKey;
          const rawValue = String(row[actualKey] || '');

          // Parse currency and amount (e.g. "LKR 1,200,000.00")
          const parts = rawValue.trim().split(/\s+/);
          const currency = parts.length > 1 ? parts[0] : '';
          const amountStr = parts.length > 1 ? parts[1] : parts[0];
          const amount = parseFloat(amountStr.replace(/,/g, ''));

          const targetCurrency = activeFilters[`${baseKey}_currency`];
          const min = activeFilters[`${baseKey}_min`];
          const max = activeFilters[`${baseKey}_max`];

          if (targetCurrency && currency && currency !== targetCurrency) return false;
          if (min && !isNaN(amount) && amount < parseFloat(min)) return false;
          if (max && !isNaN(amount) && amount > parseFloat(max)) return false;

          return true;
        }

        const actualKey = dataMap[key] || key;
        return String(row[actualKey] || '').toLowerCase().includes(value.toLowerCase());
      });

      return searchMatch && filterMatch;
    });
  }, [allData, debouncedSearchQuery, activeFilters, dataMap]);

  // Count active filters (ignore empty strings or nulls)
  const activeFilterCount = useMemo(() => {
    const keys = new Set();
    Object.entries(activeFilters).forEach(([key, val]) => {
      if (val && val.trim() !== '') {
        const baseKey = key.endsWith('_currency') || key.endsWith('_min') || key.endsWith('_max')
          ? key.split('_').slice(0, -1).join('_')
          : key;
        keys.add(baseKey);
      }
    });
    return keys.size;
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
    if (selectedRows.size === visibleData.length && visibleData.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(visibleData.map(row => row.id)));
    }
  };

  // Update visible data when filtered data changes
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
    setDebouncedSearchQuery('');
    setActiveFilters({});
    setTempFilters({});
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setIsLoading(true);

    // Simulate data reload
    setTimeout(() => {
      setVisibleData(filteredData.slice(0, ITEMS_PER_BATCH));
      setHasMore(filteredData.length > ITEMS_PER_BATCH);

      setIsRefreshing(false);
      setIsLoading(false);
    }, 1500);
  };

  const getCellContent = (row, col) => {
    const key = dataMap[col] || col.toLowerCase().replace(/ /g, '');
    const value = row[key];

    if (renderCell) {
      const customCell = renderCell(row, col, value, debouncedSearchQuery);
      if (customCell !== null && customCell !== undefined) {
        return customCell;
      }
    }

    if (key === 'status') {
      const getStatusClass = (status) => {
        const s = status?.toLowerCase();
        if (s === 'active') return 'status-active';
        if (s === 'posted') return 'status-posted';
        if (s === 'failed') return 'status-failed';
        return 'status-renewed';
      };
      return (
        <span className={`status-pill ${getStatusClass(value)}`}>
          <HighlightText text={value} highlight={debouncedSearchQuery} />
        </span>
      )
    }

    return <HighlightText text={value || '-'} highlight={debouncedSearchQuery} />;
  }

  return (
    <div className="page-content">
      <div className={`page-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
        <div>
          <div className="page-title">
            <h1>{title}</h1>
          </div>
          <div className="page-subtitle">Showing {visibleData.length} of {filteredData.length} results</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline">
            <Download size={16} />
          </button>
          {renderActions && renderActions()}
          {showAddButton && (
            <button className="btn btn-primary" onClick={() => onCreate && onCreate(createButtonText || `Add New ${title.replace(/^All /, '').replace(/s$/, '')}`)}>
              <Plus size={16} />
              {createButtonText || `Add New ${title.replace(/^All /, '').replace(/s$/, '')}`}
            </button>
          )}
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
            <button
              className="clear-search"
              onClick={handleClearAll}
              onMouseDown={(e) => e.preventDefault()}
              title="Clear all"
            >
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
                  {filterFields.map(field => {
                    const isBankField = field.toLowerCase() === 'bank';
                    const isValueField = field.toLowerCase().includes('value') || field.toLowerCase().includes('provision') || field.toLowerCase().includes('amount');

                    let fieldClass = "filter-field";
                    if (isValueField) fieldClass += " value-filter-group span-4";
                    else fieldClass += " span-1";

                    if (isValueField) {
                      return (
                        <div className={fieldClass} key={field}>
                          <label>{field}</label>
                          <div className="value-inputs">
                            <select
                              value={tempFilters[`${field}_currency`] || ''}
                              onChange={(e) => setTempFilters(prev => ({ ...prev, [`${field}_currency`]: e.target.value }))}
                              className="filter-select currency-select"
                            >
                              <option value="">Currency</option>
                              <option value="LKR">LKR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                            <input
                              type="number"
                              placeholder="Min"
                              value={tempFilters[`${field}_min`] || ''}
                              onChange={(e) => setTempFilters(prev => ({ ...prev, [`${field}_min`]: e.target.value }))}
                              className="value-input"
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              value={tempFilters[`${field}_max`] || ''}
                              onChange={(e) => setTempFilters(prev => ({ ...prev, [`${field}_max`]: e.target.value }))}
                              className="value-input"
                            />
                          </div>
                        </div>
                      );
                    }

                    const options = filterOptions[field] || (isBankField ? [
                      'Bank of China', 'Citi Bank', 'Commercial Bank', 'Deutsche Bank',
                      'DFCC Bank', 'Hatton National Bank', 'Nation Trust Bank',
                      'NDB Bank', "People's Bank", 'Sampath Bank'
                    ] : null);

                    return (
                      <div className={fieldClass} key={field}>
                        <label>{field}</label>
                        {options ? (
                          <select
                            value={tempFilters[field] || ''}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, [field]: e.target.value }))}
                            className="filter-select"
                          >
                            <option value="">{isBankField ? 'Select bank' : `Select ${field.toLowerCase()}`}</option>
                            {options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder={`Filter by ${field.toLowerCase()}`}
                            value={tempFilters[field] || ''}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, [field]: e.target.value }))}
                          />
                        )}
                      </div>
                    );
                  })}
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
                {selectedRows.size === 1 && <Pencil className="control-icon" size={16} />}
                <Trash2 className="control-icon" size={16} />
              </div>
            )}
          </div>

          <div className="control-group-right">
            {alertCount > 0 && (
              <div className="alert-pill">
                <AlertCircle size={14} />
                {alertCount} {alertCount === 1 ? 'Alert' : 'Alerts'}
              </div>
            )}

            {renderHeaderActions && renderHeaderActions()}

            {/* Column Visibility Popover */}
            {showColumnCustomization && (
              <Popover.Root open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
                <Popover.Trigger asChild>
                  <button
                    className="control-icon"
                    type="button"
                    title="View options"
                    style={{ zIndex: 20, position: 'relative' }}
                  >
                    {visibleColumns.size === 0 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="popover-content" align="end" sideOffset={5} style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                    width: '280px',
                    zIndex: 2000,
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden', // Ensure header doesn't scroll
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 16px 12px',
                      borderBottom: '1px solid var(--color-border)'
                    }}>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>View options</span>
                      <button
                        onClick={() => setVisibleColumns(new Set(columns))}
                        title="Reset to Default"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      padding: '0'
                    }}>
                      {columns.map((col, index) => {
                        const isVisible = visibleColumns.has(col);
                        const isLast = index === columns.length - 1;
                        return (
                          <label key={col} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 16px', // Compact height
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'background-color 0.2s',
                            borderBottom: isLast ? 'none' : '1px solid var(--color-border)' // Correct border variable
                          }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'} // Correct hover variable
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{
                                color: isVisible ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                                display: 'flex',
                                alignItems: 'center'
                              }}>
                                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                              </span>
                              <span style={{
                                color: isVisible ? 'var(--color-text-main)' : 'var(--color-text-secondary)'
                              }}>{col}</span>
                            </div>

                            {/* Custom Toggle Switch */}
                            <div style={{ position: 'relative', width: '32px', height: '18px' }}>
                              <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={() => toggleColumnVisibility(col)}
                                style={{
                                  opacity: 0,
                                  width: 0,
                                  height: 0
                                }}
                              />
                              <div style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: isVisible ? 'var(--color-primary)' : '#ccc',
                                transition: '.4s',
                                borderRadius: '34px'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  content: '',
                                  height: '14px',
                                  width: '14px',
                                  left: isVisible ? '16px' : '2px',
                                  bottom: '2px',
                                  backgroundColor: 'white',
                                  transition: '.4s',
                                  borderRadius: '50%'
                                }}></div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <Popover.Arrow className="popover-arrow" style={{ fill: 'white' }} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
            {/* <MoreVertical className="control-icon" size={16} /> */}
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
              {showSelection && (
                <th className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={visibleData.length > 0 && selectedRows.size === visibleData.length}
                    onChange={toggleAllSelection}
                  />
                </th>
              )}
              {columns.filter(col => visibleColumns.has(col)).map(col => (
                <th
                  key={col}
                  className={`
                    ${(col === 'Amount' || col.toLowerCase().includes('value') || col.toLowerCase().includes('total')) ? 'text-right' : ''}
                    ${col === 'Amount' ? 'col-amount' : ''}
                    ${col.toLowerCase().includes('rate') ? 'col-rate' : ''}
                  `}
                >
                  {col.toUpperCase()}
                </th>
              ))}
              {(renderRowActions || showDefaultRowActions) && <th className="actions-col"></th>}
            </tr>
          </thead>
          <tbody>
            {visibleColumns.size > 0 && visibleData.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : {}}
              >
                {showSelection && (
                  <td className="checkbox-col" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                )}
                {columns.filter(col => visibleColumns.has(col)).map(col => (
                  <td
                    key={col}
                    className={`
                      ${(col === 'Amount' || col.toLowerCase().includes('value') || col.toLowerCase().includes('total')) ? 'text-right' : ''}
                      ${col === 'Amount' ? 'col-amount' : ''}
                      ${col.toLowerCase().includes('rate') ? 'col-rate' : ''}
                    `}
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--color-text-main)',
                      fontFamily: (col === 'Amount' || col.includes('Rate') || col.includes('Price')) ? 'monospace' : 'inherit'
                    }}>
                    {getCellContent(row, col)}
                  </td>
                ))}

                {(renderRowActions || showDefaultRowActions) && (
                  <td className="actions-col" onClick={(e) => e.stopPropagation()}>
                    <div className="row-actions">
                      {renderRowActions ? (
                        renderRowActions(row)
                      ) : (
                        <>
                          {showDefaultRowActions && (
                            <>
                              <button className="action-btn" title="Edit">
                                <Pencil size={14} />
                              </button>
                              <button className="action-btn" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {visibleColumns.size > 0 && visibleData.length === 0 && (isLoading || !showEmptyState) && (
              <tr className="loading-state-row">
                <td colSpan={visibleColumns.size + 2} style={{ textAlign: 'center', padding: '60px 40px', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--color-text-secondary)' }}>
                    <Loader2 className="spinner" size={32} />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {(visibleColumns.size === 0 || (visibleData.length === 0 && !isLoading && showEmptyState)) && (
              <tr className="empty-state-row">
                <td colSpan={visibleColumns.size + 2} style={{ textAlign: 'center', padding: '60px 40px', color: '#888', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={emptyBox}
                      alt="No records"
                      style={{ width: '80px', height: '80px', opacity: 0.4 }}
                    />
                    <span>{visibleColumns.size === 0 ? 'No columns visible' : 'No records found'}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isLoading && visibleData.length > 0 && (
          <div className="loading-indicator">
            <Loader2 className="spinner" size={24} />
            <span>Loading more...</span>
          </div>
        )}

        {/* Footer Summary & Spacing */}
        {!hasMore && visibleData.length > 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Everything loaded. Showing {visibleData.length} of {allData.length} results
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
