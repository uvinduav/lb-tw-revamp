import React from 'react';
import AuditInformation from './AuditInformation';

// ── Status pill ───────────────────────────────────────────────────────────────

const StatusPill = ({ label, variant }) => {
  const styles = {
    active:  { bg: '#dcfce7', color: '#15803d' },
    current: { bg: '#dbeafe', color: '#1d4ed8' },
    inactive:{ bg: '#f3f4f6', color: '#6b7280' },
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
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400 }}>
      {label}
    </span>
    <span
      style={{
        fontSize: '13px',
        fontWeight: 500,
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
  { date: '2026-02-20', rate: '8.9500%', createdAt: '2026-02-21 02:00:05', updatedAt: '2026-02-23 02:00:06', status: 'Active', isCurrent: true  },
  { date: '2026-02-13', rate: '8.9500%', createdAt: '2026-02-14 02:00:04', updatedAt: '2026-02-21 02:00:05', status: 'Active', isCurrent: false },
  { date: '2026-02-06', rate: '8.9500%', createdAt: '2026-02-07 02:00:04', updatedAt: '2026-02-14 02:00:04', status: 'Active', isCurrent: false },
  { date: '2026-01-30', rate: '9.0000%', createdAt: '2026-01-31 02:00:03', updatedAt: '2026-02-07 02:00:04', status: 'Active', isCurrent: false },
  { date: '2026-01-23', rate: '9.0000%', createdAt: '2026-01-24 02:00:03', updatedAt: '2026-01-31 02:00:03', status: 'Active', isCurrent: false },
];

// ── Main component ────────────────────────────────────────────────────────────

const FloatingRateItemPage = ({ rate }) => {
  if (!rate) return null;

  const name          = rate.name          || 'AWPLR CBSL Weekly (System)';
  const baseRate      = rate.baseRate      || '8.9500%';
  const spread        = rate.spread        || '0.00%';
  const effectiveDate = rate.effectiveDate || '2026-02-20';
  const status        = rate.status        || 'Active';

  const displayName   = `${name} (${baseRate}) [from ${effectiveDate}]`;
  const isActive      = status?.toLowerCase() === 'active';

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
      {/* ── Header (grey bg) ── */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-subtle)',
          margin: '-24px -24px 28px -24px',
          padding: '20px 24px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
            {name}
          </h1>
          <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {baseRate} effective from {effectiveDate}
          </div>
        </div>

        {/* ── 4 Widget Cards ── */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Current Rate</h3></div>
            <div className="widget-value-row">
              <div className="widget-value" style={{ fontFamily: 'monospace', color: '#3b82f6' }}>{baseRate}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Spread</h3></div>
            <div className="widget-value-row">
              <div className="widget-value" style={{ fontFamily: 'monospace' }}>{spread}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Effective From</h3></div>
            <div className="widget-value-row">
              <div className="widget-value" style={{ fontFamily: 'monospace' }}>{effectiveDate}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Status</h3></div>
            <div className="widget-value-row" style={{ marginTop: '8px' }}>
              <StatusPill label={status} variant={isActive ? 'active' : 'inactive'} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main 2-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px', alignItems: 'start' }}>

        {/* Left: Rate Information card */}
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '20px 24px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>
            Rate Information
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <InfoItem label="Benchmark">{name}</InfoItem>
            <InfoItem label="Rate" highlight>{baseRate}</InfoItem>
            <InfoItem label="Effective From">{effectiveDate}</InfoItem>
            <InfoItem label="Status">
              <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                <StatusPill label="Active"  variant="active"  />
                <StatusPill label="Current" variant="current" />
              </div>
            </InfoItem>
            <InfoItem label="Created At">2026-02-21 02:00:05</InfoItem>
            <InfoItem label="Last Updated">2026-02-23 02:00:06</InfoItem>
          </div>
        </div>

        {/* Right: Rate Summary card */}
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '20px 24px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 16px 0' }}>
            Rate Summary
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Display Name:</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827', lineHeight: '1.5' }}>
              {displayName}
            </span>
          </div>
        </div>
      </div>

      {/* ── Rate History Table ── */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
            Rate History
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px', marginBottom: 0 }}>
            Historical rate values for this benchmark
          </p>
        </div>

        <div
          className="table-wrapper"
          style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}
        >
          <table className="data-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>EFFECTIVE DATE</th>
                <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>RATE</th>
                <th style={{ whiteSpace: 'nowrap' }}>CREATED AT</th>
                <th style={{ whiteSpace: 'nowrap' }}>LAST UPDATED</th>
                <th style={{ whiteSpace: 'nowrap' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {RATE_HISTORY.map((row, idx) => (
                <tr key={idx} className="hover-row" style={{ backgroundColor: row.isCurrent ? '#f0f9ff' : 'white' }}>
                  <td style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: row.isCurrent ? 600 : 400, whiteSpace: 'nowrap' }}>
                    {row.date}
                    {row.isCurrent && (
                      <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', padding: '1px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: 700, backgroundColor: '#dbeafe', color: '#1d4ed8' }}>
                        Current
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '20px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 600, color: '#3b82f6', whiteSpace: 'nowrap' }}>
                    {row.rate}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {row.createdAt}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {row.updatedAt}
                  </td>
                  <td>
                    <StatusPill label={row.status} variant="active" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Audit Information ── */}
      <AuditInformation />

      <div style={{ height: '48px' }} />
    </div>
  );
};

export default FloatingRateItemPage;
