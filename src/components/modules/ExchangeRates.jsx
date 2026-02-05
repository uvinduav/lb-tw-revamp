import React from 'react';
import ModulePage from '../ModulePage';

const ExchangeRates = () => {
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
    />
  );
};

export default ExchangeRates;
