import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  X
} from 'lucide-react';
import HighlightText from './common/HighlightText';

const ModulePage = ({ 
  title, 
  columns = [], 
  data = [], 
  filterFields = [],
  dataMap = {} // Maps UI columns to data keys
}) => {
  const [allData, setAllData] = useState([]); 
  const [visibleData, setVisibleData] = useState([]); 
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
  
  const lastScrollTopA = useRef(0);
  const tableContainerRef = useRef(null);
  const ITEMS_PER_BATCH = 20;

  useEffect(() => {
    if (data) {
        setAllData(data);
        setVisibleData(data.slice(0, ITEMS_PER_BATCH));
        setHasMore(data.length > ITEMS_PER_BATCH);
    }
  }, [data]);

  const filteredData = useMemo(() => {
    return allData.filter(row => {
      // Global Search
      const searchMatch = !debouncedSearchQuery || Object.values(row).some(val => 
        String(val).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      
      // Granular Filters
      const filterMatch = Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;
        const actualKey = dataMap[key] || key;
        return String(row[actualKey] || '').toLowerCase().includes(value.toLowerCase());
      });

      return searchMatch && filterMatch;
    });
  }, [allData, debouncedSearchQuery, activeFilters, dataMap]);

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
         return (
             <span className={`status-pill ${value === 'Active' ? 'status-active' : 'status-renewed'}`}>
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
          <button className="btn btn-primary">
            <Plus size={16} />
            Add New {title.slice(0, -1) || 'Item'}
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
            placeholder="Search" 
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
            if(open) setTempFilters(activeFilters); 
          }}
        >
          <Dialog.Trigger asChild>
            <div 
              className="filter-trigger-wrapper" 
              onMouseDown={(e) => e.preventDefault()}
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
                <div className="filter-form">
                  {filterFields.map(field => (
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
                      <button className="btn-cancel">Cancel</button>
                    </Dialog.Close>
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

          <div className="control-group-right">
            <div className="alert-pill">
              <AlertCircle size={14} />
              2 Alerts
            </div>
            
            <Settings className="control-icon" size={16} />
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
              {columns.map(col => (
                <th key={col}>{col.toUpperCase()}</th>
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
                {columns.map(col => (
                    <td key={col} style={col === 'Amount' ? { fontFamily: 'monospace', fontWeight: 500 } : {}}>
                        {getCellContent(row, col)}
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
            {visibleData.length === 0 && !isLoading && (
                 <tr>
                    <td colSpan={columns.length + 2} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        No records found
                    </td>
                 </tr>
            )}
          </tbody>
        </table>
        
        {isLoading && (
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
