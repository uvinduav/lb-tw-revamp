import React from 'react';
import { PanelLeft, ArrowLeft, UserCircle, ChevronDown, AlertCircle } from 'lucide-react';

const Topbar = ({ activePage, toggleSidebar, isSidebarOpen }) => {
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
        {/* <div className="topbar-icon-btn" title="Back">
          <ArrowLeft size={20} color="#666" />
        </div> */}
        <span style={{ marginLeft: '4px' }}>{activePage}</span>
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
