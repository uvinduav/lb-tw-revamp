import React from 'react';
import ModulePage from '../ModulePage';

import { CURRENCY_DATA } from '../../constants/parameterData';

const Currencies = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Currencies"
      columns={['Name', 'Code', 'Symbol']}
      data={CURRENCY_DATA}
      filterFields={['Name', 'Code', 'Symbol']}
      dataMap={{
        'Name': 'name',
        'Code': 'code',
        'Symbol': 'symbol'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Currencies' })}
      createButtonText="Add New Currency"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Currencies' })}
    />
  );
};

export default Currencies;
