import React from 'react';
import ModulePage from '../ModulePage';

const PostingCenter = () => {
  return (
    <ModulePage 
      title="Posting Center"
      columns={['Batch ID', 'Description', 'Post Date', 'Total Entries', 'Status']}
      data={[]}
      filterFields={['Batch ID', 'Description', 'Status']}
      dataMap={{ 
          'Batch ID': 'batchId', 
          'Description': 'description', 
          'Post Date': 'postDate',
          'Total Entries': 'entries',
          'Status': 'status' 
      }}
    />
  );
};

export default PostingCenter;
