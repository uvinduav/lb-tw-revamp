import React from 'react';
import ModulePage from '../ModulePage';

const Durations = () => {
  return (
    <ModulePage 
      title="Durations"
      columns={['Duration Name', 'Days', 'Months', 'Years', 'Status']}
      data={[]}
      filterFields={['Duration Name', 'Status']}
      dataMap={{ 
          'Duration Name': 'name', 
          'Days': 'days', 
          'Months': 'months',
          'Years': 'years',
          'Status': 'status'
      }}
    />
  );
};

export default Durations;
