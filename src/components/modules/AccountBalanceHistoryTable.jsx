import React from 'react';

const buildStatementRow = (account) => {
  const cleanNum = (val) => {
    if (typeof val === 'number') return val;
    return parseFloat((val || '').toString().replace(/[^0-9.]/g, '')) || 0;
  };

  // Handle both property names (accountNumber vs accountNo, amount vs balance)
  const accountNumber = account.accountNumber || account.accountNo || '';
  const amount = cleanNum(account.amount || account.balance);
  const totalOutstanding = cleanNum(account.totalOutstanding);
  const estimatedTotal = cleanNum(account.estimatedTotal);
  const rate = cleanNum(account.rate || 0);
  const startDate = account.startDate || '-';

  const outstanding = totalOutstanding || amount;
  const dailyInterest = rate > 0 ? (outstanding * rate) / 100 / 365 : 0;

  return [{
    date: startDate,
    stmt: `STM-${accountNumber.replace(/\s+/g, '').toUpperCase()}`,
    opening: amount.toFixed(2),
    closing: (estimatedTotal || totalOutstanding || amount).toFixed(2),
    outstanding: outstanding.toFixed(2),
    rate,
    dailyInterest: dailyInterest.toFixed(2),
  }];
};

const AccountBalanceHistoryTable = ({ account, currency = 'LKR' }) => {
  if (!account) return null;

  const balanceHistory = buildStatementRow(account);

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
          Account Balance History
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px', marginBottom: 0 }}>
          Monthly balance snapshots for this account
        </p>
      </div>

      <div
        className="table-wrapper"
        style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}
      >
        <table className="data-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr>
              <th style={{ whiteSpace: 'nowrap' }}>DATE &amp; TIME</th>
              <th style={{ whiteSpace: 'nowrap' }}>STATEMENT NUMBER</th>
              <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>OPENING BALANCE</th>
              <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>CLOSING BALANCE</th>
              <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>OUTSTANDING BALANCE</th>
              <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>INTEREST RATE</th>
              <th style={{ whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '20px' }}>DAILY INTEREST</th>
            </tr>
          </thead>
          <tbody>
            {balanceHistory.map((row, idx) => (
              <tr key={idx} className="hover-row">
                {/* Date & Time */}
                <td style={{ whiteSpace: 'nowrap', color: 'var(--color-text-main)' }}>
                  {row.date}
                </td>

                {/* Statement Number */}
                <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                  {row.stmt}
                </td>

                {/* Opening Balance */}
                <td style={{ textAlign: 'right', paddingRight: '20px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                    <span style={{ color: '#9ca3af' }}>{currency} </span>
                    {parseFloat(row.opening).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Closing Balance */}
                <td style={{ textAlign: 'right', paddingRight: '20px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                    <span style={{ color: '#9ca3af' }}>{currency} </span>
                    {parseFloat(row.closing).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Outstanding Balance */}
                <td style={{ textAlign: 'right', paddingRight: '20px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                    <span style={{ color: '#9ca3af' }}>{currency} </span>
                    {parseFloat(row.outstanding).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Interest Rate */}
                <td style={{ textAlign: 'right', paddingRight: '20px', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '13px' }}>
                  {row.rate.toFixed(2)}%
                </td>

                {/* Daily Interest */}
                <td style={{ textAlign: 'right', paddingRight: '20px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                    <span style={{ color: '#9ca3af' }}>{currency} </span>
                    {parseFloat(row.dailyInterest).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountBalanceHistoryTable;
