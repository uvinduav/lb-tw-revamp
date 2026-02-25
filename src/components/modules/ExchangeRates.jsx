import React from 'react';
import ModulePage from '../ModulePage';

const ExchangeRates = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Exchange Rates"
      columns={['Pair', 'Buy Rate', 'Sell Rate', 'Mid Rate', 'Date']}
      data={[]}
      filterFields={['Pair', 'Date']}
      dataMap={{
        'Pair': 'pair',
        'Buy Rate': 'buy',
        'Sell Rate': 'sell',
        'Mid Rate': 'mid',
        'Date': 'date'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Exchange Rates' })}
      createButtonText="Add New Exchange Rate"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Exchange Rates' })}
    />
  );
};

export default ExchangeRates;
