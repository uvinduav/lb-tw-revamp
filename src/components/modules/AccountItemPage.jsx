import React from 'react';
import { Pencil, ArrowLeftRight } from 'lucide-react';
import AccountBalanceHistoryTable from './AccountBalanceHistoryTable';
import InterestCalculationTable from './InterestCalculationTable';
import AuditInformation from './AuditInformation';

// ── Pill helpers ──────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const isActive = status?.toLowerCase() === 'active';
  const isRenewed = status?.toLowerCase() === 'renewed';
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
        backgroundColor: isActive ? '#dcfce7' : isRenewed ? '#eff6ff' : '#fef9c3',
        color: isActive ? '#15803d' : isRenewed ? '#1d4ed8' : '#854d0e',
      }}
    >
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: isActive ? '#22c55e' : isRenewed ? '#3b82f6' : '#eab308',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {status || '-'}
    </span>
  );
};


// ── Compact label/value row ───────────────────────────────────────────────────

const InfoRow = ({ label, children, mono, last }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      gap: '8px',
      alignItems: 'center',
      minHeight: '36px',
      borderBottom: last ? 'none' : '1px solid var(--color-border)',
    }}
  >
    <span
      style={{
        fontSize: '13px',
        color: '#6b7280',
        fontWeight: 400,
        lineHeight: '1.4',
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: '13px',
        color: '#111827',
        fontWeight: 400,
        lineHeight: '1.4',
        fontFamily: mono ? 'monospace' : 'inherit',
        wordBreak: 'break-all',
      }}
    >
      {children ?? '-'}
    </span>
  </div>
);

// ── Section block ─────────────────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <div style={{ padding: '14px 18px 10px' }}>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ padding: '0 18px' }}>{children}</div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

const AccountItemPage = ({ account }) => {
  if (!account) return null;

  const currency = account.currency || 'LKR';

  const fmt = (val) => {
    if (!val || val === '-') return '-';
    const cleanNum = (v) => {
      if (typeof v === 'number') return v;
      return parseFloat(v.replace(/[^0-9.]/g, '')) || 0;
    };
    const num = cleanNum(val);
    if (isNaN(num)) return val;
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const endDate = account.endDate && account.endDate !== 'N/A' ? account.endDate : '-';

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
      <style>{`
        .account-sections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 768px) {
          .account-sections-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── Page Header + Cards (grey bg) ── */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-subtle)',
          margin: '-24px -24px 28px -24px',
          padding: '20px 24px 24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
              Account Details
            </h1>
            <div style={{ marginTop: '3px', fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
              {account.accountNumber}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <Pencil size={14} />
              Edit Account
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <ArrowLeftRight size={14} />
              Manage Account Balance
            </button>
          </div>
        </div>

          {/* Account Information */}
        {/* Cards grid */}
        <div className="account-sections-grid">
          <Section title="Account Information">
            <InfoRow label="Account Number" mono>
              {account.accountNumber || '-'}
            </InfoRow>
            <InfoRow label="Product Type">{account.type || '-'}</InfoRow>
            <InfoRow label="Currency">
              {`${currency} - ${
                currency === 'LKR' ? 'Sri Lankan Rupee'
                : currency === 'USD' ? 'US Dollar'
                : currency === 'EUR' ? 'Euro'
                : currency === 'GBP' ? 'British Pound'
                : currency
              }`}
            </InfoRow>
            <InfoRow label="Value" mono>
              {account.amount && account.amount !== '-' ? `${currency} ${fmt(account.amount)}` : '-'}
            </InfoRow>
            <InfoRow label="Start Date">{account.startDate || '-'}</InfoRow>
            <InfoRow label="End Date" last>{endDate}</InfoRow>
          </Section>

          {/* Interest Details */}
          <Section title="Interest Details">
            <InfoRow label="Current Rate">
              {account.rate && account.rate !== '-' ? `${account.rate}%` : '-'}
            </InfoRow>
            <InfoRow label="Repayment Frequency">Weekly</InfoRow>
            <InfoRow label="Interest Type">{account.interestType || 'Fixed Interest'}</InfoRow>
            <InfoRow label="Charge Date">12th day</InfoRow>
            <InfoRow label="Status" last>
              <StatusPill status={account.status} />
            </InfoRow>
          </Section>

          {/* Approval Details */}
          <Section title="Approval Details">
            <InfoRow label="Approval Requested By" mono>
              <span style={{ fontSize: '12px', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                dinuka@oshanravlyon.onmicrosoft.com
              </span>
            </InfoRow>
            <InfoRow label="Approval Processed By" mono>
              <span style={{ fontSize: '12px', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                amilad@oshanravlyon.onmicrosoft.com
              </span>
            </InfoRow>
            <InfoRow label="Supporting Document" last>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>No document uploaded</span>
            </InfoRow>
          </Section>

          {/* Bank Information */}
          <Section title="Bank Information">
            <InfoRow label="Bank Name">{account.bank || '-'}</InfoRow>
            <InfoRow label="Bank Code" mono>{account.bank?.substring(0,3).toUpperCase() || '-'}</InfoRow>
            <InfoRow label="SWIFT Code" mono last>-</InfoRow>
          </Section>

          {/* Branch Information */}
          <Section title="Branch Information">
            <InfoRow label="Branch Name">{account.branch || '-'}</InfoRow>
            <InfoRow label="Branch Code" mono>-</InfoRow>
            <InfoRow label="City" last>Colombo</InfoRow>
          </Section>

          {/* Company Information */}
          <Section title="Company Information">
            <InfoRow label="Company Name">{account.company || '-'}</InfoRow>
            <InfoRow label="Company Code" mono last>-</InfoRow>
          </Section>

        </div>{/* end grid */}
      </div>{/* end grey bg */}

      {/* ── Conditional Table Section ── */}
      {account.status?.toLowerCase() === 'renewed' ? (
        <InterestCalculationTable account={account} currency={currency} />
      ) : (
        <AccountBalanceHistoryTable account={account} currency={currency} />
      )}

      {/* ── Audit Information Section ── */}
      <AuditInformation />

      <div style={{ height: '48px' }} />
    </div>
  );
};

export default AccountItemPage;
