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
      className={`w-[240px] bg-sidebar-bg text-sidebar-text flex flex-col fixed h-full left-0 top-0 z-[100] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${!isOpen ? '-translate-x-full' : 'translate-x-0'} ${isHovered ? 'translate-x-0 z-[110] shadow-[4px_0_24px_rgba(0,0,0,0.15)]' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-[70px] flex items-center pt-6 px-6">
        <img src={lionLogo} alt="Lion Logo" className="h-8 w-auto object-contain" />
      </div>

      <div className="flex-1 py-4 overflow-y-auto sidebar-scrollbar">
        {mainNavItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`group flex items-center py-2 px-6 cursor-pointer transition-all duration-200 text-[13px] font-medium text-sidebar-text no-underline gap-2.5 whitespace-nowrap hover:bg-sidebar-hover hover:text-sidebar-text-active ${activePage === item.name ? 'text-sidebar-text-active font-semibold border-l-[3px] border-primary-action pl-[21px]' : ''}`}
            onClick={() => setActivePage(item.name)}
          >
            {item.icon}
            {item.name}
            <span className="ml-auto text-[10px] font-semibold text-sidebar-text bg-white/[0.08] border border-white/[0.15] border-b-2 border-b-white/20 px-[5px] py-px rounded-[4px] font-[Inter,sans-serif] opacity-0 translate-x-1 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none flex items-center justify-center leading-none h-[18px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-500">Alt+{item.shortcut}</span>
          </a>
        ))}

        <div className="py-2 px-6 text-[11px] uppercase text-[#78716c] font-semibold mt-4">Setup</div>

        <div
          className="flex items-center justify-between py-2 px-6 cursor-pointer transition-all duration-200 text-[13px] font-medium text-sidebar-text gap-2.5 whitespace-nowrap hover:bg-sidebar-hover hover:text-sidebar-text-active"
          onClick={() => setIsParametersOpen(!isParametersOpen)}
        >
          <div className="flex items-center gap-2.5">
            <Sliders size={18} />
            Parameters
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 text-sidebar-text ${isParametersOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isParametersOpen && (
          <div className="py-1 flex flex-col">
            {subItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center py-2 pr-6 pl-[36px] text-[13px] text-sidebar-text no-underline gap-2.5 transition-all duration-200 opacity-90 whitespace-nowrap hover:text-sidebar-text-active hover:bg-sidebar-hover ${activePage === item.name ? 'text-sidebar-text-active font-semibold' : ''}`}
                onClick={() => setActivePage(item.name)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        )}

        <div
          className="flex items-center justify-between py-2 px-6 cursor-pointer transition-all duration-200 text-[13px] font-medium text-sidebar-text gap-2.5 whitespace-nowrap hover:bg-sidebar-hover hover:text-sidebar-text-active"
          onClick={() => setIsUsersOpen(!isUsersOpen)}
        >
          <div className="flex items-center gap-2.5">
            <Users size={18} />
            Users & Alerts
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 text-sidebar-text ${isUsersOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isUsersOpen && (
          <div className="py-1 flex flex-col">
            {usersSubItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center py-2 pr-6 pl-[36px] text-[13px] text-sidebar-text no-underline gap-2.5 transition-all duration-200 opacity-90 whitespace-nowrap hover:text-sidebar-text-active hover:bg-sidebar-hover ${activePage === item.name ? 'text-sidebar-text-active font-semibold' : ''}`}
                onClick={() => setActivePage(item.name)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        )}

        <a href="#" className={`flex items-center py-2 px-6 cursor-pointer transition-all duration-200 text-[13px] font-medium text-sidebar-text no-underline gap-2.5 whitespace-nowrap hover:bg-sidebar-hover hover:text-sidebar-text-active ${activePage === 'Change Log' ? 'text-sidebar-text-active font-semibold border-l-[3px] border-primary-action pl-[21px]' : ''}`} onClick={() => setActivePage('Change Log')}>
          <History size={18} />
          Change Log
        </a>



      </div>
    </div>
  );
};

export default Sidebar;
