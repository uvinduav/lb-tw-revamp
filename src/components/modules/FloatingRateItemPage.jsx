import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AuditInformation from './AuditInformation';

// ── Status pill ───────────────────────────────────────────────────────────────

const StatusPill = ({ label, variant }) => {
  const styles = {
    active: { bg: '#dcfce7', color: '#15803d' },
    current: { bg: '#dbeafe', color: '#1d4ed8' },
    inactive: { bg: '#f3f4f6', color: '#6b7280' },
  };
  const s = styles[variant] || styles.inactive;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        backgroundColor: s.bg,
        color: s.color,
        marginRight: '6px',
      }}
    >
      {label}
    </span>
  );
};

// ── InfoItem ──────────────────────────────────────────────────────────────────

const InfoItem = ({ label, children, highlight }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
    <span style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', fontWeight: 400 }}>
      {label}
    </span>
    <span
      style={{
        fontSize: '13px',
        fontWeight: 400,
        color: highlight ? '#3b82f6' : '#111827',
        fontFamily: highlight ? 'monospace' : 'inherit',
      }}
    >
      {children ?? '-'}
    </span>
  </div>
);

// ── Rate History Table ────────────────────────────────────────────────────────

const RATE_HISTORY = [
  { date: '2026-02-20', rate: '8.9500%', createdAt: '2026-02-21 02:00:05', updatedAt: '2026-02-23 02:00:06', status: 'Active', isCurrent: true },
  { date: '2026-02-13', rate: '8.9500%', createdAt: '2026-02-14 02:00:04', updatedAt: '2026-02-21 02:00:05', status: 'Active', isCurrent: false },
  { date: '2026-02-06', rate: '8.9500%', createdAt: '2026-02-07 02:00:04', updatedAt: '2026-02-14 02:00:04', status: 'Active', isCurrent: false },
  { date: '2026-01-30', rate: '9.0000%', createdAt: '2026-01-31 02:00:03', updatedAt: '2026-02-07 02:00:04', status: 'Active', isCurrent: false },
  { date: '2026-01-23', rate: '9.0000%', createdAt: '2026-01-24 02:00:03', updatedAt: '2026-01-31 02:00:03', status: 'Active', isCurrent: false },
];

// ── Main component ────────────────────────────────────────────────────────────

const FloatingRateItemPage = ({ rate }) => {
  if (!rate) return null;

  const name = rate.name || 'AWPLR CBSL Weekly (System)';
  const baseRate = rate.baseRate || '8.9500%';
  const spread = rate.spread || '0.00%';
  const effectiveDate = rate.effectiveDate || '2026-02-20';
  const status = rate.status || 'Active';

  const displayName = `${name} (${baseRate}) [from ${effectiveDate}]`;
  const isActive = status?.toLowerCase() === 'active';

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
      {/* ── Header Area ── */}
      <div
        style={{
          margin: '0 0 28px 0',
          padding: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
              {name}
            </h1>
            <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {baseRate} effective from {effectiveDate}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline"
              title="Edit"
              style={{ paddingLeft: '20px', paddingRight: '20px', fontFamily: 'var(--font-inter)' }}
            >
              <Pencil size={16} />
              Edit
            </button>
            <button className="btn btn-outline" style={{ color: 'var(--status-failed-text)' }} title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* ── Rate Information (moved into grey area) ── */}
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>
            Rate Information
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 24px' }}>
            <InfoItem label="Benchmark">{name}</InfoItem>
            <InfoItem label="Rate">{baseRate}</InfoItem>
            <InfoItem label="Effective From">{effectiveDate}</InfoItem>
            <InfoItem label="Status">
              <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                <StatusPill label="Active" variant="active" />
                <StatusPill label="Current" variant="current" />
              </div>
            </InfoItem>
            <InfoItem label="Created At">2026-02-21 02:00:05</InfoItem>
            <InfoItem label="Last Updated">2026-02-23 02:00:06</InfoItem>
          </div>
        </div>
      </div>

      {/* ── Audit Information ── */}
      <div style={{ marginTop: 'auto' }}>
        <AuditInformation
          createdAt="2026-02-21 02:00:05"
          updatedAt="2026-02-23 02:00:06"
          createdBy="dinuka@oshanravlyon.onmicrosoft.com (3657aa5c-0cb7-472d-a9b3-f1a5e86e6477)"
          updatedBy="amilad@oshanravlyon.onmicrosoft.com (3906f309-55a4-498c-a696-390c8262193f)"
        />
      </div>
    </div>
  );
};

export default FloatingRateItemPage;
