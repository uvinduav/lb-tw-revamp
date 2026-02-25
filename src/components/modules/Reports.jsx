import React from 'react';
import ModulePage from '../ModulePage';

const REPORT_DATA = [
  { id: 1, account: '3022000775', product: 'FD', bank: 'Commercial Bank', branch: 'Head Office Branch', value: 'LKR 1,000,000,000.00', provision: 'LKR 15,052,054.79', days: 67, date: '2026-01-02 7:39' },
  { id: 2, account: '3017429444', product: 'FD', bank: 'Commercial Bank', branch: 'Head Office Branch', value: 'LKR 500,000,000.00', provision: 'LKR 5,769,863.01', days: 52, date: '2026-01-02 7:39' },
  { id: 3, account: '3010835938', product: 'FD', bank: 'Commercial Bank', branch: 'Head Office Branch', value: 'LKR 1,000,000,000.00', provision: 'LKR 807,068,493.15', days: 1133, date: '2026-01-02 7:39' },
  { id: 4, account: '100002800017021', product: 'FD', bank: 'Bank of China', branch: 'Head Office Branch', value: 'LKR 284,943,138.48', provision: 'LKR 234,199.84', days: 6, date: '2025-12-02 8:03' },
  { id: 5, account: '3016568441', product: 'FD', bank: 'Commercial Bank', branch: 'Head Office Branch', value: 'USD 1,000,000.00', provision: 'USD 1,630.14', days: 17, date: '2025-12-02 8:04' },
  { id: 6, account: '3921070053', product: 'FD', bank: 'Hatton National Bank', branch: 'Head Office Branch', value: 'USD 1,000,000.00', provision: 'USD 1,424.66', days: 13, date: '2025-12-02 8:03' },
  { id: 7, account: '3921071098', product: 'FD', bank: 'Hatton National Bank', branch: 'Head Office Branch', value: 'USD 510,000.00', provision: 'USD 5,155.89', days: 82, date: '2025-12-02 8:03' },
  { id: 8, account: '3921071418', product: 'FD', bank: 'Hatton National Bank', branch: 'Head Office Branch', value: 'USD 250,000.00', provision: 'USD 92.47', days: 3, date: '2025-12-02 8:03' },
];

const Reports = () => {
  return (
    <ModulePage 
      title="Reports"
      columns={['ACCOUNT NUMBER', 'PRODUCT', 'BANK', 'BRANCH', 'PRINCIPLE VALUE', 'PROVISION', 'DAYS', 'POSTED DATE']}
      data={REPORT_DATA}
      filterFields={['ACCOUNT NUMBER', 'PRODUCT', 'BANK', 'BRANCH', 'PRINCIPLE VALUE', 'PROVISION']}
      dataMap={{ 
          'ACCOUNT NUMBER': 'account', 
          'PRODUCT': 'product', 
          'BANK': 'bank',
          'BRANCH': 'branch',
          'PRINCIPLE VALUE': 'value',
          'PROVISION': 'provision',
          'DAYS': 'days',
          'POSTED DATE': 'date'
      }}
      showAddButton={false}
      showDefaultRowActions={false}
      showSelection={false}
    />
  );
};

export default Reports;
