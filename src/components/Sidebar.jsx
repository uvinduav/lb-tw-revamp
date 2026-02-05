import React, { useState } from "react";
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
  User,
  History,
  Settings,
  Bell,
  ChevronDown,
  Landmark,
  BarChart3,
  MapPin,
  Briefcase,
  CircleDollarSign,
  Clock,
  Percent,
  Coins,
  Tag
} from "lucide-react";

import lionLogo from "../assets/lion-logo.png";

const Sidebar = ({ activePage, setActivePage }) => {
  const [isParametersOpen, setIsParametersOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const subItems = [
    { name: "Banks", icon: <Landmark size={16} /> },
    { name: "Benchmarks", icon: <BarChart3 size={16} /> },
    { name: "Branches", icon: <MapPin size={16} /> },
    { name: "Companies", icon: <Briefcase size={16} /> },
    { name: "Currencies", icon: <CircleDollarSign size={16} /> },
    { name: "Durations", icon: <Clock size={16} /> },
    { name: "Interest Rates", icon: <Percent size={16} /> },
    { name: "Exchange Rates", icon: <Coins size={16} /> },
    { name: "Purpose Tags", icon: <Tag size={16} /> },
  ];

  const usersSubItems = [
    { name: "Users", icon: <User size={16} /> },
    { name: "User Groups", icon: <Users size={16} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={lionLogo} alt="Lion Logo" className="logo-img" />
      </div>

      <div className="sidebar-nav">
        <a href="#" className={`nav-item ${activePage === 'Dashboard' ? 'active' : ''}`} onClick={() => setActivePage('Dashboard')}>
          <LayoutDashboard size={18} />
          Dashboard
        </a>
        <a href="#" className={`nav-item ${activePage === 'Accounts' ? 'active' : ''}`} onClick={() => setActivePage('Accounts')}>
          <Book size={18} />
          Accounts
        </a>
        <a href="#" className={`nav-item ${activePage === 'Payments' ? 'active' : ''}`} onClick={() => setActivePage('Payments')}>
          <DollarSign size={18} />
          Payments
        </a>
        <a href="#" className={`nav-item ${activePage === 'Accruals' ? 'active' : ''}`} onClick={() => setActivePage('Accruals')}>
          <Stamp size={18} />
          Accruals
        </a>
        <a href="#" className={`nav-item ${activePage === 'Reports' ? 'active' : ''}`} onClick={() => setActivePage('Reports')}>
          <FileText size={18} />
          Reports
        </a>
        <a href="#" className={`nav-item ${activePage === 'Floating Rates' ? 'active' : ''}`} onClick={() => setActivePage('Floating Rates')}>
          <TrendingUp size={18} />
          Floating Rates
        </a>
        <a href="#" className={`nav-item ${activePage === 'Posting Center' ? 'active' : ''}`} onClick={() => setActivePage('Posting Center')}>
          <ListChecks size={18} />
          Posting Center
        </a>
        <a href="#" className={`nav-item ${activePage === 'Working Calendar' ? 'active' : ''}`} onClick={() => setActivePage('Working Calendar')}>
          <Calendar size={18} />
          Working Calendar
        </a>

        <div className="nav-group-label">Setup</div>
        
        <div 
          className="nav-item nav-item-expandable" 
          onClick={() => setIsParametersOpen(!isParametersOpen)}
        >
          <div className="nav-item-content">
            <Sliders size={18} />
            Parameters
          </div>
          <ChevronDown 
            size={16} 
            className={`chevron-icon ${isParametersOpen ? 'open' : ''}`} 
          />
        </div>

        {isParametersOpen && (
          <div className="sidebar-sub-nav">
            {subItems.map((item) => (
              <a 
                key={item.name} 
                href="#" 
                className={`sub-nav-item ${activePage === item.name ? 'active' : ''}`}
                onClick={() => setActivePage(item.name)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        )}

        <div 
          className="nav-item nav-item-expandable" 
          onClick={() => setIsUsersOpen(!isUsersOpen)}
        >
          <div className="nav-item-content">
            <Users size={18} />
            Users & Groups
          </div>
          <ChevronDown 
            size={16} 
            className={`chevron-icon ${isUsersOpen ? 'open' : ''}`} 
          />
        </div>

        {isUsersOpen && (
          <div className="sidebar-sub-nav">
            {usersSubItems.map((item) => (
              <a 
                key={item.name} 
                href="#" 
                className={`sub-nav-item ${activePage === item.name ? 'active' : ''}`}
                onClick={() => setActivePage(item.name)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        )}

        <a href="#" className={`nav-item ${activePage === 'Change Log' ? 'active' : ''}`} onClick={() => setActivePage('Change Log')}>
          <History size={18} />
          Change Log
        </a>

        <div className="nav-group-label">Settings</div>
        <a href="#" className={`nav-item ${activePage === 'Settings' ? 'active' : ''}`} onClick={() => setActivePage('Settings')}>
          <Settings size={18} />
          Settings
        </a>
        <a href="#" className={`nav-item ${activePage === 'Notifications' ? 'active' : ''}`} onClick={() => setActivePage('Notifications')}>
          <Bell size={18} />
          Notifications
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
