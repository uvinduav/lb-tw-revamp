import React from 'react';
import ModulePage from '../ModulePage';

const FLOATING_RATE_DATA = [
  { id: 1, benchmark: 'AWPLR CBSL Weekly (System)', rate: '8.9500%', effectiveFrom: '2026-02-20', status: 'Active', current: 'Current', system: 'System' },
  { id: 2, benchmark: 'AWPLR CBSL Weekly (System)', rate: '9.0400%', effectiveFrom: '2026-02-13', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 3, benchmark: 'AWPLR CBSL Weekly (System)', rate: '9.3200%', effectiveFrom: '2026-02-06', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 4, benchmark: 'AWPLR CBSL Bi-Annually (System)', rate: '8.4400%', effectiveFrom: '2026-01-30', status: 'Active', current: 'Current', system: 'System' },
  { id: 5, benchmark: 'AWPLR CBSL Monthly (System)', rate: '8.9900%', effectiveFrom: '2026-01-30', status: 'Active', current: 'Current', system: 'System' },
  { id: 6, benchmark: 'AWPLR CBSL Weekly (System)', rate: '8.8800%', effectiveFrom: '2026-01-30', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 7, benchmark: 'AWPLR CBSL Weekly (System)', rate: '8.9000%', effectiveFrom: '2026-01-23', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 8, benchmark: 'AWPLR CBSL Weekly (System)', rate: '8.9800%', effectiveFrom: '2026-01-16', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 9, benchmark: 'AWPLR CBSL Weekly (System)', rate: '9.1900%', effectiveFrom: '2026-01-09', status: 'Active', current: 'Not Current', system: 'System' },
  { id: 10, benchmark: 'AWPLR CBSL Bi-Annually (System)', rate: '8.2800%', effectiveFrom: '2026-01-02', status: 'Active', current: 'Not Current', system: 'System' },
];

const FloatingRates = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Floating Rates"
      columns={['Benchmark', 'Rate (%)', 'Effective From', 'Status', 'Current', 'System Generated']}
      data={FLOATING_RATE_DATA}
      filterFields={['Benchmark', 'Status']}
      dataMap={{
        'Benchmark': 'benchmark',
        'Rate (%)': 'rate',
        'Effective From': 'effectiveFrom',
        'Status': 'status',
        'Current': 'current',
        'System Generated': 'system'
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Floating Rates' })}
      createButtonText="Add New Rate"
      onRowClick={(row) => onNavigate && onNavigate('Floating Rate Item Details', row)}
    />
  );
};

export default FloatingRates;
