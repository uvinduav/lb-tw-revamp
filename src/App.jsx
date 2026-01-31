import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AccountsTable from './components/AccountsTable';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <AccountsTable />
      </div>
    </div>
  );
}

export default App;
