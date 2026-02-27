import React, { useState } from 'react';
import ModulePage from '../ModulePage';
import HighlightText from '../common/HighlightText';
import csvFile from '../../assets/accounts-test-sheet.csv?raw';

const Accounts = ({ onNavigate }) => {
  const [data] = useState(() => {
    if (!csvFile) return [];

    const parseCSV = (csvText) => {
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      const rows = lines.slice(1).filter(line => line.trim() !== '').map((line, index) => {
        const values = line.split(',');
        const entry = {};
        headers.forEach((header, i) => {
          entry[header] = values[i]?.trim();
        });

        // Mock last updated date for demonstration
        const todayStr = '2026-02-27';
        const lastUpdated = index % 3 === 0 ? todayStr : '2026-02-26';

        return {
          id: index,
          accountNumber: entry['Account Number'],
          bank: entry['Bank'],
          branch: entry['Branch'],
          company: entry['Company'],
          type: entry['Product Type'],
          currency: entry['Currency'],
          amount: entry['Value'],
          rate: entry['Current Rate (%)'] || '-',
          interestType: 'Fixed',
          startDate: entry['Start Date'],
          endDate: entry['End Date'] || '-',
          duration: entry['Duration (Days)'] || '-',
          interestUpToDate: entry['Interest Up To Date'] || '-',
          totalOutstanding: entry['Total Outstanding'] || '-',
          totalInterest: entry['Total Interest'] || '-',
          estimatedTotal: entry['Estimated Total'] || '-',
          status: entry['Status'],
          lastUpdated: lastUpdated
        };
      });
      return rows;
    };

    return parseCSV(csvFile);
  });

  const columns = ['Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Amount', 'Last Updated', 'Rate', 'Int. Type', 'Start Date', 'Duration', 'Status'];
  const filterFields = ['Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Start Date', 'Rate', 'Int. Type', 'Amount', 'Last Updated', 'Status', 'Duration'];
  const dataMap = {
    'Account No.': 'accountNumber',
    'Bank': 'bank',
    'Branch': 'branch',
    'Type': 'type',
    'Currency': 'currency',
    'Amount': 'amount',
    'Last Updated': 'lastUpdated',
    'Rate': 'rate',
    'Int. Type': 'interestType',
    'Start Date': 'startDate',
    'Duration': 'duration',
    'Status': 'status'
  };

  const renderCell = (row, col, value, highlight) => {
    if (col === 'Currency') {
      return (
        <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
          <HighlightText text={value} highlight={highlight} />
        </span>
      );
    }

    if (col === 'Amount') {
      const amount = row.amount;
      const isEmpty = !amount || amount === '' || amount === '-' || amount === 'N/A';

      const formattedAmount = !isEmpty ? parseFloat(String(amount).replace(/,/g, '')).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) : 'N/A';

      return (
        <span style={{ color: isEmpty ? 'var(--color-text-tertiary)' : 'inherit' }}>
          {isEmpty ? (
            'N/A'
          ) : (
            <HighlightText text={formattedAmount} highlight={highlight} />
          )}
        </span>
      );
    }

    if (col === 'Last Updated') {
      const lastUpdated = row.lastUpdated;
      const isToday = lastUpdated === '2026-02-27';
      return (
        <span style={{
          color: isToday ? 'inherit' : '#f97316', // Black (inherit) if today, Orange if older
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: '400' // Normal weight for both
        }}>
          <HighlightText text={lastUpdated} highlight={highlight} />
        </span>
      );
    }

    // Default rendering for other columns
    if (!value || value === 'N/A' || value === 'n/a' || value === '-') {
      return <span style={{ color: 'var(--color-text-tertiary)' }}>N/A</span>;
    }

    return null;
  };

  return (
    <ModulePage
      title="All Accounts"
      columns={columns}
      data={data}
      filterFields={filterFields}
      dataMap={dataMap}
      renderCell={renderCell}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Accounts' })}
      createButtonText="Add New Account"
      onRowClick={(row) => onNavigate && onNavigate('Account Item Details', row)}
    />
  );
};

export default Accounts;
