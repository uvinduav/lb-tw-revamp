import React from 'react';
import ModulePage from '../ModulePage';

const BENCHMARK_DATA = [
  { id: 1, name: 'AWPLR', country: 'Sri Lanka', code: 'AWPLR-1M', currency: 'LKR', tenor: '1 Month', status: 'Active' },
  { id: 2, name: 'AWPLR CBSL Bi-Annually (System)', country: 'Sri Lanka', code: 'AWPLR-6M', currency: 'LKR', tenor: '6 Months', status: 'Active' },
  { id: 3, name: 'AWPLR CBSL Monthly (System)', country: 'Sri Lanka', code: 'AWPLR-1M', currency: 'LKR', tenor: '1 Month', status: 'Active' },
  { id: 4, name: 'AWPLR CBSL Weekly (System)', country: 'Sri Lanka', code: 'AWPLR-1W', currency: 'LKR', tenor: '1 Week', status: 'Active' },
  { id: 5, name: 'AWPLR Monthly', country: 'Sri Lanka', code: 'AWPLR-M', currency: 'LKR', tenor: '1 Month', status: 'Active' },
  { id: 6, name: 'AWPLR Quarterly', country: 'Sri Lanka', code: 'AWPLR-Q', currency: 'LKR', tenor: '3 Months', status: 'Active' },
  { id: 7, name: 'AWPLR Weekly', country: 'Sri Lanka', code: 'AWPLR-W', currency: 'LKR', tenor: '1 Week', status: 'Active' },
];

const Benchmarks = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Benchmarks"
      columns={['Name', 'Country']}
      data={BENCHMARK_DATA}
      filterFields={['Name', 'Country']}
      dataMap={{ 
          'Name': 'name', 
          'Country': 'country'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Benchmarks' })}
      createButtonText="Add New Benchmark"
    />
  );
};

export default Benchmarks;
