import React from 'react';
import ModulePage from '../ModulePage';
import { Play } from 'lucide-react';
import HighlightText from '../common/HighlightText';

const CHANGELOG_DATA = [
  {
    id: 1,
    timestamp: '2026-02-24 09:15:33',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'uvindu.p@avlyon.com (uvindu.p@avlyon.com)',
    changes: '2 field(s) changed'
  },
  {
    id: 2,
    timestamp: '2026-02-24 09:15:33',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'System',
    changes: '1 field(s) changed'
  },
  {
    id: 3,
    timestamp: '2026-02-24 09:13:07',
    entityType: 'User',
    entityId: '#chanodya.l@avlyon.com (f5f15366-8a50-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'chanodya.l@avlyon.com (chanodya.l@avlyon.com)',
    changes: '2 field(s) changed'
  },
  {
    id: 4,
    timestamp: '2026-02-24 09:13:07',
    entityType: 'User',
    entityId: '#chanodya.l@avlyon.com (f5f15366-8a50-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'System',
    changes: '1 field(s) changed'
  },
  {
    id: 5,
    timestamp: '2026-02-24 05:14:42',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'uvindu.p@avlyon.com (uvindu.p@avlyon.com)',
    changes: '2 field(s) changed'
  },
  {
    id: 6,
    timestamp: '2026-02-24 05:14:42',
    entityType: 'User',
    entityId: '#uvindu.p@avlyon.com (b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e)',
    action: 'Update',
    user: 'System',
    changes: '1 field(s) changed'
  },
  {
    id: 7,
    timestamp: '2026-02-24 03:45:56',
    entityType: 'User',
    entityId: '#oshan.r@avlyon.com#EXT#@oshanravlyon.com (c2f1b4a1-4b2a-8c1d)',
    action: 'Update',
    user: 'Oshan Rube (oshan.r@avlyon.com...)',
    changes: '2 field(s) changed'
  },
  {
    id: 8,
    timestamp: '2026-02-24 03:45:56',
    entityType: 'User',
    entityId: '#oshan.r@avlyon.com#EXT#@oshanravlyon.com (c2f1b4a1-4b2a-8c1d)',
    action: 'Update',
    user: 'System',
    changes: '1 field(s) changed'
  },
  {
    id: 9,
    timestamp: '2026-02-24 03:40:38',
    entityType: 'Account',
    entityId: '#1421310601',
    action: 'Update',
    user: 'chanodya.l@avlyon.com (chanodya.l@avlyon.com)',
    changes: '11 field(s) changed'
  },
];

const ChangeLog = () => {
  const renderCell = (row, col, value, highlight) => {
    if (col === 'ENTITY') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0', gap: '2px' }}>
          <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-main)' }}>
            <HighlightText text={row.entityType} highlight={highlight} />
          </span>
          <span style={{ fontSize: '12px', color: '#1677ff', cursor: 'pointer' }} className="truncate">
            <HighlightText text={row.entityId} highlight={highlight} />
          </span>
        </div>
      );
    }

    if (col === 'ACTION') {
      return (
        <span style={{
          backgroundColor: '#e6f4ff',
          color: '#1677ff',
          padding: '2px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          display: 'inline-block'
        }}>
          <HighlightText text={value} highlight={highlight} />
        </span>
      );
    }

    if (col === 'CHANGES') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1677ff', cursor: 'pointer', fontWeight: 400 }}>
          <Play size={10} fill="#1677ff" />
          <span><HighlightText text={value} highlight={highlight} /></span>
        </div>
      );
    }

    if (col === 'USER' || col === 'TIME') {
      return (
        <span style={{ color: 'var(--color-text-main)', fontSize: '13px' }} className="truncate">
          <HighlightText text={value} highlight={highlight} />
        </span>
      )
    }

    return <HighlightText text={value || '-'} highlight={highlight} />;
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
      renderCell={renderCell}
    />
  );
};

export default ChangeLog;

