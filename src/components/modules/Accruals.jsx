import React from 'react';
import ModulePage from '../ModulePage';

const Accruals = () => {
  return (
    <ModulePage 
      title="Accruals"
      columns={['Accrual Ref', 'Account', 'Amount', 'Date', 'Type', 'Status']}
      data={[]}
      filterFields={['Account', 'Type', 'Status']}
      dataMap={{ 
          'Accrual Ref': 'ref', 
          'Account': 'account', 
          'Amount': 'amount',
          'Date': 'date',
          'Type': 'type',
          'Status': 'status' 
      }}
    />
  );
};

export default Accruals;
