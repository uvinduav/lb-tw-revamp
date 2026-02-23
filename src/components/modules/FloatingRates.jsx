import React from 'react';
import ModulePage from '../ModulePage';

const FLOATING_RATE_DATA = [
  { id: 1, name: 'SOFR', baseRate: '5.31%', spread: '0.10%', effectiveDate: '2026-02-01', status: 'Active' },
  { id: 2, name: 'LIBOR 3M', baseRate: '5.58%', spread: '0.25%', effectiveDate: '2026-01-15', status: 'Active' },
  { id: 3, name: 'AWPLR', baseRate: '9.45%', spread: '1.50%', effectiveDate: '2026-02-01', status: 'Active' },
  { id: 4, name: 'EURIBOR 6M', baseRate: '3.89%', spread: '0.15%', effectiveDate: '2026-01-20', status: 'Active' },
  { id: 5, name: 'T-Bill 91D', baseRate: '9.12%', spread: '0.50%', effectiveDate: '2026-02-01', status: 'Active' },
];

const FloatingRates = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Floating Rates"
      columns={['Rate Name', 'Base Rate', 'Spread', 'Effective Date', 'Status']}
      data={FLOATING_RATE_DATA}
      filterFields={['Rate Name', 'Status']}
      dataMap={{ 
          'Rate Name': 'name', 
          'Base Rate': 'baseRate', 
          'Spread': 'spread',
          'Effective Date': 'effectiveDate',
          'Status': 'status' 
      }}
      showDefaultRowActions={false}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Floating Rates' })}
      createButtonText="Add New Rate"
    />
  );
};

export default FloatingRates;
