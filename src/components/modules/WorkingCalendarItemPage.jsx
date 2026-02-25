import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AuditInformation from './AuditInformation';

// ── Status pill ───────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const isApproved = status?.toLowerCase() === 'approved';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: isApproved ? '#dcfce7' : '#fef9c3',
        color: isApproved ? '#15803d' : '#854d0e',
        border: isApproved ? '1px solid #bbf7d0' : '1px solid #fde68a',
      }}
    >
      {status || '-'}
    </span>
  );
};

// ── InfoItem ──────────────────────────────────────────────────────────────────

const InfoItem = ({ label, children, mono }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400 }}>
      {label}
    </span>
    <div
      style={{
        fontSize: '14px',
        fontWeight: 500,
        color: '#111827',
        fontFamily: mono ? 'monospace' : 'inherit',
      }}
    >
      {children ?? '-'}
    </div>
  </div>
);



// ── Main component ────────────────────────────────────────────────────────────

const WorkingCalendarItemPage = ({ entry }) => {
  if (!entry) return null;

  const displayDate = entry.displayDate || 'January 31, 2026';
  const isoDate = entry.date || '2026-01-31';
  const type = entry.type || 'Month End';
  const status = entry.status || 'Approved';

  // Derive period label from ISO date  e.g. "2026-01" → "January 2026"
  const [year, month] = isoDate.split('-');
  const periodLabel = new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'white',
        padding: '24px',
      }}
    >
      {/* ── Page header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
          Last Working Day Details
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#ef4444',
              color: 'white',
            }}
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>

      {/* ── Basic Information card ── */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '20px 24px 24px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>
          Basic Information
        </h2>

        {/* 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' }}>
          <InfoItem label="Company">Lion Brewery Sri Lanka</InfoItem>
          <InfoItem label="Company Code" mono>1100</InfoItem>

          <InfoItem label="Last Working Day">
            <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{displayDate}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{isoDate}</div>
          </InfoItem>
          <InfoItem label="Period">{periodLabel}</InfoItem>

          <InfoItem label="Day Type">{type}</InfoItem>

          <InfoItem label="Status">
            <StatusPill status={status} />
          </InfoItem>
        </div>
      </div>

      {/* ── Audit Information ── */}
      <div style={{ marginTop: 'auto' }}>
        <AuditInformation
          createdAt="2026-02-05 07:07:12"
          updatedAt="2026-02-05 07:07:12"
          createdBy="DinukaL@lionbeer.com (6daa13e0-5af3-400b-a2ae-a1d025e3f70a)"
          updatedBy="DinukaL@lionbeer.com (6daa13e0-5af3-400b-a2ae-a1d025e3f70a)"
        />
      </div>
    </div>
  );
};

export default WorkingCalendarItemPage;
