import React from 'react';
import ModulePage from '../ModulePage';

import { DURATION_DATA } from '../../constants/parameterData';

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
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Durations' })}
    />
  );
};

export default Durations;
