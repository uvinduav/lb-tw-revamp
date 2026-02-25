import React from 'react';
import ModulePage from '../ModulePage';

const InterestRates = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Interest Rates"
      columns={['Rate Name', 'Rate %', 'Type', 'Effective Date', 'Status']}
      data={[]}
      filterFields={['Rate Name', 'Type', 'Status']}
      dataMap={{
        'Rate Name': 'name',
        'Rate %': 'rate',
        'Type': 'type',
        'Effective Date': 'effectiveDate',
        'Status': 'status'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Interest Rates' })}
      createButtonText="Add New Interest Rate"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Interest Rates' })}
    />
  );
};

export default InterestRates;
