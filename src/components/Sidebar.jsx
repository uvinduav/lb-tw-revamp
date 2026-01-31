import React from "react";
import {
  LayoutDashboard,
  Book,
  DollarSign,
  Stamp,
  FileText,
  TrendingUp,
  ListChecks,
  Calendar,
  Sliders,
  Users,
  History,
  Settings,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">LION</div>

      <div className="sidebar-nav">
        <a href="#" className="nav-item">
          <LayoutDashboard size={18} />
          Dashboard
        </a>
        <a href="#" className="nav-item active">
          <Book size={18} />
          Accounts
        </a>
        <a href="#" className="nav-item">
          <DollarSign size={18} />
          Payments
        </a>
        <a href="#" className="nav-item">
          <Stamp size={18} />
          Accruals
        </a>
        <a href="#" className="nav-item">
          <FileText size={18} />
          Reports
        </a>
        <a href="#" className="nav-item">
          <TrendingUp size={18} />
          Floating Rates
        </a>
        <a href="#" className="nav-item">
          <ListChecks size={18} />
          Posting Center
        </a>
        <a href="#" className="nav-item">
          <Calendar size={18} />
          Working Calendar
        </a>

        <div className="nav-group-label">Setup</div>
        <a href="#" className="nav-item">
          <Sliders size={18} />
          Parameters
        </a>
        <a href="#" className="nav-item">
          <Users size={18} />
          User Groups
        </a>
        <a href="#" className="nav-item">
          <History size={18} />
          Change Log
        </a>

        <div className="nav-group-label">Settings</div>
        <a href="#" className="nav-item">
          <Settings size={18} />
          Settings
        </a>
        <a href="#" className="nav-item">
          <Bell size={18} />
          Notifications
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
