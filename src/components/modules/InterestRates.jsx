import React from 'react';
import ModulePage from '../ModulePage';

const InterestRates = () => {
  return (
    <ModulePage 
      title="Interest Rates"
      columns={['Rate Name', 'Rate %', 'Type', 'Effective Date', 'Status']}
      data={[]}
      filterFields={['Rate Name', 'Type', 'Status']}
      dataMap={{ 
          'Rate Name': 'name', 
          'Rate %': 'rate', 
          'Type': 'type',
          'Effective Date': 'effectiveDate',
          'Status': 'status'
      }}
    />
  );
};

export default InterestRates;
