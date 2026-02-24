import React from 'react';
import ModulePage from '../ModulePage';

import { BRANCH_DATA } from '../../constants/parameterData';

const Branches = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Branches"
      columns={['Name', 'Code', 'Bank', 'City']}
      data={BRANCH_DATA}
      filterFields={['Name', 'Code', 'Bank', 'City']}
      dataMap={{
        'Name': 'name',
        'Code': 'code',
        'Bank': 'bank',
        'City': 'location'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Branches' })}
      createButtonText="Add New Branch"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Branches' })}
    />
  );
};

export default Branches;
