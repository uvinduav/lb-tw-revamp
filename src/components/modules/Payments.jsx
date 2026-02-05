import React from 'react';
import ModulePage from '../ModulePage';

const Payments = () => {
  return (
    <ModulePage 
      title="Payments"
      columns={['Payment ID', 'Beneficiary', 'Amount', 'Currency', 'Date', 'Status']}
      data={[]}
      filterFields={['Payment ID', 'Beneficiary', 'Currency', 'Status']}
      dataMap={{ 
          'Payment ID': 'paymentId', 
          'Beneficiary': 'beneficiary', 
          'Amount': 'amount',
          'Currency': 'currency',
          'Date': 'date',
          'Status': 'status' 
      }}
    />
  );
};

export default Payments;
