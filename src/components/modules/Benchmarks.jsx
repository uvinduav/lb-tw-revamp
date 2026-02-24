import React from 'react';
import ModulePage from '../ModulePage';

import { BENCHMARK_DATA } from '../../constants/parameterData';

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
