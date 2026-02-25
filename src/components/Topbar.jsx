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
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div
            className={`topbar-icon-btn ${!showBack ? 'disabled' : ''}`}
            title="Back"
            onClick={() => showBack && onBack()}
            style={{
              opacity: showBack ? 1 : 0.3,
              cursor: showBack ? 'pointer' : 'not-allowed',
            }}
          >
            <ArrowLeft size={18} color="#666" />
          </div>
          <div
            className={`topbar-icon-btn ${!showForward ? 'disabled' : ''}`}
            title="Forward"
            onClick={() => showForward && onForward()}
            style={{
              opacity: showForward ? 1 : 0.3,
              cursor: showForward ? 'pointer' : 'not-allowed',
            }}
          >
            <ArrowRight size={18} color="#666" />
          </div>
        </div>
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

      <div className="topbar-right-elements">
        <div className={`topbar-alert-pill ${mostCriticalLevel} ${shouldWiggle ? 'wiggle' : ''}`} onClick={onAlertsClick}>
          <MessageSquareWarning size={14} />
          <span>{alertCount} {alertCount === 1 ? 'Alert' : 'Alerts'}</span>
        </div>

        <div className="topbar-task-pill" onClick={onTasksClick}>
          <SquareCheckBig size={14} />
          <span>1</span>
        </div>

        <div className="topbar-divider" />

        <div style={{ position: 'relative' }}>
          <div
            className={`topbar-icon-box ${notificationsAnchor ? 'active' : ''}`}
            onClick={handleNotificationsClick}
          >
            <Bell size={16} />
            <div className="topbar-badge">2</div>
          </div>

          <Popover
            isOpen={!!notificationsAnchor}
            onClose={handleCloseNotifications}
            anchorEl={notificationsAnchor}
            topOffset={8}
            rightOffset={0}
            className="notifications-popover"
          >
            <div className="popover-header">
              <h3>Notifications</h3>
            </div>
            <div className="popover-content">
              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-icon warning">
                    <MessageSquareWarning size={14} />
                  </div>
                  <div className="notification-text">
                    <p className="notification-title">System Alert</p>
                    <p className="notification-desc">High server load detected.</p>
                  </div>
                  <span className="notification-time">2m</span>
                </div>
                <div className="notification-item">
                  <div className="notification-icon task">
                    <SquareCheckBig size={14} />
                  </div>
                  <div className="notification-text">
                    <p className="notification-title">Task Assigned</p>
                    <p className="notification-desc">New audit task assigned.</p>
                  </div>
                  <span className="notification-time">1h</span>
                </div>
              </div>
              <button className="see-all-btn" onClick={handleSeeAllNotifications}>
                See all notifications
              </button>
            </div>
          </Popover>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            className={`user-profile ${userMenuAnchor ? 'active' : ''}`}
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
            className="user-menu-popover"
          >
            <div className="user-menu-header">
              <div className="user-avatar-circle">
                <User size={24} color="#555" />
              </div>
              <div className="user-info">
                <p className="user-name">Kamal Perera</p>
                <p className="user-email">kamal@avlyon.com</p>
              </div>
            </div>
            <div className="user-menu-actions">
              <button className="user-menu-item" onClick={handleSettingsClick}>
                <Settings size={16} />
                <span>Profile Settings</span>
              </button>
              <button className="user-menu-item logout" onClick={handleLogout}>
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
