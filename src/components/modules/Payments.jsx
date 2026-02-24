import React from 'react';
import { Plus } from 'lucide-react';
import ModulePage from '../ModulePage';

const PAYMENT_DATA = [
  { id: 1, accountNo: 'UAT001',           bank: 'Commercial Bank', value: 'LKR 1,200,000.00',       startDate: '2025-11-09', duration: '2 years' },
  { id: 2, accountNo: '3965738',          bank: 'Commercial Bank', value: 'LKR 600,000,000.00',     startDate: '2025-05-29', duration: '5 years' },
  { id: 3, accountNo: '3877651',          bank: 'Commercial Bank', value: 'LKR 2,400,000,000.00',   startDate: '2025-03-18', duration: '5 years' },
  { id: 4, accountNo: '100002800018547',  bank: 'Bank of China',   value: 'LKR 1,900,000,000.00',   startDate: '2023-08-24', duration: '3 years' },
];

const Payments = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Payments"
      columns={['Account No', 'Bank', 'Value', 'Start Date', 'Duration']}
      data={PAYMENT_DATA}
      filterFields={['Account No', 'Bank', 'Start Date', 'Duration', 'Value']}
      dataMap={{
        'Account No': 'accountNo',
        'Bank':       'bank',
        'Value':      'value',
        'Start Date': 'startDate',
        'Duration':   'duration',
      }}
      showAddButton={false}
      onRowClick={(row) => onNavigate && onNavigate('Payment Item Details', row)}
      renderRowActions={(row) => (
        <button
          className="text-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Record payment for', row.accountNo);
          }}
        >
          <Plus size={14} />
          add payment
        </button>
      )}
    />
  );
};

export default Payments;
