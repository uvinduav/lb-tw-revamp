import React from 'react';
import emptyBox from '../../assets/empty-box.png';

const Dashboard = () => {
  return (
    <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#888' }}>
        <img
          src={emptyBox}
          alt="No records"
          style={{ width: '80px', height: '80px', opacity: 0.4 }}
        />
        <span style={{ fontSize: '14px', fontWeight: 500 }}>No records found</span>
      </div>
    </div>
  );
};

export default Dashboard;
