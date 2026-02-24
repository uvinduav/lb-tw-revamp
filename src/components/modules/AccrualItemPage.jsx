import React from 'react';
import { Eye } from 'lucide-react';
import AuditInformation from './AuditInformation';

// ── Shared InfoRow ────────────────────────────────────────────────────────────

const InfoRow = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>{label}</div>
    <div style={{ fontSize: '13px', color: '#111827', fontWeight: 400, lineHeight: '1.4' }}>
      {children ?? '-'}
    </div>
  </div>
);

// ── Status pill ───────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const isPending = status?.toLowerCase().includes('pending');
  const isApproved = status?.toLowerCase().includes('approved');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '1px 9px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        backgroundColor: isApproved ? '#dcfce7' : isPending ? '#fef9c3' : '#f3f4f6',
        color: isApproved ? '#15803d' : isPending ? '#854d0e' : '#374151',
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: isApproved ? '#22c55e' : isPending ? '#eab308' : '#9ca3af',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {status || '-'}
    </span>
  );
};

// ── Section card ─────────────────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      overflow: 'hidden',
      padding: '24px'
    }}
  >
    <div style={{ marginBottom: '20px' }}>
      <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
        {title}
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
  </div>
);

// ── Widget card ───────────────────────────────────────────────────────────────

const WidgetCard = ({ title, value }) => (
  <div className="widget-card" style={{ flex: 1 }}>
    <div className="widget-header">
      <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
    </div>
    <div className="widget-value-row">
      <div className="widget-value">{value}</div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const AccrualItemPage = ({ accrual }) => {
  if (!accrual) return null;

  const groupId = accrual.groupId || '202602_FD_LKR_DFCC';
  const company = accrual.company || 'Lion Brewery Sri Lanka';
  const bank = accrual.bank || 'DFCC Bank (DFCC)';
  const accounts = accrual.accounts || 3;
  const provision = accrual.provision || '119,928,767.12';

  // Derive display values from groupId  e.g. "202602_FD_LKR_DFCC"
  const parts = groupId.split('_');
  const period = parts[0] || '202602';
  const accountType = parts[1] || 'FD';
  const currency = parts[2] || 'LKR';
  const bankCode = parts.slice(3).join('_') || 'DFCC';
  const periodLabel = period.length === 6
    ? `${period.slice(0, 4)}-${period.slice(4)}`
    : period;

  const groupStatus = 'Pending Approval';

  const accountRows = [
    { accountNo: '103003014928', bank: 'DFCC Bank', branch: 'Head Office Branch', company: 'Lion Brewery Sri Lanka', provision: '83,172,602.74', startDate: '2025-03-12', endDate: '2026-03-12', duration: '1 year', status: 'Pending' },
    { accountNo: '103003014930', bank: 'DFCC Bank', branch: 'Head Office Branch', company: 'Lion Brewery Sri Lanka', provision: '36,756,164.38', startDate: '2025-09-25', endDate: '2026-03-25', duration: '6 months', status: 'Pending' },
    { accountNo: '103003600584', bank: 'DFCC Bank', branch: 'Head Office Branch', company: 'Lion Brewery Sri Lanka', provision: '5,821,917.81', startDate: '2026-01-09', endDate: '2026-04-09', duration: '3 months', status: 'Pending' },
  ];

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
          margin: '-24px -24px 16px -24px',
          padding: '20px 24px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
              Group Details
            </h1>
            <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#9ca3af' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              1100_{groupId}
            </div>
          </div>
        </div>

        {/* Summary Widget Cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <WidgetCard title="Number of Accounts" value={String(accounts)} />
          <WidgetCard title="Total Provision" value={`${provision} ${currency}`} />
          <WidgetCard title="Accounts Status" value={groupStatus} />
        </div>

        {/* Account Detail Cards (Moved into grey area) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Section title="Group Information">
            <InfoRow label="Group ID">{groupId}</InfoRow>
            <InfoRow label="Company">{company}</InfoRow>
            <InfoRow label="Bank">{bank}</InfoRow>
            <InfoRow label="Period">{periodLabel}</InfoRow>
            <InfoRow label="Account Type">{accountType}</InfoRow>
            <InfoRow label="Currency" last>{currency}</InfoRow>
          </Section>

          <Section title="Provision Summary">
            <InfoRow label="Total Provision">{provision} {currency}</InfoRow>
            <InfoRow label="No. of Accounts">{accounts}</InfoRow>
            <InfoRow label="Group Status" last>
              <StatusPill status={groupStatus} />
            </InfoRow>
          </Section>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
              Accounts in this Group
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px', marginBottom: 0 }}>
              Individual account provisions for this accrual group
            </p>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Total Provision: <span style={{ color: 'var(--color-text-main)' }}>{provision} {currency}</span>
          </span>
        </div>

        <div
          className="table-wrapper"
          style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}
        >
          <table className="data-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>ACCOUNT NUMBER</th>
                <th style={{ whiteSpace: 'nowrap' }}>BANK</th>
                <th style={{ whiteSpace: 'nowrap' }}>BRANCH</th>
                <th style={{ whiteSpace: 'nowrap' }}>COMPANY</th>
                <th style={{ whiteSpace: 'nowrap' }}>START DATE</th>
                <th style={{ whiteSpace: 'nowrap' }}>END DATE</th>
                <th style={{ whiteSpace: 'nowrap' }}>DURATION</th>
                <th style={{ whiteSpace: 'nowrap' }}>STATUS</th>
                <th className="actions-col"></th>
              </tr>
            </thead>
            <tbody>
              {accountRows.map((row, idx) => (
                <tr key={idx} className="hover-row">
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                    {row.accountNo}
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{row.bank}</td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{row.branch}</td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{row.company}</td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                    {row.startDate}
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                    {row.endDate}
                  </td>
                  <td style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{row.duration}</td>
                  <td>
                    <StatusPill status={row.status} />
                  </td>
                  <td className="actions-col">
                    <div className="row-actions">
                      <button
                        className="action-btn"
                        title="View"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Audit Information ── */}
      <AuditInformation
        createdAt="February 12, 2026 9:30 AM"
        updatedAt="February 12, 2026 9:40 AM"
        createdBy="dinuka@oshanravlyon.onmicrosoft.com (3657aa5c-0cb7-472d-a9b3-f1a5e86e6477)"
        updatedBy="amilad@oshanravlyon.onmicrosoft.com (3906f309-55a4-498c-a696-390c8262193f)"
      />

      <div style={{ height: '48px' }} />
    </div>
  );
};

export default AccrualItemPage;
