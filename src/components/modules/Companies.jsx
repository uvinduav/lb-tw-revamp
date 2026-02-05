import React from 'react';
import ModulePage from '../ModulePage';

const Companies = () => {
  return (
    <ModulePage 
      title="Companies"
      columns={['Company Name', 'Registration No.', 'Tax ID', 'Sector', 'Status']}
      data={[]}
      filterFields={['Company Name', 'Sector', 'Status']}
      dataMap={{ 
          'Company Name': 'name', 
          'Registration No.': 'regNo', 
          'Tax ID': 'taxId',
          'Sector': 'sector',
          'Status': 'status'
      }}
    />
  );
};

export default Companies;
