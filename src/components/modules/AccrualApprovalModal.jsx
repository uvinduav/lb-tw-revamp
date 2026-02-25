import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronDown, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

const AccrualApprovalModal = ({ isOpen, onClose, selectedData = [] }) => {
    const [expandedGroups, setExpandedGroups] = useState(new Set());

    React.useEffect(() => {
        if (isOpen) {
            setExpandedGroups(new Set(selectedData.map(item => item.id)));
        }
    }, [isOpen, selectedData]);

    const toggleGroup = (groupId) => {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(groupId)) {
            newExpanded.delete(groupId);
        } else {
            newExpanded.add(groupId);
        }
        setExpandedGroups(newExpanded);
    };

    const totalValue = selectedData.reduce((sum, item) => sum + parseFloat(item.provision.replace(/,/g, '')), 0);

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content" style={{ maxWidth: '1000px', width: '90vw', padding: 0, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <div>
                            <Dialog.Title className="dialog-title" style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                                Selected Groups for Approval
                            </Dialog.Title>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                                Review and approve the selected accrual groups before queuing for payment
                            </p>
                        </div>
                        <Dialog.Close asChild>
                            <button style={{
                                background: 'none',
                                border: 'none',
                                padding: '8px',
                                cursor: 'pointer',
                                color: 'var(--color-text-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto', backgroundColor: 'white' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0',
                            overflow: 'hidden'
                        }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                                        <th style={{ padding: '4px 10px', textAlign: 'left', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase', width: '40px' }}></th>
                                        <th style={{ padding: '4px 10px', textAlign: 'left', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>GROUP ID</th>
                                        <th style={{ padding: '4px 10px', textAlign: 'left', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>PRODUCT</th>
                                        <th style={{ padding: '4px 10px', textAlign: 'left', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>BANK</th>
                                        <th style={{ padding: '4px 10px', textAlign: 'center', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>ACCOUNTS</th>
                                        <th style={{ padding: '4px 10px', textAlign: 'right', fontWeight: 600, color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>PROVISION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedData.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr
                                                style={{ borderBottom: expandedGroups.has(item.id) ? 'none' : '1px solid var(--color-border)', cursor: 'pointer', transition: 'background-color 0.2s', height: '32px' }}
                                                onClick={() => toggleGroup(item.id)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <td style={{ padding: '4px 10px', textAlign: 'center' }}>
                                                    {expandedGroups.has(item.id) ? <ChevronDown size={14} color="#6b7280" /> : <ChevronRight size={14} color="#6b7280" />}
                                                </td>
                                                <td style={{ padding: '4px 10px', color: 'var(--color-text-main)', fontWeight: 400, fontSize: '13px' }}>{item.groupId}</td>
                                                <td style={{ padding: '4px 10px' }}>
                                                    <span style={{
                                                        padding: '1px 8px',
                                                        borderRadius: '12px',
                                                        backgroundColor: 'var(--status-posted-bg)',
                                                        color: 'var(--status-posted-text)',
                                                        fontSize: '11px',
                                                        fontWeight: 600
                                                    }}>
                                                        {item.groupId.includes('FD') ? 'FD' : item.groupId.includes('LTL') ? 'LTL' : 'STL'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '4px 10px', color: 'var(--color-text-main)', fontWeight: 400, fontSize: '13px' }}>{item.bank}</td>
                                                <td style={{ padding: '4px 10px', textAlign: 'center', color: 'var(--color-text-main)', fontWeight: 400, fontSize: '13px', fontFamily: 'monospace' }}>{item.accounts}</td>
                                                <td style={{ padding: '4px 10px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-main)', fontSize: '13px', fontFamily: 'monospace' }}>
                                                    LKR {item.provision}
                                                </td>
                                            </tr>
                                            {expandedGroups.has(item.id) && (
                                                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                                                    <td style={{ padding: '4px 10px', textAlign: 'center' }}>
                                                        <input type="checkbox" checked readOnly style={{ accentColor: 'var(--color-primary-action)' }} />
                                                    </td>
                                                    <td style={{ padding: '4px 10px', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 400 }}>
                                                        {item.id === 6 ? 'LTL' : '02468'}
                                                    </td>
                                                    <td style={{ padding: '4px 10px' }}>
                                                        <span style={{
                                                            padding: '1px 6px',
                                                            borderRadius: '4px',
                                                            backgroundColor: 'var(--color-bg-subtle)',
                                                            color: 'var(--color-text-secondary)',
                                                            fontSize: '11px',
                                                            fontWeight: 600
                                                        }}>
                                                            {item.groupId.includes('FD') ? 'FD' : item.groupId.includes('LTL') ? 'LTL' : 'STL'}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '4px 10px', color: 'var(--color-text-main)', fontSize: '13px', fontWeight: 400, fontFamily: 'monospace' }}>
                                                        2025-01-14
                                                    </td>
                                                    <td style={{ padding: '4px 10px' }}></td>
                                                    <td style={{ padding: '4px 10px', textAlign: 'right', color: 'var(--color-text-main)', fontFamily: 'monospace', fontSize: '13px', fontWeight: 400 }}>
                                                        LKR {item.provision}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr style={{ backgroundColor: '#fafafa', borderTop: '2px solid var(--color-border)', height: '40px' }}>
                                        <td colSpan="5" style={{ padding: '4px 10px', textAlign: 'right', fontWeight: 700, fontSize: '13px', color: 'var(--color-text-main)' }}>Total:</td>
                                        <td style={{ padding: '4px 10px', textAlign: 'right', fontWeight: 700, fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>
                                            LKR {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="dialog-actions" style={{ padding: '16px 24px', backgroundColor: 'white', borderTop: '1px solid var(--color-border)', margin: 0, justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex' }}>
                            <button
                                className="btn btn-primary"
                                style={{
                                    padding: '8px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                                onClick={onClose}
                            >
                                <CheckCircle2 size={18} />
                                Approve and Queue
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AccrualApprovalModal;
