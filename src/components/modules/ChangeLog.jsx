import React from 'react';
import ModulePage from '../ModulePage';

const ChangeLog = () => {
  return (
    <ModulePage 
      title="Change Log"
      columns={['Log ID', 'Action', 'User', 'Target', 'Timestamp']}
      data={[]}
      filterFields={['Action', 'User', 'Target']}
      dataMap={{ 
          'Log ID': 'logId', 
          'Action': 'action', 
          'User': 'user',
          'Target': 'target',
          'Timestamp': 'timestamp'
      }}
    />
  );
};

export default ChangeLog;
