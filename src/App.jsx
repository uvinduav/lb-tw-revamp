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
import CashFlow from './components/modules/CashFlow';
import EntityDetails from './components/modules/EntityDetails';
import BankDetails from './components/modules/BankDetails';
import AccountDetails from './components/modules/AccountDetails';
import DebtDetails from './components/modules/DebtDetails';
import CashPositionDetails from './components/modules/CashPositionDetails';
import InvestmentDetails from './components/modules/InvestmentDetails';

import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import SlidingPanel from './components/common/SlidingPanel';
import AlertsPanel from './components/modules/AlertsPanel';
import TasksPanel from './components/modules/TasksPanel';
import ScrollToTop from './components/common/ScrollToTop';
import Thresholds from './components/modules/Thresholds';
import Alerts from './components/modules/Alerts';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Panel State
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  // History state for chronological navigation
  const [history, setHistory] = useState([{ page: 'Dashboard', entity: null, bank: null, account: null }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handlePageChange = (page, entity = null, bank = null, account = null, isHistoryNav = false) => {
    // If not navigating history, push new state and truncate "forward" history
    if (!isHistoryNav) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ page, entity, bank, account });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    if (entity !== undefined) setSelectedEntity(entity);
    if (bank !== undefined) setSelectedBank(bank);
    if (account !== undefined) setSelectedAccount(account);
    setActivePage(page);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      handlePageChange(prev.page, prev.entity, prev.bank, prev.account, true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      handlePageChange(next.page, next.entity, next.bank, next.account, true);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // use hook for global sidebar toggle shortcut
  useKeyboardShortcuts(null, null, toggleSidebar);

  React.useEffect(() => {
    const titleMap = {
      'Settings': 'Profile Settings'
    };
    document.title = (titleMap[activePage] || activePage) + ' - LB Treasury';
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard onNavigate={handlePageChange} />;
      case 'Entity Details': return <EntityDetails entity={selectedEntity} onNavigate={handlePageChange} onBack={() => setActivePage('Dashboard')} />;
      case 'Bank Details': return <BankDetails entity={selectedEntity} bank={selectedBank} onNavigate={handlePageChange} onBack={() => setActivePage('Entity Details')} />;
      case 'Account Details': return <AccountDetails account={selectedAccount} bank={selectedBank} entity={selectedEntity} onBack={() => setActivePage('Bank Details')} />;
      case 'Debt Details': return <DebtDetails onNavigate={handlePageChange} />;
      case 'Cash Position Details': return <CashPositionDetails onNavigate={handlePageChange} />;
      case 'Investment Details': return <InvestmentDetails onNavigate={handlePageChange} />;
      case 'Cash Flow': return <CashFlow onNavigate={setActivePage} />;
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
      case 'Thresholds': return <Thresholds />;

      // Setup - Users
      case 'Users': return <Users />;
      case 'User Groups': return <UserGroups />;
      case 'Alerts': return <Alerts />;

      case 'Change Log': return <ChangeLog />;
      case 'Settings': return <Settings />;
      case 'Notifications': return <Notifications />;

      default: return <Accounts />;
    }
  };

  const handleBreadcrumbNavigate = (item) => {
    if (item === 'Dashboard') {
      handlePageChange('Dashboard');
    } else if (item === 'Entity Details') {
      handlePageChange('Entity Details', selectedEntity);
    } else if (item === selectedBank) {
      handlePageChange('Bank Details', selectedEntity, selectedBank);
    } else if (item === selectedAccount?.accountNo) {
      handlePageChange('Account Details', selectedEntity, selectedBank, selectedAccount);
    } else {
      handlePageChange(item);
    }
  };

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Liquidity threshold breach: LKR position below minimum requirements' },
    { id: 2, type: 'warning', message: 'Upcoming payment of 5M USD scheduled for tomorrow has insufficient funds' },
    { id: 3, type: 'anomaly', message: 'Unusual transaction volume detected in Commercial Bank VND account' },
    { id: 4, type: 'anomaly', message: 'Significant variance in daily LKR cash flow vs previous month average' },
    { id: 5, type: 'anomaly', message: 'Unexpected withdrawal pattern observed in Entity: Global Exports Ltd' },
  ]);

  const handleDismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
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
        setActivePage={handlePageChange}
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
          showBack={historyIndex > 0}
          onBack={goBack}
          showForward={historyIndex < history.length - 1}
          onForward={goForward}
          onNavigate={handleBreadcrumbNavigate}
          breadcrumb={
            activePage === 'Entity Details' ? 'Dashboard > Entity Details' :
              activePage === 'Bank Details' ? `Dashboard > Entity Details > ${selectedBank || 'Bank Details'}` :
                activePage === 'Account Details' ? `Dashboard > Entity Details > ${selectedBank} > ${selectedAccount?.accountNo || 'Account'}` :
                  activePage === 'Debt Details' ? 'Dashboard > Debt Details' :
                    activePage === 'Cash Position Details' ? 'Dashboard > Cash Position Details' :
                      activePage === 'Investment Details' ? 'Dashboard > Investment Details' :
                        activePage === 'Settings' ? 'Profile Settings' :
                          activePage
          }
          onAlertsClick={() => setIsAlertsOpen(true)}
          onTasksClick={() => setIsTasksOpen(true)}
          alerts={alerts}
        />
        {renderPage()}
      </div>

      <AlertsPanel
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onDismiss={handleDismissAlert}
      />
      <TasksPanel isOpen={isTasksOpen} onClose={() => setIsTasksOpen(false)} />
      <ScrollToTop activePage={activePage} />
    </div>
  );
}

export default App;
