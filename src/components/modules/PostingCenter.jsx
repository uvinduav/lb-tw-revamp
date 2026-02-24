import React from 'react';
import ModulePage from '../ModulePage';

const POSTING_DATA = [
  { id: 1, groupId: '202602_FD_LKR_SAMPATH', company: 'Lion Brewery', bank: 'Sampath Bank', accounts: 1, total: '29,157,534.25', status: 'Posted', sapDoc: '1200007921', approved: '2025-12-09 / chanodya.l@avlyon.com' },
  { id: 2, groupId: '202602_FD_LKR_COMB', company: 'Lion Brewery', bank: 'Commercial Bank', accounts: 3, total: '877,402,739.73', status: 'Posted', sapDoc: '1200007665', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 3, groupId: '202602_FD_LKR_DFCC', company: 'Lion Brewery', bank: 'DFCC Bank', accounts: 3, total: '119,928,767.12', status: 'Posted', sapDoc: '1200007669', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 4, groupId: '202602_FD_LKR_NDB', company: 'Lion Brewery', bank: 'NDB Bank', accounts: 1, total: '35,726,027.40', status: 'Posted', sapDoc: '1200007500', approved: '2025-12-09 / chanodya.l@avlyon.com' },
  { id: 5, groupId: '202602_LTL_LKR_COMB', company: 'Lion Brewery', bank: 'Commercial Bank', accounts: 3, total: '2,087,013.70', status: 'Posted', sapDoc: '1200007374', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 6, groupId: '202602_LTL_LKR_BOCC', company: 'Lion Brewery', bank: 'Bank of China', accounts: 1, total: '424,246.58', status: 'Posted', sapDoc: '1200007248', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 7, groupId: '202602_FD_LKR_HNB', company: 'Lion Brewery', bank: 'Hatton National Bank', accounts: 2, total: '34,109,589.04', status: 'Posted', sapDoc: '1200007122', approved: '2025-12-09 / chanodya.l@avlyon.com' },
  { id: 8, groupId: '202602_STL_LKR_BOCC', company: 'Lion Brewery', bank: 'Bank of China', accounts: 1, total: '22,904.11', status: 'Posted', sapDoc: '1200006996', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 9, groupId: '202512_FD_LKR_NDB', company: 'Lion Brewery', bank: 'NDB Bank', accounts: 1, total: '22,552,054.79', status: 'Failed', sapDoc: 'Network error...', approved: '2026-01-06 / Oshan Rube' },
  { id: 10, groupId: '202512_FD_USD_HNB', company: 'Lion Brewery', bank: 'Hatton National Bank', accounts: 1, total: '1,047.95', status: 'Failed', sapDoc: 'Network error...', approved: '2025-12-17 / ashan.p@avlyon.com' },
  { id: 11, groupId: '202512_FD_USD_SCBL', company: 'Lion Brewery', bank: 'Standard Chartered', accounts: 2, total: '4,218.75', status: 'Failed', sapDoc: 'Network error...', approved: '2025-12-17 / ashan.p@avlyon.com' },
  { id: 12, groupId: '202512_FD_LKR_DFCC', company: 'Lion Brewery', bank: 'DFCC Bank', accounts: 3, total: '97,663,698.63', status: 'Failed', sapDoc: 'Network error...', approved: '2025-12-16 / Oshan Rube' },
  { id: 13, groupId: '202512_STL_LKR_BOCC', company: 'Lion Brewery', bank: 'Bank of China', accounts: 1, total: '13,260.27', status: 'Failed', sapDoc: 'Network error...', approved: '2025-12-09 / chanodya.l@avlyon.com' },
  { id: 14, groupId: '202512_FD_LKR_COMB', company: 'Lion Brewery', bank: 'Commercial Bank', accounts: 3, total: '827,890,410.96', status: 'Posted', sapDoc: '1200007921', approved: '2025-12-09 / chanodya.l@avlyon.com' },
  { id: 15, groupId: '202511_FD_LKR_BOCC', company: 'Lion Brewery', bank: 'Bank of China', accounts: 1, total: '234,199.84', status: 'Posted', sapDoc: '1200007665', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 16, groupId: '202511_FD_USD_COMB', company: 'Lion Brewery', bank: 'Commercial Bank', accounts: 1, total: '1,630.14', status: 'Posted', sapDoc: '1200007669', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 17, groupId: '202511_FD_USD_HNB', company: 'Lion Brewery', bank: 'Hatton National Bank', accounts: 3, total: '6,673.01', status: 'Posted', sapDoc: '1200007668', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 18, groupId: '202511_LTL_LKR_COMB', company: 'Lion Brewery', bank: 'Commercial Bank', accounts: 2, total: '3,589,041.10', status: 'Posted', sapDoc: '1200007673', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 19, groupId: '202511_LTL_LKR_BOCC', company: 'Lion Brewery', bank: 'Bank of China', accounts: 1, total: '636,369.86', status: 'Posted', sapDoc: '1200007674', approved: '2025-12-02 / Janak Wijekoon' },
  { id: 20, groupId: '202511_FD_USD_SCBL', company: 'Lion Brewery', bank: 'Standard Chartered', accounts: 2, total: '9,826.39', status: 'Posted', sapDoc: '1200007670', approved: '2025-12-01 / Janak Wijekoon' },
  { id: 21, groupId: '202511_FD_EUR_SCBL', company: 'Lion Brewery', bank: 'Standard Chartered', accounts: 1, total: '870', status: 'Posted', sapDoc: '1200007672', approved: '2025-12-01 / Janak Wijekoon' },
  { id: 22, groupId: '202511_FD_USD_CITI', company: 'Lion Brewery', bank: 'Citi Bank', accounts: 1, total: '6,328.77', status: 'Posted', sapDoc: '1200007671', approved: '2025-12-01 / Janak Wijekoon' },
];

const PostingCenter = ({ onNavigate }) => {
  return (
    <ModulePage 
      title="Posting Center"
      columns={['GROUP ID', 'COMPANY', 'BANK', 'ACCOUNTS', 'TOTAL VALUE / PROVISION', 'STATUS', 'SAP DOC NO', 'APPROVED DATE / BY']}
      data={POSTING_DATA}
      filterFields={['GROUP ID', 'COMPANY', 'BANK', 'TOTAL VALUE / PROVISION', 'STATUS']}
      dataMap={{ 
          'GROUP ID': 'groupId', 
          'COMPANY': 'company', 
          'BANK': 'bank',
          'ACCOUNTS': 'accounts',
          'TOTAL VALUE / PROVISION': 'total',
          'STATUS': 'status',
          'SAP DOC NO': 'sapDoc',
          'APPROVED DATE / BY': 'approved'
      }}
      showAddButton={false}
      showDefaultRowActions={false}
      onRowClick={(row) => onNavigate && onNavigate('Posting Center Item Details', row)}
    />
  );
};

export default PostingCenter;
