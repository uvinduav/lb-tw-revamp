import React from 'react';
import { Pencil, ArrowLeftRight } from 'lucide-react';
import AccountBalanceHistoryTable from './AccountBalanceHistoryTable';
import InterestCalculationTable from './InterestCalculationTable';
import AuditInformation from './AuditInformation';

// ── Pill helpers ──────────────────────────────────────────────────────────────

const Pill = ({ children, color = 'grey' }) => {
  const colors = {
    blue: { bg: '#eff6ff', text: '#2563eb' },
    purple: { bg: '#f5f3ff', text: '#7c3aed' },
    green: { bg: '#f0fdf4', text: '#16a34a' },
    grey: { bg: '#f9fafb', text: '#6b7280' },
  };
  const c = colors[color] || colors.grey;
  return (
    <span style={{
      display: 'inline-flex',
      padding: '2px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      backgroundColor: c.bg,
      color: c.text,
      width: 'fit-content'
    }}>
      {children}
    </span>
  );
};

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

const InfoRow = ({ label, children, mono, boldValue }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px', fontWeight: 400 }}>{label}</div>
    <div
      style={{
        fontSize: '13px',
        color: '#111827',
        fontWeight: boldValue ? 600 : 400,
        lineHeight: '1.4',
        fontFamily: mono ? 'monospace' : 'inherit',
        wordBreak: 'break-all',
      }}
    >
      {children ?? '-'}
    </div>
  </div>
);

// ── Section block ─────────────────────────────────────────────────────────────

const Section = ({ title, children, style }) => (
  <div
    style={{
      backgroundColor: 'white',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      overflow: 'hidden',
      padding: '24px',
      ...style
    }}
  >
    <div style={{ marginBottom: '20px' }}>
      <span
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--color-text-main)',
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
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
        .account-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 24px;
          padding: 0 24px 24px;
        }
        @media (max-width: 1024px) {
          .account-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── Page Header (grey bg) ── */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-subtle)',
          margin: '-24px -24px 0 -24px',
          padding: '24px 24px 20px',
        }}
      >
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
      </div>

      {/* ── Main Layout Body ── */}
      <div style={{ backgroundColor: '#f9fafb', margin: '0 -24px', flex: 1, paddingTop: '32px', paddingBottom: '32px' }}>
        <div className="account-main-grid">
          {/* Left: Large Info Card */}
          <Section title="Account Information" style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
              <div>
                <InfoRow label="Account Number">{account.accountNumber || '-'}</InfoRow>
                <InfoRow label="Value" mono>
                  {account.amount && account.amount !== '-' ? `${currency} ${fmt(account.amount)}` : '-'}
                </InfoRow>
                <InfoRow label="Start Date">{account.startDate || '-'}</InfoRow>
                <InfoRow label="Benchmark">{account.benchmark || 'AWPLR Monthly'}</InfoRow>
                <InfoRow label="Interest Type">{account.interestType || 'Floating Interest'}</InfoRow>
                <InfoRow label="Status">
                  <StatusPill status={account.status} />
                </InfoRow>
              </div>
              <div>
                <InfoRow label="Product Type">{account.type || 'MMSA'}</InfoRow>
                <InfoRow label="Currency">
                  {`${currency} - ${currency === 'LKR' ? 'Sri Lankan Rupee'
                    : currency === 'USD' ? 'US Dollar'
                      : currency === 'EUR' ? 'European Euro'
                        : currency === 'GBP' ? 'British Pound'
                          : currency
                    }`}
                </InfoRow>
                <InfoRow label="Margin" boldValue>2.0000%</InfoRow>
                <InfoRow label="Repayment Frequency">Monthly</InfoRow>
                <InfoRow label="Charge Date">11th day</InfoRow>
                <InfoRow label="Approval Processed By">
                  <span style={{ fontSize: '13px', color: '#111827', wordBreak: 'break-all', fontWeight: 400 }}>
                    chanodya.l@avlyon.com (f5f15366-8a5d-491f-9baa-640716ac209a)
                  </span>
                </InfoRow>
              </div>
            </div>
            <div style={{ marginTop: '8px' }}>
              <InfoRow label="Supporting Document">
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>No document uploaded</span>
              </InfoRow>
            </div>
          </Section>

          {/* Right: Small Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Section title="Bank Information">
              <InfoRow label="Bank Name">{account.bank || '-'}</InfoRow>
              <InfoRow label="Bank Code" mono>{account.bank?.substring(0, 4).toUpperCase() || 'COMB'}</InfoRow>
              <InfoRow label="SWIFT Code" mono>CCEYLKLX</InfoRow>
            </Section>

            <Section title="Branch Information">
              <InfoRow label="Branch Name">{account.branch || 'Head Office Branch'}</InfoRow>
              <InfoRow label="Branch Code" mono>COMB-HO</InfoRow>
              <InfoRow label="City">Colombo</InfoRow>
            </Section>

            <Section title="Company Information">
              <InfoRow label="Company Name">{account.company || 'Luxury Brands'}</InfoRow>
              <InfoRow label="Company Code" mono>LB001</InfoRow>
            </Section>
          </div>
        </div>
      </div>

      {/* ── Conditional Table Section ── */}
      <div style={{ padding: '32px 0' }}>
        {account.status?.toLowerCase() === 'renewed' ? (
          <InterestCalculationTable account={account} currency={currency} />
        ) : (
          <AccountBalanceHistoryTable account={account} currency={currency} />
        )}
      </div>

      {/* ── Audit Information Section ── */}
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

export default AccountItemPage;
