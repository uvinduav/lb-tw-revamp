import React from 'react';
import ModulePage from '../ModulePage';

const COMPANY_DATA = [
  { id: 1, name: 'Ceylon Beverage Holdings', code: '1000', registration: 'TAX-001', city: 'Colombo' },
  { id: 2, name: 'Lion Beer Ceylon PTE LTD', code: '4200', registration: 'TAX-002', city: 'Colombo' },
  { id: 3, name: 'Lion Brewery Sri Lanka', code: '1100', registration: 'TAX-003', city: 'Biyagama' },
  { id: 4, name: 'Luxury Brands Pvt Ltd.', code: '3000', registration: 'TAX-004', city: 'Colombo' },
  { id: 5, name: 'Millers Brewery Ltd', code: '4100', registration: 'TAX-005', city: 'Colombo' },
  { id: 6, name: 'Pearl Spring Pvt Ltd', code: '4000', registration: 'TAX-006', city: 'Colombo' },
  { id: 7, name: "Pubs'N Places Pvt Ltd", code: '2100', registration: 'TAX-007', city: 'Colombo' },
  { id: 8, name: 'Retail Spaces Pvt Ltd', code: '2000', registration: 'TAX-008', city: 'Colombo' },
];

const Companies = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Companies"
      columns={['Name', 'Code', 'Registration', 'City']}
      data={COMPANY_DATA}
      filterFields={['Name', 'Code', 'Registration', 'City']}
      dataMap={{ 
          'Name': 'name', 
          'Code': 'code', 
          'Registration': 'registration',
          'City': 'city'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Companies' })}
      createButtonText="Add New Company"
    />
  );
};

export default Companies;
