import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const StatusPill = ({ label, action }) => {
  let color = '#3b82f6';
  let bg = '#eff6ff';
  
  if (action === 'Create') { color = '#10b981'; bg = '#ecfdf5'; }
  if (action === 'Delete') { color = '#ef4444'; bg = '#fef2f2'; }
  if (action === 'Update') { color = '#3b82f6'; bg = '#eff6ff'; }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 600,
      backgroundColor: bg,
      color: color,
      textTransform: 'uppercase'
    }}>
      {label}
    </span>
  );
};

const LogTable = ({ changes, timestamp, action, user }) => (
  <div className="table-wrapper" style={{ margin: '0 0 24px 0', width: '100%', overflow: 'hidden' }}>
    <table className="data-table" style={{ width: '100%', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th style={{ width: '180px', textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px', height: '32px' }}>time stamp</th>
          <th style={{ width: '100px', textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Action</th>
          <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>User</th>
          <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Value</th>
          <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Before</th>
          <th style={{ width: '32px', padding: 0 }}></th>
          <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>After</th>
        </tr>
      </thead>
      <tbody>
        {changes.map((change, index) => (
          <tr key={index} style={{ height: '32px' }}>
            <td style={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '12px', padding: '4px 10px' }}>
              {timestamp}
            </td>
            <td style={{ padding: '4px 10px' }}>
              <StatusPill label={action} action={action} />
            </td>
            <td style={{ color: '#374151', padding: '4px 10px', fontSize: '13px' }}>
              {user}
            </td>
            <td style={{ color: '#374151', padding: '4px 10px', fontWeight: 500 }}>
              {change.field}
            </td>
            <td style={{ color: '#f87171', fontFamily: 'monospace', padding: '4px 10px' }}>
              {change.old}
            </td>
            <td style={{ padding: 0, textAlign: 'center' }}>
              <ArrowRight size={14} color="#9ca3af" />
            </td>
            <td style={{ color: '#10b981', fontFamily: 'monospace', padding: '4px 10px' }}>
              {change.new}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChangeLogItemPage = ({ logEntry }) => {
  if (!logEntry) return null;

  const historyEntries = [
    {
      timestamp: 'FEB 25, 2026 - 4:45 PM',
      user: 'uvindu.p@avlyon.com',
      action: 'Update',
      changes: [
        { field: 'role', old: 'Viewer', new: 'Admin' },
        { field: 'permissions', old: 'READ', new: 'FULL_ACCESS' }
      ]
    },
    {
      timestamp: 'FEB 25, 2026 - 4:33 AM',
      user: 'user',
      action: 'Update',
      changes: [
        { field: 'updateBy', old: 'null', new: 'user@email.com (2dsd12314)' },
        { field: 'lastLoginAt', old: '2026-02-23 04:55:34', new: '2026-03-13 04:55:34' }
      ]
    },
    {
      timestamp: 'FEB 24, 2026 - 09:12 AM',
      user: 'system',
      action: 'Update',
      changes: [
        { field: 'emailVerified', old: 'false', new: 'true' }
      ]
    },
    {
      timestamp: 'FEB 22, 2026 - 10:15 AM',
      user: 'admin@avlyon.com',
      action: 'Create',
      changes: [
        { field: 'entityType', old: 'null', new: 'User' },
        { field: 'entityId', old: 'null', new: 'b0bc0d5d-5742-4b2a-8c1d-6e1e1e1e1e1e' }
      ]
    }
  ];

  const firstEntry = historyEntries[0];
  const remainingEntries = historyEntries.slice(1);

  const groupedEntries = remainingEntries.reduce((acc, entry) => {
    const date = entry.timestamp.split(' - ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="page-content" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 64px)' }}>
      {/* ── Header with First Entry (Grey BG) ── */}
      <div style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px' }}>
        <div className="page-header" style={{ paddingBottom: '24px' }}>
          <div>
            <div className="page-title">
              <h1>Log Entry Details</h1>
            </div>
            <div className="page-subtitle">
              Viewing audit trail for {logEntry.entityType} ({logEntry.entityId})
            </div>
          </div>
          <div className="actions-row">
            <button className="btn btn-outline">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div style={{ padding: '0 var(--spacing-lg)' }}>
          <LogTable 
            changes={firstEntry.changes} 
            timestamp={firstEntry.timestamp} 
            action={firstEntry.action} 
            user={firstEntry.user} 
          />
        </div>
      </div>

      {/* ── History Content (White BG) ── */}
      <div style={{ marginTop: '32px' }}>
        {sortedDates.map((date) => (
          <div key={date} style={{ marginBottom: '40px' }}>
            <div style={{ margin: '0 var(--spacing-lg) 16px var(--spacing-lg)' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>{date}</span>
            </div>

            <div style={{ padding: '0 var(--spacing-lg)' }}>
              {groupedEntries[date].map((entry, idx) => (
                <div key={`${date}-${idx}`} className="table-wrapper" style={{ margin: '0 0 24px 0', width: '100%', overflow: 'hidden' }}>
                  <table className="data-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '180px', textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px', height: '32px' }}>time stamp</th>
                        <th style={{ width: '100px', textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Action</th>
                        <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>User</th>
                        <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Value</th>
                        <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>Before</th>
                        <th style={{ width: '32px', padding: 0 }}></th>
                        <th style={{ textTransform: 'none', color: '#888', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.changes.map((change, cIdx) => (
                        <tr key={cIdx} style={{ height: '32px' }}>
                          <td style={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '12px', padding: '4px 10px' }}>
                            {entry.timestamp}
                          </td>
                          <td style={{ padding: '4px 10px' }}>
                            <StatusPill label={entry.action} action={entry.action} />
                          </td>
                          <td style={{ color: '#374151', padding: '4px 10px', fontSize: '13px' }}>
                            {entry.user}
                          </td>
                          <td style={{ color: '#374151', padding: '4px 10px', fontWeight: 500 }}>
                            {change.field}
                          </td>
                          <td style={{ color: '#f87171', fontFamily: 'monospace', padding: '4px 10px' }}>
                            {change.old}
                          </td>
                          <td style={{ padding: 0, textAlign: 'center' }}>
                            <ArrowRight size={14} color="#9ca3af" />
                          </td>
                          <td style={{ color: '#10b981', fontFamily: 'monospace', padding: '4px 10px' }}>
                            {change.new}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLogItemPage;
