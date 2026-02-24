import React from 'react';
import AuditInformation from './AuditInformation';

// ── Status pill ───────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const isPosted = status?.toLowerCase() === 'posted';
  const isFailed = status?.toLowerCase() === 'failed';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        backgroundColor: isPosted ? '#dcfce7' : isFailed ? '#fee2e2' : '#fef9c3',
        color: isPosted ? '#15803d' : isFailed ? '#dc2626' : '#854d0e',
      }}
    >
      {status || '-'}
    </span>
  );
};

// ── Shared InfoItem ───────────────────────────────────────────────────────────

const InfoItem = ({ label, children, mono, highlight }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
    <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
    </span>
    <span
      style={{
        fontSize: '13px',
        fontWeight: highlight ? 700 : 500,
        color: highlight ? '#3b82f6' : '#111827',
        fontFamily: mono ? 'monospace' : 'inherit',
        cursor: highlight ? 'pointer' : 'default',
        textDecoration: highlight ? 'underline' : 'none',
      }}
    >
      {children ?? '-'}
    </span>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const PostingCenterItemPage = ({ posting }) => {
  if (!posting) return null;

  const groupId   = posting.groupId  || '202601_LTL_USD_SCBL';
  const bank      = posting.bank     || 'Standard Chartered';
  const accounts  = posting.accounts || 1;
  const total     = posting.total    || '1,250,000.00';
  const status    = posting.status   || 'Posted';
  const sapDoc    = posting.sapDoc   || '1200009253';
  const approved  = posting.approved || '2026-02-05 / Amila Dadigama';

  // Derive from groupId e.g. "202601_LTL_USD_SCBL"
  const parts       = groupId.split('_');
  const product     = parts[1] || 'LTL';
  const currency    = parts[2] || 'USD';

  const isPosted = status?.toLowerCase() === 'posted';
  const isFailed = status?.toLowerCase() === 'failed';

  // Split approved date & approver
  const [approvedDate, approvedBy] = approved.includes(' / ')
    ? approved.split(' / ')
    : [approved, '-'];

  // Mock account details rows
  const accountRows = [
    {
      accountNo: '007208162',
      company: 'Lion Brewery Sri Lanka',
      bank: bank,
      currency: currency,
      outstandingAmount: '1,250,000.00',
      provision: '6,362.32',
    },
  ];

  const totalProvision    = '6,362.32';
  const totalOutstanding  = '1,250,000.00';

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
        {/* Title row */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
            Approved Accrual Details
          </h1>
          <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
            Account-level breakdown for 1100_{groupId}
          </div>
        </div>

        {/* ── Widget Cards ── */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Total Value</h3></div>
            <div className="widget-value-row">
              <div className="widget-value" style={{ fontFamily: 'monospace' }}>{total}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Total Provision</h3></div>
            <div className="widget-value-row">
              <div className="widget-value" style={{ fontFamily: 'monospace' }}>{totalProvision}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Account Count</h3></div>
            <div className="widget-value-row">
              <div className="widget-value">{accounts}</div>
            </div>
          </div>
          <div className="widget-card" style={{ flex: 1 }}>
            <div className="widget-header"><h3 className="widget-title" style={{ margin: 0 }}>Status</h3></div>
            <div className="widget-value-row" style={{ marginTop: '8px' }}>
              <StatusPill status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Section ── */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 16px 0' }}>
          Summary
        </h2>

        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 24px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <InfoItem label="Group ID" mono>{groupId}</InfoItem>
          <InfoItem label="Product">{product}</InfoItem>
          <InfoItem label="Status"><StatusPill status={status} /></InfoItem>
          <InfoItem label="Total Value" mono>{total}</InfoItem>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 24px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <InfoItem label="Total Provision" mono>{totalProvision}</InfoItem>
          <InfoItem label="Account Count">{accounts}</InfoItem>
          <InfoItem label="Approved By">{approvedBy}</InfoItem>
          <InfoItem label="Approved Date" mono>{approvedDate}</InfoItem>
        </div>

        {/* Row 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 24px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
          <InfoItem label="Posted At" mono>
            {isPosted ? '2026-02-05 08:36' : '-'}
          </InfoItem>
          <InfoItem label="SAP Document No" mono highlight={isPosted && !isFailed}>
            {sapDoc}
          </InfoItem>
          <InfoItem label="Attempt Number">5</InfoItem>
        </div>

        {/* SAP Success / Failure Banner */}
        {isPosted && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
            </svg>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>
                Successfully Posted to SAP
              </div>
              <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
                SAP Document Number:{' '}
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
                  {sapDoc}
                </span>
              </div>
            </div>
          </div>
        )}

        {isFailed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>
                Posting Failed
              </div>
              <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '2px' }}>
                {sapDoc}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Account Details Table ── */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
            Account Details
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px', marginBottom: 0 }}>
            Account-level breakdown for this posting group
          </p>
        </div>

        <div
          className="table-wrapper"
          style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}
        >
          <table className="data-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>ACCOUNT NUMBER</th>
                <th style={{ whiteSpace: 'nowrap' }}>COMPANY</th>
                <th style={{ whiteSpace: 'nowrap' }}>BANK</th>
                <th style={{ whiteSpace: 'nowrap' }}>CURRENCY</th>
                <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>OUTSTANDING AMOUNT</th>
                <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>PROVISION</th>
              </tr>
            </thead>
            <tbody>
              {accountRows.map((row, idx) => (
                <tr key={idx} className="hover-row">
                  <td style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {row.accountNo}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{row.company}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{row.bank}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{row.currency}</td>
                  <td style={{ textAlign: 'right', paddingRight: '20px', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {row.outstandingAmount}
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '20px', fontFamily: 'monospace', fontSize: '13px', color: '#16a34a', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {row.provision}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td colSpan={4} style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', paddingRight: '8px', borderTop: '2px solid var(--color-border)', color: '#374151' }}>
                  Total:
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, borderTop: '2px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                  {totalOutstanding}
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: '#16a34a', borderTop: '2px solid var(--color-border)', whiteSpace: 'nowrap' }}>
                  {totalProvision}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Audit Information ── */}
      <AuditInformation />

      <div style={{ height: '48px' }} />
    </div>
  );
};

export default PostingCenterItemPage;
