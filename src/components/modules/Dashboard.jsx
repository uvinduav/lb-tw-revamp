import React from 'react';
import ModulePage from '../ModulePage';

const Dashboard = () => {
  return (
    <ModulePage 
      title="Dashboard"
      columns={['Widget', 'Status', 'Last Updated']}
      data={[]}
      filterFields={['Status']}
      dataMap={{ 'Widget': 'widget', 'Status': 'status', 'Last Updated': 'lastUpdated' }}
    />
  );
};

export default Dashboard;
