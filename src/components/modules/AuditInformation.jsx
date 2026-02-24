import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AuditRow = ({ label, value, isLast }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
    fontSize: '12px'
  }}>
    <span style={{ color: '#9ca3af', fontWeight: 400 }}>{label}</span>
    <span style={{ color: 'var(--color-text-main)', textAlign: 'right', fontWeight: 400 }}>{value}</span>
  </div>
);

const AuditInformation = ({
  createdAt = "February 12, 2026 9:30 AM",
  updatedAt = "February 12, 2026 9:40 AM",
  createdBy = "dinuka@oshanravlyon.onmicrosoft.com (3657aa5c-0cb7-472d-a9b3-f1a5e86e6477)",
  updatedBy = "amilad@oshanravlyon.onmicrosoft.com (3906f309-55a4-498c-a696-390c8262193f)"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to format email/id combo specifically if needed, or just handle strings
  const formatValue = (val) => {
    if (typeof val !== 'string') return val;
    if (val.includes('(') && val.includes(')')) {
      const [email, id] = val.split(' (');
      return (
        <span>
          {email} <span style={{ color: '#9ca3af' }}>({id}</span>
        </span>
      );
    }
    return val;
  };

  return (
    <div style={{
      marginTop: '40px',
      backgroundColor: 'var(--color-bg-subtle)',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 20px'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 400, color: '#9ca3af' }}>
          Audit Information
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isOpen && (
            <span style={{ fontSize: '11px', fontStyle: 'italic', color: '#9ca3af' }}>
              expand to view
            </span>
          )}
          {isOpen ? <Minus size={14} color="#9ca3af" /> : <Plus size={14} color="#9ca3af" />}
        </div>
      </button>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', marginTop: '4px' }}>
          <AuditRow
            label="Created At"
            value={createdAt}
          />
          <AuditRow
            label="Last Updated"
            value={updatedAt}
          />
          <AuditRow
            label="Created By"
            value={formatValue(createdBy)}
          />
          <AuditRow
            label="Updated By"
            value={formatValue(updatedBy)}
            isLast
          />
        </div>
      )}
    </div>
  );
};

export default AuditInformation;
