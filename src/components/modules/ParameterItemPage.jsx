import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AuditInformation from './AuditInformation';

const StatusPill = ({ label, variant }) => {
    const styles = {
        active: { bg: '#dcfce7', color: '#15803d' },
        inactive: { bg: '#f3f4f6', color: '#6b7280' },
    };
    const s = styles[variant?.toLowerCase()] || styles.inactive;
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: s.bg,
                color: s.color,
                marginRight: '6px',
            }}
        >
            {label}
        </span>
    );
};

const InfoItem = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', fontWeight: 400 }}>
            {label}
        </span>
        <span
            style={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#111827',
            }}
        >
            {children ?? '-'}
        </span>
    </div>
);

const ParameterItemPage = ({ item, title = 'Item Details' }) => {
    if (!item) return null;

    // Derive title field (usually 'name' or 'title' or 'code')
    const itemName = item.name || item.title || item.code || 'Details';
    const subtitle = item.code && (item.name || item.title) ? item.code : '';
    const moduleTitle = item.parent || title;

    // Get all keys except id and system ones
    const excludeKeys = ['id', 'name', 'title', 'status', 'isCurrent', 'parent'];
    const fields = Object.entries(item).filter(([key]) => !excludeKeys.includes(key));

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                height: '100%',
                overflowY: 'auto',
                backgroundColor: 'white',
                padding: '24px',
            }}
        >
            {/* ── Header Area ── */}
            <div style={{ margin: '0 0 28px 0', padding: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                            {itemName}
                        </h1>
                        <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                            {subtitle}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="btn btn-outline"
                            title="Edit"
                            style={{ paddingLeft: '20px', paddingRight: '20px', fontFamily: 'var(--font-inter)' }}
                        >
                            <Pencil size={16} />
                            Edit
                        </button>
                        <button className="btn btn-outline" style={{ color: 'var(--status-failed-text)' }} title="Delete">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* ── Information Card ── */}
                <div
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        padding: '24px',
                    }}
                >
                    <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)', margin: '0 0 20px 0' }}>
                        {moduleTitle} Information
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 24px' }}>
                        {/* Standard Name/Title field if it exists */}
                        {(item.name || item.title) && (
                            <InfoItem label={item.name ? "Name" : "Title"}>{item.name || item.title}</InfoItem>
                        )}

                        {/* Dynamic fields */}
                        {fields.map(([key, value]) => (
                            <InfoItem key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}>
                                {value}
                            </InfoItem>
                        ))}

                        {/* Status if it exists */}
                        {item.status && (
                            <InfoItem label="Status">
                                <StatusPill label={item.status} variant={item.status === 'Active' ? 'active' : 'inactive'} />
                            </InfoItem>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <AuditInformation
                    createdAt="2026-02-21 02:00:05"
                    updatedAt="2026-02-23 02:00:06"
                    createdBy="dinuka@oshanravlyon.onmicrosoft.com (3657aa5c-0cb7-472d-a9b3-f1a5e86e6477)"
                    updatedBy="amilad@oshanravlyon.onmicrosoft.com (3906f309-55a4-498c-a696-390c8262193f)"
                />
            </div>
        </div>
    );
};

export default ParameterItemPage;
