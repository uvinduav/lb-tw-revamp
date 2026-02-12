import React from 'react';
import { PanelLeft, ArrowLeft, UserCircle, ChevronDown, AlertCircle } from 'lucide-react';

const Topbar = ({ activePage, toggleSidebar, isSidebarOpen, showBack, onBack, breadcrumb, onNavigate }) => {
  return (
    <div className="topbar">
      <div className="breadcrumb">
        <div
          className="topbar-icon-btn"
          onClick={toggleSidebar}
          title={`${isSidebarOpen ? 'Hide' : 'Show'} Sidebar (Alt+\\)`}
        >
          <PanelLeft size={20} color="#666" />
        </div>
        {showBack && (
          <div className="topbar-icon-btn" title="Back" onClick={onBack}>
            <ArrowLeft size={20} color="#666" />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
          {(breadcrumb || activePage).split(' > ').map((item, index, array) => (
            <React.Fragment key={index}>
              <span
                className={index === array.length - 1 ? 'breadcrumb-active' : ''}
                onClick={() => index < array.length - 1 && onNavigate && onNavigate(item)}
                style={{
                  fontSize: '12px',
                  fontWeight: index === array.length - 1 ? 500 : 400,
                  color: index === array.length - 1 ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
                  cursor: index < array.length - 1 ? 'pointer' : 'default'
                }}
              >
                {item}
              </span>
              {index < array.length - 1 && (
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 2px' }}>&gt;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {activePage === 'Dashboard' && (
          <div className="alert-pill">
            <AlertCircle size={14} />
            1 Alert
          </div>
        )}
        <div className="user-profile">
          <UserCircle size={20} color="#666" />
          <span>Kamal</span>
          <ChevronDown size={14} color="#666" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
