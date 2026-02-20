import React, { useState, useEffect } from 'react';
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
  Tag,
  Activity
} from "lucide-react";

import lionLogo from "../assets/lb-tw-logo.png";

// Navigation Items Configuration
const mainNavItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} />, shortcut: '1' },
  { name: 'Accounts', icon: <Book size={18} />, shortcut: '2' },
  { name: 'Payments', icon: <DollarSign size={18} />, shortcut: '3' },
  { name: 'Accruals', icon: <Stamp size={18} />, shortcut: '4' },
  { name: 'Reports', icon: <FileText size={18} />, shortcut: '5' },
  { name: 'Floating Rates', icon: <TrendingUp size={18} />, shortcut: '6' },
  { name: 'Posting Center', icon: <ListChecks size={18} />, shortcut: '7' },
  { name: 'Working Calendar', icon: <Calendar size={18} />, shortcut: '8' },
];

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
  { name: "Thresholds", icon: <Activity size={16} /> },
];

const usersSubItems = [
  { name: "Users", icon: <User size={16} /> },
  { name: "User Groups", icon: <Users size={16} /> },
  { name: "Alerts", icon: <Bell size={16} /> },
];



const Sidebar = ({
  activePage,
  setActivePage,
  isOpen,
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
  const [isParametersOpen, setIsParametersOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if Alt key is pressed
      if (!e.altKey) return;

      // Avoid triggering when user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      const key = e.key.toLowerCase();

      // Check main nav items
      const targetItem = mainNavItems.find(item => item.shortcut === key);
      if (targetItem) {
        e.preventDefault();
        setActivePage(targetItem.name);
        return;
      }


    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePage]);



  return (
    <div
      className={`sidebar ${!isOpen ? 'closed' : ''} ${isHovered ? 'floating' : ''} `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-header">
        <img src={lionLogo} alt="Lion Logo" className="logo-img" />
      </div>

      <div className="sidebar-nav">
        {mainNavItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`nav-item ${activePage === item.name ? 'active' : ''}`}
            onClick={() => setActivePage(item.name)}
          >
            {item.icon}
            {item.name}
            <span className="shortcut-key">Alt+{item.shortcut}</span>
          </a>
        ))}

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
            Users & Alerts
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



      </div>
    </div>
  );
};

export default Sidebar;
