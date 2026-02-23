import React from 'react';
import ModulePage from '../ModulePage';

const DURATION_DATA = [
  { id: 1, title: '1 month', type: 'FD' },
  { id: 2, title: '1 year', type: 'FD' },
  { id: 3, title: '100 days', type: 'FD' },
  { id: 4, title: '13 months', type: 'FD' },
  { id: 5, title: '14 days', type: 'FD' },
  { id: 6, title: '15 months', type: 'FD' },
  { id: 7, title: '18 months', type: 'FD' },
  { id: 8, title: '180 days', type: 'FD' },
  { id: 9, title: '2 months', type: 'FD' },
  { id: 10, title: '2 years', type: 'FD' },
];

const Durations = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Durations"
      columns={['Title', 'Product Type']}
      data={DURATION_DATA}
      filterFields={['Title', 'Product Type']}
      dataMap={{ 
          'Title': 'title', 
          'Product Type': 'type'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Durations' })}
      createButtonText="Add New Duration"
    />
  );
};

export default Durations;
