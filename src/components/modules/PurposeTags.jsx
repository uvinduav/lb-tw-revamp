import React from 'react';
import ModulePage from '../ModulePage';

const PurposeTags = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Purpose Tags"
      columns={['Tag Name', 'Code', 'Category', 'Description', 'Status']}
      data={[]}
      filterFields={['Tag Name', 'Category', 'Status']}
      dataMap={{
        'Tag Name': 'name',
        'Code': 'code',
        'Category': 'category',
        'Description': 'description',
        'Status': 'status'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Purpose Tags' })}
      createButtonText="Add New Purpose Tag"
      onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Purpose Tags' })}
    />
  );
};

export default PurposeTags;
