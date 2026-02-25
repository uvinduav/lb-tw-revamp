import React from 'react';

const InterestCalculationTable = () => {
  const data = [
    {
      date: 'February 18, 2026',
      datePill: 'Start',
      datePillColor: '#eff6ff',
      datePillTextColor: '#3b82f6',
      type: 'Interest',
      principle: '1,000,000.00',
      rate: '4.25%',
      interestDays: '-',
      interest: '-',
      provisionDays: '-',
      provision: '-',
    },
    {
      date: 'February 28, 2026',
      datePill: 'Current',
      datePillColor: '#fef9c3',
      datePillTextColor: '#854d0e',
      type: 'Interest',
      principle: '1,000,000.00',
      rate: '4.25%',
      interestDays: '0',
      interest: '0.00',
      provisionDays: '10',
      provision: '1,164.38',
    },
    {
      date: 'March 18, 2026',
      datePill: 'Maturity',
      datePillColor: '#dcfce7',
      datePillTextColor: '#15803d',
      type: 'Interest',
      principle: '1,000,000.00',
      rate: '4.25%',
      interestDays: '28',
      interest: '0.00',
      provisionDays: '0',
      provision: '0.00',
      isMaturity: true,
    }
  ];

  const pillStyle = (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    backgroundColor: bg,
    color: color,
    marginLeft: '8px',
    lineHeight: '1.2'
  });

  const tdStyle = (isRight = false, isMaturity = false, isSpecial = false) => ({
    padding: '4px 16px',
    height: '32px',
    fontSize: '13px',
    textAlign: isRight ? 'right' : 'left',
    color: isSpecial ? (isMaturity ? '#22c55e' : 'var(--color-text-main)') : (isMaturity ? 'var(--color-text-main)' : 'inherit'),
    fontWeight: isMaturity && isSpecial ? 600 : 400,
    borderBottom: '1px solid var(--color-border)',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={{ marginTop: '32px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '16px' }}>
        Interest Calculation & Loan Repayments
      </h3>
      
      <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
        <table className="data-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '4px 16px', height: '32px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '4px 16px', height: '32px' }}>Type</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Principle</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Interest Rate</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Interest Days</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Interest</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Provision Days</th>
              <th style={{ textAlign: 'right', padding: '4px 16px', height: '32px' }}>Provision</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover-row"
                style={{ 
                  backgroundColor: row.isMaturity ? '#f0fdf4' : 'white',
                }}
              >
                <td style={{ ...tdStyle(false, row.isMaturity), color: 'var(--color-text-main)', fontWeight: row.isMaturity ? 600 : 400 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {row.date}
                    <span style={pillStyle(row.datePillColor, row.datePillTextColor)}>{row.datePill}</span>
                  </div>
                </td>
                <td style={{ ...tdStyle(false, row.isMaturity), color: '#6b7280' }}>
                  {row.type}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity), color: 'var(--color-text-main)', fontFamily: 'monospace', fontWeight: 400 }}>
                  {row.principle !== '-' ? `$${row.principle}` : '-'}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity), color: 'var(--color-text-main)' }}>
                  {row.rate}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity), color: 'var(--color-text-main)' }}>
                  {row.interestDays}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity, true), fontFamily: 'monospace' }}>
                  {row.interest !== '-' ? `$${row.interest}` : '-'}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity), color: 'var(--color-text-main)' }}>
                  {row.provisionDays}
                </td>
                <td style={{ ...tdStyle(true, row.isMaturity, true), fontFamily: 'monospace' }}>
                  {row.provision !== '-' ? `$${row.provision}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterestCalculationTable;
