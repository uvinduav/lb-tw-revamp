import React from 'react';
import ModulePage from '../ModulePage';
import { Play, Eye } from 'lucide-react';
import HighlightText from '../common/HighlightText';

const CHANGELOG_DATA = [
  {
    id: 1,
    timestamp: '2026-02-24 09:15:33',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'uvindu.p@avlyon.com (uvindu.p@avlyon.com)',
    changes: '2 changes'
  },
  {
    id: 2,
    timestamp: '2026-02-24 09:15:33',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Create',
    user: 'System',
    changes: '1 changes'
  },
  {
    id: 3,
    timestamp: '2026-02-24 09:13:07',
    entityType: 'User',
    entityId: '#chanodya.l@avlyon.com (f5f15366-8a50-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'chanodya.l@avlyon.com (chanodya.l@avlyon.com)',
    changes: '2 changes'
  },
  {
    id: 4,
    timestamp: '2026-02-24 09:13:07',
    entityType: 'User',
    entityId: '#chanodya.l@avlyon.com (f5f15366-8a50-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Delete',
    user: 'System',
    changes: '1 changes'
  },
  {
    id: 5,
    timestamp: '2026-02-24 05:14:42',
    entityType: 'Account',
    entityId: '#1421310601',
    action: 'Update',
    user: 'uvindu.p@avlyon.com (uvindu.p@avlyon.com)',
    changes: '5 changes'
  },
  {
    id: 6,
    timestamp: '2026-02-24 05:14:42',
    entityType: 'Account',
    entityId: '#1421310601',
    action: 'Update',
    user: 'System',
    changes: '1 changes'
  },
  {
    id: 7,
    timestamp: '2026-02-24 03:45:56',
    entityType: 'User',
    entityId: '#oshan.r@avlyon.com (c2f1b4a1-4b2a-8c1d)',
    action: 'Update',
    user: 'Oshan Rube (oshan.r@avlyon.com)',
    changes: '2 changes'
  },
  {
    id: 8,
    timestamp: '2026-02-24 03:45:56',
    entityType: 'User',
    entityId: '#oshan.r@avlyon.com (c2f1b4a1-4b2a-8c1d)',
    action: 'Create',
    user: 'System',
    changes: '1 changes'
  }
];

const ChangeLog = ({ onNavigate }) => {
  const renderCell = (row, col, value, highlight) => {
    if (col === 'ENTITY') {
      return (
        <span style={{ fontWeight: 400, fontSize: '13px', color: 'var(--color-text-main)' }}>
          <HighlightText text={row.entityType} highlight={highlight} />
        </span>
      );
    }

    if (col === 'ACTION') {
      let actionColor = 'var(--color-text-main)';
      if (value === 'Update') actionColor = '#1677ff';
      if (value === 'Create') actionColor = '#22c55e';
      if (value === 'Delete') actionColor = '#ef4444';

      return (
        <span style={{
          color: actionColor,
          fontSize: '13px',
          fontWeight: 400,
          fontFamily: 'monospace',
        }}>
          <HighlightText text={value} highlight={highlight} />
        </span>
      );
    }

    if (col === 'CHANGES') {
      const match = value?.match(/(\d+)/);
      const count = match ? match[1] : '0';
      return (
        <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>
          <HighlightText text={`${count} changes`} highlight={highlight} />
        </span>
      );
    }

    if (col === 'TIME') {
      return (
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px', fontWeight: 400, fontFamily: 'monospace' }} className="truncate">
          <HighlightText text={value} highlight={highlight} />
        </span>
      )
    }

    if (col === 'USER') {
      let displayUser = value;
      if (value.includes('(') && value.includes(')')) {
        const match = value.match(/\(([^)]+)\)/);
        if (match) displayUser = match[1].replace('...', '');
      }
      return (
        <span style={{ color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 400 }} className="truncate">
          <HighlightText text={displayUser} highlight={highlight} />
        </span>
      );
    }

    return (
      <span style={{ color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 400 }} className="truncate">
        <HighlightText text={value || '-'} highlight={highlight} />
      </span>
    );
  };

  return (
    <ModulePage
      title="Change Log"
      columns={['TIME', 'ENTITY', 'ACTION', 'USER', 'CHANGES']}
      data={CHANGELOG_DATA}
      filterFields={['TIME', 'ENTITY', 'ACTION', 'USER', 'CHANGES']}
      dataMap={{
        'TIME': 'timestamp',
        'ENTITY': 'entityType',
        'ACTION': 'action',
        'USER': 'user',
        'CHANGES': 'changes'
      }}
      showAddButton={false}
      showDefaultRowActions={false}
      showSelection={false}
      renderCell={renderCell}
      onRowClick={(row) => onNavigate && onNavigate('Change Log Item Details', row)}
      renderRowActions={() => (
        <button className="action-btn" title="View">
          <Eye size={14} />
        </button>
      )}
    />
  );
};

export default ChangeLog;

