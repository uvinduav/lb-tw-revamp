import React from 'react';
import ModulePage from '../ModulePage';

const PurposeTags = () => {
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
    />
  );
};

export default PurposeTags;
