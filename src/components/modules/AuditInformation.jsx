import React from 'react';

const AuditInformation = () => {
  return (
    <div style={{ marginTop: '40px', borderTop: '1px solid var(--color-border)', paddingTop: '24px', paddingBottom: '40px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '16px' }}>
        Audit Information
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(400px, 2fr)', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>Created At</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>February 12, 2026 9:30 AM</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>Last Updated</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>February 12, 2026 9:40 AM</div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>Created By</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)', wordBreak: 'break-all' }}>
              dinuka@oshanravlyon.onmicrosoft.com <span style={{ color: '#6b7280' }}>(3657aa5c-0cb7-472d-a9b3-f1a5e86e6477)</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>Updated By</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-main)', wordBreak: 'break-all' }}>
              amilad@oshanravlyon.onmicrosoft.com <span style={{ color: '#6b7280' }}>(3906f309-55a4-498c-a696-390c8262193f)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditInformation;
