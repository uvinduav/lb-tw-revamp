import React from 'react';
import ModulePage from '../ModulePage';

const Benchmarks = () => {
  return (
    <ModulePage 
      title="Benchmarks"
      columns={['Benchmark Name', 'Code', 'Currency', 'Tenor', 'Status']}
      data={[]}
      filterFields={['Benchmark Name', 'Currency', 'Status']}
      dataMap={{ 
          'Benchmark Name': 'name', 
          'Code': 'code',
          'Currency': 'currency',
          'Tenor': 'tenor',
          'Status': 'status'
      }}
    />
  );
};

export default Benchmarks;
