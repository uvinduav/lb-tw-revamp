import React from 'react';
import ModulePage from '../ModulePage';

const BRANCH_DATA = [
  { id: 1, name: 'Fort Branch', code: 'SCB-FORT', bank: 'Standard Chartered', location: 'Colombo', status: 'Active' },
  { id: 2, name: 'Head Office Branch', code: 'HNB-HO', bank: 'Hatton National Bank', location: 'Colombo', status: 'Active' },
  { id: 3, name: 'Head Office Branch', code: 'CITI-HO', bank: 'Citi Bank', location: 'Colombo', status: 'Active' },
  { id: 4, name: 'Head Office Branch', code: 'DEUT-HO', bank: 'Deutsche Bank', location: 'Colombo', status: 'Active' },
  { id: 5, name: 'Head Office Branch', code: 'SAM-HO', bank: 'Sampath Bank', location: 'Colombo', status: 'Active' },
  { id: 6, name: 'Head Office Branch', code: 'COMB-HO', bank: 'Commercial Bank', location: 'Colombo', status: 'Active' },
  { id: 7, name: 'Head Office Branch', code: 'DFCC-HO', bank: 'DFCC Bank', location: 'Colombo', status: 'Active' },
  { id: 8, name: 'Head Office Branch', code: 'NDB-HO', bank: 'NDB Bank', location: 'Colombo', status: 'Active' },
  { id: 9, name: 'Head Office Branch', code: 'BOC-HO', bank: 'Bank of China', location: 'Colombo', status: 'Active' },
  { id: 10, name: 'Head Office Branch', code: 'PB-HO', bank: "People's Bank", location: 'Colombo', status: 'Active' },
];

const Branches = () => {
  return (
    <ModulePage 
      title="Branches"
      columns={['Name', 'Code', 'Bank', 'City']}
      data={BRANCH_DATA}
      filterFields={['Name', 'Code', 'Bank', 'City']}
      dataMap={{ 
          'Name': 'name', 
          'Code': 'code', 
          'Bank': 'bank',
          'City': 'location'
      }}
    />
  );
};

export default Branches;
