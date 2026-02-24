import React from 'react';
import ModulePage from '../ModulePage';

import { COMPANY_DATA } from '../../constants/parameterData';

const Companies = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Companies"
      columns={['Name', 'Code', 'Registration', 'City']}
      data={COMPANY_DATA}
      filterFields={['Name', 'Code', 'Registration', 'City']}
      dataMap={{
        'Name': 'name',
        'Code': 'code',
        'Registration': 'registration',
        'City': 'city'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Companies' })}
      createButtonText="Add New Company"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Companies' })}
    />
  );
};

export default Companies;
