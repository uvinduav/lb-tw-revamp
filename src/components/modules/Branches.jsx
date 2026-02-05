import React from 'react';
import ModulePage from '../ModulePage';

const Branches = () => {
  return (
    <ModulePage 
      title="Branches"
      columns={['Branch Name', 'Branch Code', 'Bank', 'Location', 'Status']}
      data={[]}
      filterFields={['Branch Name', 'Bank', 'Location', 'Status']}
      dataMap={{ 
          'Branch Name': 'name', 
          'Branch Code': 'code', 
          'Bank': 'bank',
          'Location': 'location',
          'Status': 'status'
      }}
    />
  );
};

export default Branches;
