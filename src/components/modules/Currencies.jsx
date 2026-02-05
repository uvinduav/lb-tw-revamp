import React from 'react';
import ModulePage from '../ModulePage';

const Currencies = () => {
  return (
    <ModulePage 
      title="Currencies"
      columns={['Code', 'Name', 'Symbol', 'Country', 'Status']}
      data={[]}
      filterFields={['Code', 'Name', 'Country', 'Status']}
      dataMap={{ 
          'Code': 'code', 
          'Name': 'name', 
          'Symbol': 'symbol',
          'Country': 'country',
          'Status': 'status'
      }}
    />
  );
};

export default Currencies;
