import React from 'react';
import ModulePage from '../ModulePage';

const CURRENCY_DATA = [
  { id: 1, name: 'US Dollar', code: 'USD', symbol: '$', country: 'United States', status: 'Active' },
  { id: 2, name: 'Euro', code: 'EUR', symbol: '€', country: 'European Union', status: 'Active' },
  { id: 3, name: 'British Pound', code: 'GBP', symbol: '£', country: 'United Kingdom', status: 'Active' },
  { id: 4, name: 'Japanese Yen', code: 'JPY', symbol: '¥', country: 'Japan', status: 'Active' },
  { id: 5, name: 'Sri Lankan Rupee', code: 'LKR', symbol: 'Rs', country: 'Sri Lanka', status: 'Active' },
  { id: 6, name: 'Australian Dollar', code: 'AUD', symbol: 'A$', country: 'Australia', status: 'Active' },
  { id: 7, name: 'Canadian Dollar', code: 'CAD', symbol: 'C$', country: 'Canada', status: 'Active' },
  { id: 8, name: 'Swiss Franc', code: 'CHF', symbol: 'Fr.', country: 'Switzerland', status: 'Active' },
  { id: 9, name: 'Chinese Yuan', code: 'CNY', symbol: '¥', country: 'China', status: 'Active' },
  { id: 10, name: 'Indian Rupee', code: 'INR', symbol: '₹', country: 'India', status: 'Active' },
];

const Currencies = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Currencies"
      columns={['Name', 'Code', 'Symbol']}
      data={CURRENCY_DATA}
      filterFields={['Name', 'Code', 'Symbol']}
      dataMap={{ 
          'Name': 'name', 
          'Code': 'code', 
          'Symbol': 'symbol'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Currencies' })}
      createButtonText="Add New Currency"
    />
  );
};

export default Currencies;
