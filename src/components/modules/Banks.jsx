import React from 'react';
import ModulePage from '../ModulePage';

import { BANK_DATA } from '../../constants/parameterData';

const Banks = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Banks"
      columns={['Bank Name', 'Short Code', 'SWIFT / BIC Code']}
      data={BANK_DATA}
      filterFields={['Bank Name', 'Short Code', 'SWIFT / BIC Code']}
      dataMap={{ 
          'Bank Name': 'name', 
          'Short Code': 'code', 
          'SWIFT / BIC Code': 'swift'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Banks' })}
      createButtonText="Add New Bank"
    />
  );
};

export default Banks;
