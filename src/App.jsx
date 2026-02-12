import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Accounts from './components/modules/Accounts';
import Dashboard from './components/modules/Dashboard';
import Payments from './components/modules/Payments';
import Accruals from './components/modules/Accruals';
import Reports from './components/modules/Reports';
import FloatingRates from './components/modules/FloatingRates';
import PostingCenter from './components/modules/PostingCenter';
import WorkingCalendar from './components/modules/WorkingCalendar';
import ChangeLog from './components/modules/ChangeLog';
import Settings from './components/modules/Settings';
import Notifications from './components/modules/Notifications';
import Banks from './components/modules/Banks';
import Benchmarks from './components/modules/Benchmarks';
import Branches from './components/modules/Branches';
import Companies from './components/modules/Companies';
import Currencies from './components/modules/Currencies';
import Durations from './components/modules/Durations';
import InterestRates from './components/modules/InterestRates';
import ExchangeRates from './components/modules/ExchangeRates';
import PurposeTags from './components/modules/PurposeTags';
import Users from './components/modules/Users';
import UserGroups from './components/modules/UserGroups';

import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Use hook for global sidebar toggle shortcut
  useKeyboardShortcuts(null, null, toggleSidebar);

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Accounts': return <Accounts />;
      case 'Payments': return <Payments />;
      case 'Accruals': return <Accruals />;
      case 'Reports': return <Reports />;
      case 'Floating Rates': return <FloatingRates />;
      case 'Posting Center': return <PostingCenter />;
      case 'Working Calendar': return <WorkingCalendar />;

      // Setup - Parameters
      case 'Banks': return <Banks />;
      case 'Benchmarks': return <Benchmarks />;
      case 'Branches': return <Branches />;
      case 'Companies': return <Companies />;
      case 'Currencies': return <Currencies />;
      case 'Durations': return <Durations />;
      case 'Interest Rates': return <InterestRates />;
      case 'Exchange Rates': return <ExchangeRates />;
      case 'Purpose Tags': return <PurposeTags />;

      // Setup - Users
      case 'Users': return <Users />;
      case 'User Groups': return <UserGroups />;

      case 'Change Log': return <ChangeLog />;
      case 'Settings': return <Settings />;
      case 'Notifications': return <Notifications />;

      default: return <Accounts />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Trigger Zone for Hover Reveal */}
      {!isSidebarOpen && (
        <div
          className="sidebar-trigger"
          onMouseEnter={() => setIsSidebarHovered(true)}
        />
      )}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        isHovered={isSidebarHovered}
        onMouseEnter={() => !isSidebarOpen && setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      />

      <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
        <Topbar
          activePage={activePage}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
