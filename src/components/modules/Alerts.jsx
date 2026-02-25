import React, { useState } from 'react';
import { Mail, Info, Bell, Plus, ChevronDown, X, User, Trash2, UserPlus, AlertTriangle, Activity, Settings, Terminal, FileText } from 'lucide-react';

const Alerts = () => {
    const primaryColor = '#8d6e63';
    const greyColor = '#9ca3af';

    const [alerts, setAlerts] = useState([
        {
            id: 1,
            title: 'Account Creation Alerts',
            enabled: true,
            icon: UserPlus,
            recipients: []
        },
        {
            id: 2,
            title: 'Threshold Breach Alerts',
            enabled: true,
            icon: AlertTriangle,
            recipients: []
        },
        {
            id: 3,
            title: 'Anomaly & Pattern Alerts',
            enabled: true,
            icon: Activity,
            recipients: []
        },
        {
            id: 4,
            title: 'Edit / Configuration Change Alerts',
            enabled: true,
            icon: Settings,
            recipients: []
        },
        {
            id: 5,
            title: 'SAP Posting Failure Alerts',
            enabled: true,
            icon: Terminal,
            recipients: []
        },
        {
            id: 6,
            title: 'File Processing Alerts (MT940 / CAMT.052)',
            enabled: true,
            icon: FileText,
            recipients: []
        }
    ]);

    const [expandedAlerts, setExpandedAlerts] = useState(new Set());
    const [addingRecipientTo, setAddingRecipientTo] = useState(null);
    const [newRecipient, setNewRecipient] = useState({ name: '', email: '', role: '' });

    const toggleAlert = (id) => {
        setAlerts(alerts.map(alert => 
            alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
        ));
    };

    const toggleExpand = (id) => {
        const newExpanded = new Set(expandedAlerts);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedAlerts(newExpanded);
    };

    const handleAddRecipient = (alertId) => {
        if (!newRecipient.name || !newRecipient.email) return;
        
        setAlerts(alerts.map(alert => {
            if (alert.id === alertId) {
                return {
                    ...alert,
                    recipients: [...alert.recipients, { ...newRecipient, id: Date.now() }]
                };
            }
            return alert;
        }));
        
        setNewRecipient({ name: '', email: '', role: '' });
        setAddingRecipientTo(null);
    };

    const handleDeleteRecipient = (alertId, recipientId) => {
        setAlerts(alerts.map(alert => {
            if (alert.id === alertId) {
                return {
                    ...alert,
                    recipients: alert.recipients.filter(r => r.id !== recipientId)
                };
            }
            return alert;
        }));
    };

    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        height: '36px',
        padding: '0 12px',
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '13px',
        outline: 'none',
        backgroundColor: 'white',
        transition: 'border-color 0.2s'
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = primaryColor;
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = '#e5e7eb';
    };

    return (
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflowY: 'auto' }}>
            <div className="dashboard-container" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                
                <div style={{ flex: 1 }}>
                    {/* Header Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                                Email Alert Configuration
                            </h1>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                Configure automated email notifications for treasury events
                            </p>
                        </div>
                    </div>

                    {/* Alerts List */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {alerts.map((alert) => (
                            <div key={alert.id} style={{ 
                                borderBottom: '1px solid var(--color-border)'
                            }}>
                                <div 
                                    onClick={() => toggleExpand(alert.id)}
                                    style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: '8px 12px',
                                        margin: '0 -12px',
                                        borderRadius: '6px',
                                        transition: 'background-color 0.2s',
                                        backgroundColor: expandedAlerts.has(alert.id) ? 'var(--color-bg-subtle)' : 'transparent'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = expandedAlerts.has(alert.id) ? 'var(--color-bg-subtle)' : 'transparent'}
                                >
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <div style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: greyColor,
                                            flexShrink: 0
                                        }}>
                                            <alert.icon size={20} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)', margin: 0 }}>
                                                {alert.title}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                                {alert.enabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                            <div 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleAlert(alert.id);
                                                }}
                                                style={{
                                                    position: 'relative',
                                                    width: '40px',
                                                    height: '22px',
                                                    backgroundColor: alert.enabled ? primaryColor : '#ccc',
                                                    borderRadius: '34px',
                                                    cursor: 'pointer',
                                                    transition: '.4s'
                                                }}
                                            >
                                                <div style={{
                                                    position: 'absolute',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: alert.enabled ? '20px' : '2px',
                                                    bottom: '2px',
                                                    backgroundColor: 'white',
                                                    transition: '.4s',
                                                    borderRadius: '50%'
                                                }}></div>
                                            </div>
                                        </div>
                                        <div 
                                            style={{ 
                                                color: 'var(--color-text-tertiary)', 
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'transform 0.2s',
                                                transform: expandedAlerts.has(alert.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                                            }}
                                        >
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>

                                {expandedAlerts.has(alert.id) && (
                                    <div style={{ 
                                        padding: '16px 12px 24px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                                                Email Recipients ({alert.recipients.length})
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button 
                                                    className="btn" 
                                                    onClick={() => {
                                                        setAddingRecipientTo(alert.id);
                                                        setNewRecipient({ name: '', email: '', role: '' });
                                                    }}
                                                    style={{ 
                                                        height: '28px', 
                                                        width: '28px',
                                                        padding: '0', 
                                                        fontSize: '12px', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center',
                                                        backgroundColor: 'white',
                                                        color: primaryColor,
                                                        border: '1px solid var(--color-border)',
                                                        borderRadius: '4px',
                                                    }}
                                                    title="Add Recipient"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Add New Recipient Form (Inline) */}
                                        {addingRecipientTo === alert.id && (
                                            <div style={{ 
                                                backgroundColor: 'white', 
                                                padding: '16px', 
                                                borderRadius: '8px',
                                                marginBottom: '20px',
                                                border: '1px solid var(--color-border)'
                                            }}>
                                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                                    Add New Recipient
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'center' }}>
                                                    <input
                                                        style={inputStyle}
                                                        placeholder="Name *"
                                                        value={newRecipient.name}
                                                        onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                    <input
                                                        style={inputStyle}
                                                        placeholder="Email Address *"
                                                        value={newRecipient.email}
                                                        onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                    <input
                                                        style={inputStyle}
                                                        placeholder="Role / Title"
                                                        value={newRecipient.role}
                                                        onChange={(e) => setNewRecipient({ ...newRecipient, role: e.target.value })}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button 
                                                            onClick={() => handleAddRecipient(alert.id)}
                                                            style={{ 
                                                                height: '36px', 
                                                                padding: '0 16px', 
                                                                backgroundColor: primaryColor, 
                                                                color: 'white', 
                                                                border: 'none', 
                                                                borderRadius: '6px',
                                                                fontSize: '13px',
                                                                fontWeight: 500,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Add
                                                        </button>
                                                        <button 
                                                            onClick={() => setAddingRecipientTo(null)}
                                                            style={{ 
                                                                height: '36px', 
                                                                width: '36px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundColor: 'transparent',
                                                                color: '#ef4444', 
                                                                border: 'none', 
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Recipients List (Rows) */}
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {alert.recipients.length === 0 && !addingRecipientTo && (
                                                <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                                                    No recipients configured
                                                </div>
                                            )}
                                            {alert.recipients.map((recipient) => (
                                                <div key={recipient.id} style={{ 
                                                    display: 'grid', 
                                                    gridTemplateColumns: '1.2fr 1.5fr 1fr auto',
                                                    gap: '16px',
                                                    height: '32px',
                                                    padding: '0', 
                                                    fontSize: '13px',
                                                    color: 'var(--color-text-main)',
                                                    borderBottom: '1px solid var(--color-border)',
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyItems: 'center', flexShrink: 0 }}>
                                                            <User size={12} style={{ margin: 'auto' }} />
                                                        </div>
                                                        {recipient.name}
                                                    </div>
                                                    <div style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{recipient.email}</div>
                                                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{recipient.role || '-'}</div>
                                                    <button 
                                                        onClick={() => handleDeleteRecipient(alert.id, recipient.id)}
                                                        style={{ 
                                                            background: 'none', 
                                                            border: 'none', 
                                                            color: '#ef4444', 
                                                            cursor: 'pointer',
                                                            padding: '4px',
                                                            display: 'flex',
                                                            opacity: 0.7
                                                        }}
                                                        title="Remove Recipient"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Information Banner - Moved to bottom and yellow themed */}
                <div style={{ 
                    backgroundColor: '#fefce8', 
                    borderLeft: '4px solid #eab308', 
                    padding: '16px', 
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '12px',
                    marginTop: '48px',
                    marginBottom: '24px'
                }}>
                    <div style={{ color: '#eab308', marginTop: '2px' }}>
                        <Info size={18} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#854d0e', marginBottom: '4px' }}>Important Information</div>
                        <div style={{ fontSize: '13px', color: '#854d0e', opacity: 0.8 }}>
                            Email alerts are sent in real-time when events occur. Ensure recipient email addresses are valid and monitored regularly. Changes take effect immediately upon saving.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
