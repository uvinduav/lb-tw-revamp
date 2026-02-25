import React from 'react';
import ModulePage from '../ModulePage';

const UserGroups = ({ onNavigate }) => {
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
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'User Groups' })}
      createButtonText="Add New User Group"
    />
  );
};

export default UserGroups;
