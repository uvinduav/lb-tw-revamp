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
  onRowClick = null // Optional: callback when a row is clicked (row) => void
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

    if (key === 'status') {
      const getStatusClasses = (status) => {
        const s = status?.toLowerCase();
        if (s === 'active') return 'bg-status-active-bg text-status-active-text';
        if (s === 'posted') return 'bg-status-posted-bg text-status-posted-text';
        if (s === 'failed') return 'bg-status-failed-bg text-status-failed-text';
        return 'bg-status-renewed-bg text-status-renewed-text';
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(value)}`}>
          <HighlightText text={value} highlight={debouncedSearchQuery} />
        </span>
      )
    }

    return <HighlightText text={value || '-'} highlight={debouncedSearchQuery} />;
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-0">
      <div className={`flex justify-between items-center px-6 pt-4 shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${!isHeaderVisible ? 'max-h-0 pt-0 opacity-0 pointer-events-none' : 'max-h-[100px] opacity-100'}`}>
        <div>
          <div>
            <h1 className="text-lg font-semibold mb-1">{title}</h1>
          </div>
          <div className="text-[13px] text-text-secondary">Showing {visibleData.length} of {filteredData.length} results</div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center p-2 rounded border border-border bg-white text-text-main cursor-pointer transition-all duration-200 hover:bg-bg-subtle">
            <Download size={16} />
          </button>
          {showAddButton && (
            <button className="inline-flex items-center justify-center px-4 py-2 rounded border border-transparent bg-primary-action text-white text-[13px] font-medium cursor-pointer transition-all duration-200 gap-1.5 hover:bg-primary-action-hover" onClick={() => onCreate && onCreate(createButtonText || `Add New ${title.replace(/^All /, '').replace(/s$/, '')}`)}>
              <Plus size={16} />
              {createButtonText || `Add New ${title.replace(/^All /, '').replace(/s$/, '')}`}
            </button>
          )}
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
            <button
              className="bg-transparent border-none text-text-secondary cursor-pointer flex items-center justify-center p-1 rounded transition-all duration-200 -mr-1 hover:bg-gray-200 hover:text-primary-action"
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
                  {filterFields.map(field => {
                    const isBankField = field.toLowerCase() === 'bank';
                    const isValueField = field.toLowerCase().includes('value') || field.toLowerCase().includes('provision') || field.toLowerCase().includes('amount');

                    if (isValueField) {
                      return (
                        <div className="flex flex-col gap-1.5 col-span-4" key={field}>
                          <label className="text-xs font-medium text-text-secondary">{field}</label>
                          <div className="flex gap-2">
                            <select
                              value={tempFilters[`${field}_currency`] || ''}
                              onChange={(e) => setTempFilters(prev => ({ ...prev, [`${field}_currency`]: e.target.value }))}
                              className="appearance-none bg-transparent border border-border rounded px-3 py-2 text-[13px] font-medium text-text-main cursor-pointer outline-none w-[120px]"
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
                              className="flex-1 border border-border rounded px-3 py-2 text-[13px] outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              value={tempFilters[`${field}_max`] || ''}
                              onChange={(e) => setTempFilters(prev => ({ ...prev, [`${field}_max`]: e.target.value }))}
                              className="flex-1 border border-border rounded px-3 py-2 text-[13px] outline-none"
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
                      <div className="flex flex-col gap-1.5 col-span-1" key={field}>
                        <label className="text-xs font-medium text-text-secondary">{field}</label>
                        {options ? (
                          <select
                            value={tempFilters[field] || ''}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, [field]: e.target.value }))}
                            className="appearance-none bg-transparent border border-border rounded px-3 py-2 text-[13px] font-medium text-text-main cursor-pointer outline-none w-full"
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
                            className="border border-border rounded px-3 py-2 text-[13px] outline-none w-full"
                          />
                        )}
                      </div>
                    );
                  })}
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
                {selectedRows.size === 1 && <Pencil className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />}
                <Trash2 className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit hover:bg-gray-200 hover:text-primary-action" size={16} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {alertCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 h-7 rounded bg-red-50 text-red-500 text-xs font-medium">
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
                    className="cursor-pointer w-7 h-7 p-1.5 rounded transition-all duration-200 bg-transparent border-none flex items-center justify-center text-inherit outline-none hover:bg-gray-200 hover:text-primary-action relative z-20"
                    type="button"
                    title="View options"
                  >
                    {visibleColumns.size === 0 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="bg-white rounded-lg shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] w-[280px] z-[2000] border border-border overflow-hidden flex flex-col" align="end" sideOffset={5}>
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
                      <span className="font-semibold text-sm">View options</span>
                      <button
                        onClick={() => setVisibleColumns(new Set(columns))}
                        title="Reset to Default"
                        className="bg-transparent border-none text-text-secondary cursor-pointer p-1 flex items-center justify-center rounded hover:bg-bg-subtle"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>

                    <div className="flex flex-col max-h-[300px] overflow-y-auto">
                      {columns.map((col, index) => {
                        const isVisible = visibleColumns.has(col);
                        const isLast = index === columns.length - 1;
                        return (
                          <label key={col} className={`flex items-center justify-between px-4 py-1.5 cursor-pointer text-[13px] transition-colors duration-200 hover:bg-bg-subtle ${!isLast ? 'border-b border-border' : ''}`}>
                            <div className="flex items-center gap-2.5">
                              <span className={`flex items-center ${isVisible ? 'text-primary' : 'text-text-tertiary'}`}>
                                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                              </span>
                              <span className={isVisible ? 'text-text-main' : 'text-text-secondary'}>{col}</span>
                            </div>

                            {/* Custom Toggle Switch */}
                            <div className="relative w-8 h-[18px]">
                              <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={() => toggleColumnVisibility(col)}
                                className="opacity-0 w-0 h-0"
                              />
                              <div className={`absolute cursor-pointer inset-0 rounded-full transition-all duration-400 ${isVisible ? 'bg-primary' : 'bg-gray-300'}`}>
                                <div className={`absolute h-3.5 w-3.5 bottom-0.5 bg-white rounded-full transition-all duration-400 ${isVisible ? 'left-4' : 'left-0.5'}`}></div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <Popover.Arrow style={{ fill: 'white' }} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
          </div>
        </div>
      </div>

      <div
        className="overflow-auto mx-6 flex-1 bg-white"
        ref={tableContainerRef}
        onScroll={handleScroll}
      >

        <table className="w-full min-w-full border-collapse text-[13px]">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="w-10 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">
                <input
                  type="checkbox"
                  checked={visibleData.length > 0 && selectedRows.size === visibleData.length}
                  onChange={toggleAllSelection}
                />
              </th>
              {columns.filter(col => visibleColumns.has(col)).map(col => (
                <th key={col} className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">{col.toUpperCase()}</th>
              ))}
              <th className="w-20 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8"></th>
            </tr>
          </thead>
          <tbody>
            {visibleColumns.size > 0 && visibleData.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : {}}
              >
                <td className="checkbox-col" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                {columns.filter(col => visibleColumns.has(col)).map(col => (
                  <td key={col} className={`px-2.5 py-1 border-b border-border align-middle text-text-main whitespace-nowrap ${col === 'Amount' ? 'font-mono font-medium' : ''}`}>
                    {getCellContent(row, col)}
                  </td>
                ))}

                <td className="actions-col" onClick={(e) => e.stopPropagation()}>
                  <div className="row-actions">
                    {renderRowActions ? (
                      renderRowActions(row)
                    ) : (
                      <>
                        {showDefaultRowActions && (
                          <>
                            <button className="bg-transparent border-none cursor-pointer p-1 rounded text-text-secondary transition-all duration-200 hover:bg-gray-100 hover:text-primary-action" title="Edit">
                              <Pencil size={14} />
                            </button>
                            <button className="bg-transparent border-none cursor-pointer p-1 rounded text-text-secondary transition-all duration-200 hover:bg-gray-100 hover:text-red-500" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {visibleColumns.size > 0 && visibleData.length === 0 && (isLoading || !showEmptyState) && (
              <tr>
                <td colSpan={visibleColumns.size + 2} className="text-center py-15 px-10 border-b-0">
                  <div className="flex flex-col items-center gap-4 text-text-secondary">
                    <Loader2 className="spinner" size={32} />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {(visibleColumns.size === 0 || (visibleData.length === 0 && !isLoading && showEmptyState)) && (
              <tr>
                <td colSpan={visibleColumns.size + 2} className="text-center py-15 px-10 text-[#888] border-b-0">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={emptyBox}
                      alt="No records"
                      className="w-20 h-20 opacity-40"
                    />
                    <span>{visibleColumns.size === 0 ? 'No columns visible' : 'No records found'}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isLoading && visibleData.length > 0 && (
          <div className="flex items-center justify-center gap-2 py-4 text-text-secondary text-[13px]">
            <Loader2 className="spinner" size={24} />
            <span>Loading more...</span>
          </div>
        )}

        {/* Footer Summary & Spacing */}
        {!hasMore && visibleData.length > 0 && (
          <div className="p-5 text-center text-text-secondary text-[13px]">
            Everything loaded. Showing {visibleData.length} of {allData.length} results
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
