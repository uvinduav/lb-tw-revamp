import React from 'react';
import { PanelLeft, ArrowLeft, UserCircle, ChevronDown } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="breadcrumb">
        <PanelLeft size={20} style={{ cursor: 'pointer', color: '#666' }} />
        <ArrowLeft size={20} style={{ cursor: 'pointer', marginLeft: '8px' }} />
        <span>Accounts</span>
      </div>
      
      <div className="user-profile">
        <UserCircle size={24} color="#666" />
        <span>Kamal</span>
        <ChevronDown size={14} color="#666" />
      </div>
    </div>
  );
};

export default Topbar;
