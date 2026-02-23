import React, { useState } from 'react';
import {
  PanelLeft,
  ArrowLeft,
  ArrowRight,
  User,
  ChevronDown,
  MessageSquareWarning,
  SquareCheckBig,
  Bell,
  Settings,
  LogOut,
  Mail
} from 'lucide-react';
import Popover from './common/Popover';

const Topbar = ({ activePage, toggleSidebar, isSidebarOpen, showBack, onBack, showForward, onForward, breadcrumb, onNavigate, onAlertsClick, onTasksClick, alerts = [] }) => {
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [shouldWiggle, setShouldWiggle] = useState(false);

  const alertCount = alerts.length;
  const mostCriticalLevel = alerts.some(a => a.type === 'critical') ? 'critical' :
    alerts.some(a => a.type === 'warning') ? 'warning' :
      alerts.some(a => a.type === 'anomaly') ? 'anomaly' : 'none';

  React.useEffect(() => {
    if (alertCount > 0) {
      setShouldWiggle(true);
      const timer = setTimeout(() => setShouldWiggle(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [alertCount]);

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(notificationsAnchor ? null : event.currentTarget);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(userMenuAnchor ? null : event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationsAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleSeeAllNotifications = () => {
    setNotificationsAnchor(null);
    if (onNavigate) onNavigate('Notifications');
  };

  const handleSettingsClick = () => {
    setUserMenuAnchor(null);
    if (onNavigate) onNavigate('Settings');
  };

  const handleLogout = () => {
    setUserMenuAnchor(null);
    console.log('Logging out...');
  };

  const alertPillColors = {
    none: 'bg-gray-100 text-gray-500 hover:bg-gray-200',
    critical: 'bg-red-100 text-red-500 hover:bg-red-200',
    warning: 'bg-orange-100 text-orange-500 hover:bg-orange-200',
    anomaly: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  };

  return (
    <div className="h-[44px] border-b border-border flex items-center justify-between px-6 bg-surface sticky top-0 z-5 shrink-0">
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <div
          className="flex items-center justify-center w-8 h-8 rounded cursor-pointer transition-colors duration-200 -ml-1.5 hover:bg-bg-subtle group"
          onClick={toggleSidebar}
          title={`${isSidebarOpen ? 'Hide' : 'Show'} Sidebar (Alt+\\)`}
        >
          <PanelLeft size={20} className="text-[#666] group-hover:text-primary-action" />
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors duration-200 hover:bg-bg-subtle group ${showBack ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-30'}`}
            title="Back"
            onClick={() => showBack && onBack()}
          >
            <ArrowLeft size={18} className="text-[#666] group-hover:text-primary-action" />
          </div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors duration-200 hover:bg-bg-subtle group ${showForward ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-30'}`}
            title="Forward"
            onClick={() => showForward && onForward()}
          >
            <ArrowRight size={18} className="text-[#666] group-hover:text-primary-action" />
          </div>
        </div>
        <div className="flex items-center gap-1 ml-1">
          {(breadcrumb || activePage).split(' > ').map((item, index, array) => (
            <React.Fragment key={index}>
              <span
                className={`text-xs ${index === array.length - 1 ? 'font-medium text-text-main' : 'font-normal text-text-secondary cursor-pointer'}`}
                onClick={() => index < array.length - 1 && onNavigate && onNavigate(item)}
              >
                {item}
              </span>
              {index < array.length - 1 && (
                <span className="text-xs text-text-secondary mx-0.5">&gt;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-2.5 h-7 rounded text-xs font-medium cursor-pointer transition-all duration-200 ${alertPillColors[mostCriticalLevel] || alertPillColors.none} ${shouldWiggle ? 'wiggle' : ''}`} onClick={onAlertsClick}>
          <MessageSquareWarning size={14} />
          <span>{alertCount} {alertCount === 1 ? 'Alert' : 'Alerts'}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#e0ebff] text-blue-500 px-2.5 h-7 rounded text-xs font-medium cursor-pointer transition-colors duration-200 hover:bg-[#d1e1ff]" onClick={onTasksClick}>
          <SquareCheckBig size={14} />
          <span>1</span>
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <div className="relative">
          <div
            className={`relative flex items-center justify-center w-7 h-7 border border-gray-200 rounded cursor-pointer text-[#666] transition-all duration-200 bg-white hover:bg-[#f9f9f9] hover:border-gray-300 ${notificationsAnchor ? 'bg-gray-100 border-gray-300' : ''}`}
            onClick={handleNotificationsClick}
          >
            <Bell size={16} />
            <div className="absolute -top-1.5 -right-1.5 bg-[#ff6b6b] text-white text-[11px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-[3px] border-white">2</div>
          </div>

          <Popover
            isOpen={!!notificationsAnchor}
            onClose={handleCloseNotifications}
            anchorEl={notificationsAnchor}
            topOffset={8}
            rightOffset={0}
            className="w-80"
          >
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-text-main">Notifications</h3>
            </div>
            <div className="py-2">
              <div className="max-h-[300px] overflow-y-auto">
                <div className="flex gap-3 px-4 py-3 border-b border-border-subtle cursor-pointer transition-colors duration-150 hover:bg-bg-subtle bg-[#f8fafc]">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-orange-50 text-orange-700">
                    <MessageSquareWarning size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-text-main mb-0.5">System Alert</p>
                    <p className="text-xs text-text-secondary leading-snug">High server load detected.</p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">2m</span>
                </div>
                <div className="flex gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-bg-subtle">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-blue-50 text-blue-700">
                    <SquareCheckBig size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-text-main mb-0.5">Task Assigned</p>
                    <p className="text-xs text-text-secondary leading-snug">New audit task assigned.</p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">1h</span>
                </div>
              </div>
              <button className="block w-full py-2.5 text-center text-[13px] font-medium text-blue-500 bg-transparent border-none border-t border-border cursor-pointer mt-1 hover:bg-bg-subtle" onClick={handleSeeAllNotifications}>
                See all notifications
              </button>
            </div>
          </Popover>
        </div>

        <div className="relative">
          <div
            className={`flex items-center gap-1.5 px-2 h-7 rounded border border-border cursor-pointer text-xs text-[#666] transition-all duration-200 bg-white hover:bg-bg-subtle hover:border-gray-300 ${userMenuAnchor ? 'bg-gray-100 border-gray-300' : ''}`}
            onClick={handleUserMenuClick}
          >
            <User size={16} />
            <ChevronDown size={12} />
          </div>

          <Popover
            isOpen={!!userMenuAnchor}
            onClose={handleCloseUserMenu}
            anchorEl={userMenuAnchor}
            topOffset={8}
            rightOffset={0}
            className="w-60"
          >
            <div className="p-4 flex items-center gap-3 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={24} color="#555" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-text-main">Kamal Perera</p>
                <p className="text-xs text-text-secondary mt-0.5">kamal@avlyon.com</p>
              </div>
            </div>
            <div className="p-1.5 flex flex-col gap-0.5">
              <button className="flex items-center gap-2.5 w-full py-2 px-3 border-none bg-transparent text-left text-[13px] text-text-main rounded-md cursor-pointer transition-all duration-150 hover:bg-bg-subtle [&_svg]:text-gray-500" onClick={handleSettingsClick}>
                <Settings size={16} />
                <span>Profile Settings</span>
              </button>
              <button className="flex items-center gap-2.5 w-full py-2 px-3 border-none bg-transparent text-left text-[13px] text-red-500 rounded-md cursor-pointer transition-all duration-150 hover:bg-red-50 [&_svg]:text-red-500" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
