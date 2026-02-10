import React from 'react';
import ModulePage from '../ModulePage';

const BANK_DATA = [
  { id: 1, name: 'Bank of China', code: 'BOCC', swift: 'BKCHLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 2, name: 'Citi Bank', code: 'CITI', swift: 'CITILKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 3, name: 'Commercial Bank', code: 'COMB', swift: 'CCEYLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 4, name: 'Deutsche Bank', code: 'DEUT', swift: 'DEUTLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 5, name: 'DFCC Bank', code: 'DFCC', swift: 'DFCCLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 6, name: 'Hatton National Bank', code: 'HNB', swift: 'HBLILKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 7, name: 'Nation Trust Bank', code: 'NTB', swift: 'NTBCLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 8, name: 'NDB Bank', code: 'NDB', swift: 'NDBALKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 9, name: "People's Bank", code: 'PB', swift: 'PSBKLKLX', country: 'Sri Lanka', status: 'Active' },
  { id: 10, name: 'Sampath Bank', code: 'SAMPATH', swift: 'BSAMLKLX', country: 'Sri Lanka', status: 'Active' },
];

const Banks = () => {
  return (
    <ModulePage 
      title="Banks"
      columns={['Bank Name', 'Short Code', 'SWIFT / BIC Code']}
      data={BANK_DATA}
      filterFields={['Bank Name', 'Short Code', 'SWIFT / BIC Code']}
      dataMap={{ 
          'Bank Name': 'name', 
          'Short Code': 'code', 
          'SWIFT / BIC Code': 'swift'
      }}
    />
  );
};

export default Banks;
