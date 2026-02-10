import React from 'react';
import { PanelLeft, ArrowLeft, UserCircle, ChevronDown } from 'lucide-react';

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

      <div className="user-profile">
        <UserCircle size={20} color="#666" />
        <span>Kamal</span>
        <ChevronDown size={14} color="#666" />
      </div>
    </div>
  );
};

export default Topbar;
