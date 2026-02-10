import React from 'react';
import ModulePage from '../ModulePage';

const CHANGELOG_DATA = [
  { id: 1, logId: 'L001', action: 'Update', user: 'System', target: 'FloatingRate #15', timestamp: '2026-02-05 2:00:06' },
  { id: 2, logId: 'L002', action: 'Update', user: 'System', target: 'FloatingRate #16', timestamp: '2026-02-05 2:00:06' },
  { id: 3, logId: 'L003', action: 'Update', user: 'System', target: 'FloatingRate #17', timestamp: '2026-02-05 2:00:06' },
  { id: 4, logId: 'L004', action: 'Update', user: 'System', target: 'FloatingRate #20', timestamp: '2026-02-05 2:00:06' },
  { id: 5, logId: 'L005', action: 'Update', user: 'System', target: 'FloatingRate #19', timestamp: '2026-02-05 2:00:06' },
  { id: 6, logId: 'L006', action: 'Update', user: 'System', target: 'FloatingRate #18', timestamp: '2026-02-05 2:00:06' },
  { id: 7, logId: 'L007', action: 'Create', user: 'System', target: 'LoanPayment #27', timestamp: '2026-02-04 3:00:02' },
];

const ChangeLog = () => {
  return (
    <ModulePage 
      title="Change Log"
      columns={['TIME', 'ENTITY', 'ACTION', 'USER', 'CHANGES']}
      data={CHANGELOG_DATA}
      filterFields={['TIME', 'ENTITY', 'ACTION', 'USER', 'CHANGES']}
      dataMap={{ 
          'TIME': 'timestamp', 
          'ENTITY': 'target', 
          'ACTION': 'action',
          'USER': 'user',
          'CHANGES': 'changes'
      }}
      showAddButton={false}
      showDefaultRowActions={false}
    />
  );
};

export default ChangeLog;
