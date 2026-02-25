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
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        color: 'var(--color-text-main)',
                                        fontFamily: 'monospace'
                                    }}>
                                        <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400, marginRight: '4px' }}>SGD</span>
                                        2,500,000.00
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '16px 0' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                <span>Total: <span style={{ fontFamily: 'monospace' }}>SGD 2,500,000.00</span></span>
                                <span>Paid: <span style={{ fontFamily: 'monospace' }}>SGD 0.00 (0%)</span></span>
                            </div>

                            <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '0%', backgroundColor: 'var(--color-primary-action)' }}></div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-field">
                                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                                    Payment Date <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="date"
                                        defaultValue="2026-02-24"
                                        style={{
                                            width: '100%',
                                            height: '36px',
                                            padding: '0 12px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                    <CalendarIcon
                                        size={14}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#6b7280',
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                                    Planned Amount <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', height: '36px', display: 'flex', overflow: 'hidden' }}>
                                    <div style={{
                                        width: '80px',
                                        backgroundColor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 10px',
                                        gap: '8px',
                                        borderRight: '1px solid #e5e7eb'
                                    }}>
                                        <div style={{
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            display: 'flex',
                                            flexShrink: 0
                                        }}>
                                            <img
                                                src="https://flagcdn.com/w20/sg.png"
                                                alt="SG Flag"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#111827', fontWeight: 500 }}>SGD</span>
                                    </div>
                                    <input
                                        type="text"
                                        defaultValue="52,083.33"
                                        style={{
                                            flex: 1,
                                            height: '100%',
                                            padding: '0 12px',
                                            border: 'none',
                                            fontSize: '13px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-field" style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                                    Internal Note
                                </label>
                                <textarea
                                    placeholder="Add any notes about this payment..."
                                    style={{
                                        width: '100%',
                                        minHeight: '80px',
                                        padding: '8px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box',
                                        resize: 'none',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="dialog-actions" style={{ padding: '16px 24px', backgroundColor: 'var(--color-bg-subtle)', margin: 0, justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex' }}>
                            <button
                                className="btn btn-primary"
                                style={{ padding: '8px 24px' }}
                                onClick={onClose}
                            >
                                Record payment
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default NewPaymentModal;
