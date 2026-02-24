import React from 'react';
import { Eye } from 'lucide-react';
import ModulePage from '../ModulePage';
import AccrualApprovalModal from './AccrualApprovalModal';

const ACCRUAL_DATA = [
  { id: 1, groupId: '202602_FD_LKR_SAMPATH', company: 'Lion Brewery Sri Lanka', bank: 'Sampath Bank (SAMPATH)', accounts: 1, provision: '29,157,534.25', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 2, groupId: '202602_FD_LKR_COMB', company: 'Lion Brewery Sri Lanka', bank: 'Commercial Bank (COMB)', accounts: 3, provision: '877,402,739.73', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 3, groupId: '202602_FD_LKR_DFCC', company: 'Lion Brewery Sri Lanka', bank: 'DFCC Bank (DFCC)', accounts: 3, provision: '119,928,767.12', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 4, groupId: '202602_FD_LKR_NDB', company: 'Lion Brewery Sri Lanka', bank: 'NDB Bank (NDB)', accounts: 1, provision: '35,726,027.40', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 5, groupId: '202602_LTL_LKR_COMB', company: 'Lion Brewery Sri Lanka', bank: 'Commercial Bank (COMB)', accounts: 3, provision: '2,087,013.70', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 6, groupId: '202602_LTL_LKR_BOCC', company: 'Lion Brewery Sri Lanka', bank: 'Bank of China (BOCC)', accounts: 1, provision: '424,246.58', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 7, groupId: '202602_FD_LKR_HNB', company: 'Lion Brewery Sri Lanka', bank: 'Hatton National Bank (HNB)', accounts: 2, provision: '34,109,589.04', approvedBy: '-', status: '-', statusInfo: '-' },
  { id: 8, groupId: '202602_STL_LKR_BOCC', company: 'Lion Brewery Sri Lanka', bank: 'Bank of China (BOCC)', accounts: 1, provision: '22,904.11', approvedBy: '-', status: '-', statusInfo: '-' },
];

const Accruals = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState('Current month');
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const selectedData = ACCRUAL_DATA.filter(item => selectedRows.has(item.id));

  const renderPeriodSelector = () => (
    <select
      className="header-period-select"
      value={selectedPeriod}
      onChange={(e) => setSelectedPeriod(e.target.value)}
    >
      <option value="Current month">Current month</option>
      <option value="Last month">Last month</option>
    </select>
  );

  const renderActions = () => {
    const isSelected = selectedRows.size > 0;
    return (
      <button
        className="btn"
        disabled={!isSelected}
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: isSelected ? 'var(--color-primary-action)' : '#f3f4f6',
          color: isSelected ? 'white' : '#9ca3af',
          border: '1px solid',
          borderColor: isSelected ? 'transparent' : '#e5e7eb',
          padding: '8px 16px',
          fontWeight: 600,
          cursor: isSelected ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease'
        }}
      >
        Approve and Queue
      </button>
    );
  };

  return (
    <>
      <ModulePage
        title="Accruals"
        columns={['GROUP ID', 'COMPANY', 'BANK', 'NO. OF ACCOUNTS', 'TOTAL PROVISION', 'APPROVED BY', 'ACCOUNTS STATUS', 'STATUS INFO']}
        data={ACCRUAL_DATA}
        filterFields={['GROUP ID', 'COMPANY', 'BANK', 'ACCOUNTS STATUS', 'TOTAL PROVISION']}
        dataMap={{
          'GROUP ID': 'groupId',
          'COMPANY': 'company',
          'BANK': 'bank',
          'NO. OF ACCOUNTS': 'accounts',
          'TOTAL PROVISION': 'provision',
          'APPROVED BY': 'approvedBy',
          'ACCOUNTS STATUS': 'status',
          'STATUS INFO': 'statusInfo'
        }}
        showAddButton={false}
        renderHeaderActions={renderPeriodSelector}
        renderActions={renderActions}
        onSelectionChange={handleSelectionChange}
        onRowClick={(row) => onNavigate && onNavigate('Accrual Item Details', row)}
        renderRowActions={(row) => (
          <button className="action-btn" title="View">
            <Eye size={14} />
          </button>
        )}
      />
      <AccrualApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedData={selectedData}
      />
    </>
  );
};

export default Accruals;
