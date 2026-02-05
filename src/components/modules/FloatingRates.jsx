import React from 'react';
import ModulePage from '../ModulePage';

const FloatingRates = () => {
  return (
    <ModulePage 
      title="Floating Rates"
      columns={['Rate Name', 'Base Rate', 'Spread', 'Effective Date', 'Status']}
      data={[]}
      filterFields={['Rate Name', 'Status']}
      dataMap={{ 
          'Rate Name': 'name', 
          'Base Rate': 'baseRate', 
          'Spread': 'spread',
          'Effective Date': 'effectiveDate',
          'Status': 'status' 
      }}
    />
  );
};

export default FloatingRates;
