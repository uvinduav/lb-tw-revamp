import React from 'react';
import ModulePage from '../ModulePage';

const UserGroups = () => {
  return (
    <ModulePage 
      title="User Groups"
      columns={['Group Name', 'Description', 'Members Count', 'Permissions', 'Status']}
      data={[]}
      filterFields={['Group Name', 'Status']}
      dataMap={{ 
          'Group Name': 'name', 
          'Description': 'description', 
          'Members Count': 'membersCount',
          'Permissions': 'permissions',
          'Status': 'status'
      }}
    />
  );
};

export default UserGroups;
