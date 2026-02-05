import React from 'react';
import ModulePage from '../ModulePage';

const Notifications = () => {
  return (
    <ModulePage 
      title="Notifications"
      columns={['Subject', 'Message', 'Type', 'Received', 'Status']}
      data={[]}
      filterFields={['Subject', 'Type', 'Status']}
      dataMap={{ 
          'Subject': 'subject', 
          'Message': 'message', 
          'Type': 'type',
          'Received': 'received',
          'Status': 'status'
      }}
    />
  );
};

export default Notifications;
