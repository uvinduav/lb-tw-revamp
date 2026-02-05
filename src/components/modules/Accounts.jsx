import React, { useState, useEffect } from 'react';
import ModulePage from '../ModulePage';
import csvFile from '../../assets/accounts-test-sheet.csv?raw';

const Accounts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const parseCSV = (csvText) => {
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const rows = lines.slice(1).filter(line => line.trim() !== '').map((line, index) => {
        const values = line.split(',');
        const entry = {};
        headers.forEach((header, i) => {
          entry[header] = values[i]?.trim();
        });
        
        return {
          id: index,
          accountNumber: entry['Account Number'],
          bank: entry['Bank'],
          branch: entry['Branch'],
          type: entry['Product Type'],
          currency: entry['Currency'],
          amount: entry['Value'] || '-',
          rate: entry['Current Rate (%)'] || '-',
          interestType: 'Fixed',
          startDate: entry['Start Date'],
          duration: entry['Duration (Days)'] || '-',
          status: entry['Status']
        };
      });
      return rows;
    };

    if (csvFile) {
      const parsedData = parseCSV(csvFile);
      setData(parsedData);
    }
  }, []);

  const columns = ['Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Amount', 'Rate', 'Int. Type', 'Start Date', 'Duration', 'Status'];
  const filterFields = ['Account No.', 'Bank', 'Branch', 'Type', 'Currency', 'Status'];
  const dataMap = {
      'Account No.': 'accountNumber',
      'Bank': 'bank',
      'Branch': 'branch',
      'Type': 'type',
      'Currency': 'currency',
      'Amount': 'amount',
      'Rate': 'rate',
      'Int. Type': 'interestType',
      'Start Date': 'startDate',
      'Duration': 'duration',
      'Status': 'status'
  };

  return (
    <ModulePage 
      title="All Accounts"
      columns={columns}
      data={data}
      filterFields={filterFields}
      dataMap={dataMap}
    />
  );
};

export default Accounts;
