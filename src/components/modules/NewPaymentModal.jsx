import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calendar as CalendarIcon, DollarSign } from 'lucide-react';

const NewPaymentModal = ({ isOpen, onClose, accountData }) => {
    if (!accountData) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content" style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <Dialog.Title className="dialog-title" style={{ margin: 0, fontSize: '18px' }}>
                                New Payment
                            </Dialog.Title>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                                Enter payment details for this account
                            </p>
                        </div>
                        <Dialog.Close asChild>
                            <button style={{
                                background: 'none',
                                border: 'none',
                                padding: '4px',
                                cursor: 'pointer',
                                color: 'var(--color-text-tertiary)',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div style={{ padding: '24px', overflowY: 'auto' }}>
                        {/* Account Info Card */}
                        <div style={{
                            backgroundColor: 'var(--color-bg-subtle)',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '24px',
                            border: '1px solid var(--color-border)'
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        Account Number
                                    </div>
                                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                                        {accountData.accountNo}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                                        Remaining Balance
                                    </div>
                                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#f97316' }}>
                                        <span style={{ fontSize: '14px', marginRight: '4px' }}>SGD</span>
                                        2,500,000.00
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '16px 0' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                <span>Total: SGD 2,500,000.00</span>
                                <span>Paid: SGD 0.00 (0%)</span>
                            </div>

                            <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '0%', backgroundColor: 'var(--color-primary-action)' }}></div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="filter-field">
                                <label>Payment Date <span style={{ color: '#ef4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        defaultValue="2026-02-24"
                                        className="filter-field input"
                                        style={{
                                            paddingLeft: '12px',
                                            height: '36px'
                                        }}
                                    />
                                </div>
                                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>Date when the payment was made</p>
                            </div>

                            <div className="filter-field">
                                <label>Planned Amount <span style={{ color: '#ef4444' }}>*</span></label>
                                <div style={{ position: 'relative', display: 'flex' }}>
                                    <div style={{
                                        height: '36px',
                                        padding: '0 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid var(--color-border)',
                                        borderRight: 'none',
                                        borderRadius: '4px 0 0 4px',
                                        backgroundColor: 'var(--color-bg-subtle)',
                                        fontSize: '13px',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        SGD
                                    </div>
                                    <input
                                        type="text"
                                        defaultValue="52,083.33"
                                        style={{
                                            flex: 1,
                                            height: '36px',
                                            padding: '0 12px',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '0 4px 4px 0',
                                            fontSize: '13px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>Amount paid in SGD</p>
                            </div>

                            <div className="filter-field" style={{ gridColumn: 'span 2' }}>
                                <label>Internal Note</label>
                                <textarea
                                    placeholder="Add any notes about this payment..."
                                    style={{
                                        width: '100%',
                                        minHeight: '80px',
                                        padding: '8px 12px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        boxSizing: 'border-box',
                                        resize: 'none',
                                        outline: 'none'
                                    }}
                                />
                                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>Optional notes for internal reference</p>
                            </div>
                        </div>
                    </div>

                    <div className="dialog-actions" style={{ padding: '16px 24px', backgroundColor: 'var(--color-bg-subtle)', margin: 0 }}>
                        <button
                            className="btn-clear"
                            onClick={onClose}
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            Cancel
                        </button>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="btn btn-primary"
                                style={{ padding: '8px 24px' }}
                                onClick={onClose}
                            >
                                Save Payment
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default NewPaymentModal;
