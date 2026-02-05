import React from 'react';
import ModulePage from '../ModulePage';

const Banks = () => {
  return (
    <ModulePage 
      title="Banks"
      columns={['Bank Name', 'Bank Code', 'Swift Code', 'Country', 'Status']}
      data={[]}
      filterFields={['Bank Name', 'Bank Code', 'Country', 'Status']}
      dataMap={{ 
          'Bank Name': 'name', 
          'Bank Code': 'code', 
          'Swift Code': 'swift',
          'Country': 'country',
          'Status': 'status'
      }}
    />
  );
};

export default Banks;
