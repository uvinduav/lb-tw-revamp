import React from 'react';
import ModulePage from '../ModulePage';

const Users = ({ onNavigate }) => {
  const usersData = [
    {
      id: 1,
      name: 'Chanodya Liyanage',
      email: 'chanodya.l@avlyon.com',
      groups: ['System Admin [System_admin]', 'Approver [Approver]', 'inpersonator'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Ashan Perera',
      email: 'ashan.p@avlyon.com',
      groups: ['System Admin [System_admin]'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'System Administrator',
      email: 'SystemAdmin@oshanravlyon.onmicrosoft.com',
      groups: ['System Admin [System_admin]'],
      status: 'Active'
    },
    {
      id: 4,
      name: 'Master Data Admin',
      email: 'MasterData@oshanravlyon.onmicrosoft.com',
      groups: ['Master Data [Master_data]'],
      status: 'Active'
    },
    {
      id: 5,
      name: 'Lead Approver',
      email: 'Approver@oshanravlyon.onmicrosoft.com',
      groups: ['Approver [Approver]'],
      status: 'Active'
    },
    {
      id: 6,
      name: 'Primary Admin',
      email: 'admin@oshanravlyon.onmicrosoft.com',
      groups: ['Admin [Admin]'],
      status: 'Active'
    },
    {
      id: 7,
      name: 'Uvindu Perera',
      email: 'uvindu.p@avlyon.com',
      groups: ['System Admin [System_admin]'],
      status: 'Active'
    },
    {
      id: 8,
      name: 'Amila Dharmasena',
      email: 'amilad@oshanravlyon.onmicrosoft.com',
      groups: ['Approver [Approver]'],
      status: 'Active'
    },
    {
      id: 9,
      name: 'Amila Dadigama',
      email: 'amilad@lionbeer.com',
      groups: ['Azure-SAPUsers', 'All Users', 'TreasuryWatch_Checker1 [Checker]', 'Statutory Communications', 'LBCL Finance'],
      status: 'Active'
    },
    {
      id: 10,
      name: 'Application Alerts',
      email: 'app-alerts@lionbeer.com',
      groups: ['All Users', 'License - Microsoft 365 Business Basic', 'LBCL MFA Disable Users', 'LBCL Service Accounts'],
      status: 'Active'
    }
  ];

  const renderCell = (row, col, value) => {
    if (col === 'Groups' && Array.isArray(value)) {
      return (
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          flexWrap: 'nowrap', 
          overflow: 'hidden',
          alignItems: 'center'
        }}>
          {value.map((group, idx) => {
            let bgColor = '#f3f4f6'; // Gray 100
            let textColor = '#4b5563'; // Gray 600

            if (group.includes('System Admin') || group.includes('Master Data')) {
              bgColor = '#f5f3ff'; // Violet 50
              textColor = '#7c3aed'; // Violet 600
            } else if (group.includes('Approver')) {
              bgColor = '#eff6ff'; // Blue 50
              textColor = '#2563eb'; // Blue 600
            } else if (group.includes('Admin')) {
              bgColor = '#f0fdf4'; // Green 50
              textColor = '#16a34a'; // Green 600
            }

            return (
              <span 
                key={idx}
                style={{
                  padding: '1px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: bgColor,
                  color: textColor,
                  whiteSpace: 'nowrap',
                  border: `1px solid ${bgColor}` // Subtle border
                }}
              >
                {group}
              </span>
            );
          })}
        </div>
      );
    }
    
    // Bold the name 
    if (col === 'Name') {
      return <span style={{ fontWeight: 600 }}>{value}</span>;
    }

    if (col === 'Status') {
      const getStatusClass = (status) => {
        const s = status?.toLowerCase();
        if (s === 'active') return 'status-active';
        if (s === 'inactive') return 'status-failed';
        return 'status-renewed';
      };
      return (
        <span className={`status-pill ${getStatusClass(value)}`}>
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <ModulePage 
      title="Users"
      columns={['Name', 'Email', 'Groups', 'Status']}
      data={usersData}
      filterFields={['Name', 'Email', 'Status']}
      dataMap={{ 
          'Name': 'name', 
          'Email': 'email',
          'Groups': 'groups',
          'Status': 'status'
      }}
      renderCell={renderCell}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Users' })}
      createButtonText="Add New User"
    />
  );
};

export default Users;
