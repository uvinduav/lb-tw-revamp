import React, { useState, useEffect, useRef } from 'react';
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
  Loader2
} from 'lucide-react';
import csvFile from '../assets/accounts-test-sheet.csv?raw';

const AccountsTable = () => {
  const [allData, setAllData] = useState([]); // Store full dataset
  const [visibleData, setVisibleData] = useState([]); // Store displayed subset
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  
  const lastScrollTopA = useRef(0);
  const tableContainerRef = useRef(null);
  const ITEMS_PER_BATCH = 20;

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

  const loadMoreRows = () => {
    // We need to use refs or functional state updates to access latest state in some contexts,
    // but here we rely on the component re-render cycle.
    if (!hasMore) return; 

    setIsLoading(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      setVisibleData(prev => {
        const currentLength = prev.length;
        // Don't rely on allData state directly potentially being stale if effect closure, 
        // but here allData is stable after initial load.
        // Better: access current allData via closure or ref if it changed, but it doesn't.
        
        // However, inside setTimeout, we must be careful. 
        // Since allData is constant after mount (for now), we can use it directly 
        // IF we assume this closure captures it. 
        // But to be safe, let's just use the length logic.
        
        // NOTE: In a real app, 'allData' might not be available in this scope correctly if it changed.
        // But since we only set it once on mount, it's fine.
        
        const nextBatch = allData.slice(currentLength, currentLength + ITEMS_PER_BATCH);
        
        if (currentLength + nextBatch.length >= allData.length) {
          setHasMore(false);
        }
        
        return [...prev, ...nextBatch];
      });
      
      setIsLoading(false);
    }, 600); 
  };

  // Auto-fill screen if content is too short to scroll
  useEffect(() => {
    const checkScrollFill = () => {
      if (tableContainerRef.current && hasMore && !isLoading && visibleData.length > 0) {
        const { scrollHeight, clientHeight } = tableContainerRef.current;
        if (scrollHeight <= clientHeight) {
          // Content is shorter than screen, load more immediately
          
          // We bypass the delay/loader for initial auto-fill to make it snappy,
          // OR we can just call loadMoreRows() if we want the spinner.
          // Let's call loadMoreRows to show the user "work is happening" 
          // or ideally just fill it silently. 
          // Let's force fill silently for better UX.
          
          const currentLength = visibleData.length;
          const nextBatch = allData.slice(currentLength, currentLength + ITEMS_PER_BATCH);
          
          if (nextBatch.length > 0) {
            setVisibleData(prev => [...prev, ...nextBatch]);
            if (currentLength + nextBatch.length >= allData.length) {
              setHasMore(false);
            }
          }
        }
      }
    };
    
    // Check after render
    checkScrollFill();
    
  }, [visibleData, hasMore, isLoading, allData]);


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

  return (
    <div className="page-content">
      <div className={`page-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
        <div>
          <div className="page-title">
            <h1>All Accounts</h1>
          </div>
          <div className="page-subtitle">Showing {visibleData.length} of {allData.length} results</div>
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
        <div className="search-bar">
          <Search size={16} className="text-secondary" />
          <input type="text" placeholder="Search" className="search-input" />
          <SlidersHorizontal size={16} className="text-secondary" style={{ cursor: 'pointer' }} />
        </div>
        
        <div className="control-icons">
          <div className="control-group-left">
            <RotateCcw className="control-icon" size={16} />
            <div className="vertical-divider"></div>
            <SquareArrowOutUpRight className="control-icon" size={16} />
            <Pencil className="control-icon" size={16} />
            <Trash2 className="control-icon" size={16} />
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
                <input type="checkbox" />
              </th>
              <th>ACCOUNT NO.</th>
              <th>BANK</th>
              <th>BRANCH</th>
              <th>TYPE</th>
              <th>CURRENCY</th>
              <th>AMOUNT</th>
              <th>RATE</th>
              <th>INT. TYPE</th>
              <th>START DATE</th>
              <th>DURATION</th>
              <th>STATUS</th>
              <th className="actions-col"></th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row) => (
              <tr key={row.id}>
                <td className="checkbox-col">
                  <input type="checkbox" />
                </td>
                <td style={{ fontWeight: 500 }}>{row.accountNumber}</td>
                <td style={{ fontWeight: 600 }}>{row.bank}</td>
                <td>{row.branch}</td>
                <td>{row.type}</td>
                <td style={{ fontWeight: 500 }}>{row.currency}</td>
                <td style={{ fontFamily: 'monospace', fontWeight: 500 }}>{row.amount}</td>
                <td>{row.rate !== '-' && row.rate !== 'N/A' ? `${row.rate}%` : '-'}</td>
                <td>{row.interestType}</td>
                <td>{row.startDate}</td>
                <td>{row.duration}</td>
                <td>
                  <span className={`status-pill ${row.status === 'Active' ? 'status-active' : 'status-renewed'}`}>
                    {row.status}
                  </span>
                </td>
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
