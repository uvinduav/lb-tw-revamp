import React from 'react';
import emptyBox from '../assets/empty-box.png';

const CreateModulePage = ({ title }) => {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div className="page-title">
            <h1>{title}</h1>
          </div>
        </div>
      </div>

      <div className="table-wrapper" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#888' }}>
          <img
            src={emptyBox}
            alt="Empty State"
            style={{ width: '80px', height: '80px', opacity: 0.4 }}
          />
          <span>Configuration options will appear here</span>
        </div>
      </div>
    </div>
  );
};

export default CreateModulePage;
