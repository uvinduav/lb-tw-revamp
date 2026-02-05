import React from 'react';
import ModulePage from '../ModulePage';

const Users = () => {
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
    />
  );
};

export default Users;
