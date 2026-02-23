import React from 'react';
import ModulePage from '../ModulePage';

const Users = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Users"
      columns={['Username', 'Full Name', 'Email', 'Role', 'Status']}
      data={[]}
      filterFields={['Username', 'Email', 'Role', 'Status']}
      dataMap={{ 
          'Username': 'username', 
          'Full Name': 'fullName', 
          'Email': 'email',
          'Role': 'role',
          'Status': 'status'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Users' })}
      createButtonText="Add New User"
    />
  );
};

export default Users;
