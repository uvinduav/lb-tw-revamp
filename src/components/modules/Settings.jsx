import React, { useState } from 'react';
import { User, Mail, Bell, Shield, Info, Save } from 'lucide-react';

const Settings = () => {
    const [firstName, setFirstName] = useState('Kamal');
    const [lastName, setLastName] = useState('Perera');
    const [email] = useState('kamal@avlyon.com');
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        console.log('Saving changes...', { firstName, lastName, notifications });
    };

    const labelStyle = {
        display: 'block',
        textTransform: 'none',
        fontSize: '12px',
        fontWeight: 500,
        color: '#374151',
        marginBottom: '6px'
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
        transition: 'border-color 0.2s'
    };

    const handleInputFocus = (e) => {
        e.target.style.borderColor = '#8d6e63';
    };

    const handleInputBlur = (e) => {
        e.target.style.borderColor = '#e5e7eb';
    };

    return (
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflowY: 'auto' }}>
            <div className="dashboard-container" style={{ padding: '24px' }}>
                
                {/* Header Section */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '32px' 
                }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                            Profile Settings
                        </h1>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                            Manage your profile and preferences
                        </p>
                    </div>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        style={{ height: '36px', padding: '0 24px' }}
                    >
                        Save Changes
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', alignItems: 'start' }}>
                    
                    {/* Left Column: Profile Info & Preferences */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        
                        {/* Profile Information Section (No card border) */}
                        <div style={{ padding: '0' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={labelStyle}>
                                        First Name <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="e.g., John"
                                        style={inputStyle}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={labelStyle}>
                                        Last Name <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="e.g., Doe"
                                        style={inputStyle}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
                                <label style={labelStyle}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: 'var(--color-bg-subtle)',
                                        color: 'var(--color-text-secondary)',
                                        cursor: 'not-allowed',
                                    }}
                                />
                                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                                    Email is managed through your Microsoft Entra ID account.
                                </p>
                            </div>
                        </div>

                        <div style={{ 
                            padding: '16px', 
                            backgroundColor: 'var(--color-bg-subtle)', 
                            borderRadius: '8px',
                            border: '1px solid var(--color-border)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between' 
                        }}>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>Email Notifications</div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Receive email notifications for important updates.</div>
                            </div>
                            
                            <div style={{ position: 'relative', width: '40px', height: '22px' }}>
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                    style={{
                                        opacity: 0,
                                        width: 0,
                                        height: 0
                                    }}
                                />
                                <div 
                                    onClick={() => setNotifications(!notifications)}
                                    style={{
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: notifications ? '#22c55e' : '#ccc',
                                        transition: '.4s',
                                        borderRadius: '34px'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        content: '',
                                        height: '18px',
                                        width: '18px',
                                        left: notifications ? '20px' : '2px',
                                        bottom: '2px',
                                        backgroundColor: 'white',
                                        transition: '.4s',
                                        borderRadius: '50%'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Account Info Card (No Hover) */}
                    <div className="widget-card" style={{ padding: '24px', boxShadow: 'none', transform: 'none', transition: 'none' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '20px' }}>
                            Account Information
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>Account Status</div>
                                <span className="status-pill status-active">Active</span>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '2px' }}>Member Since</div>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>February 10, 2026</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '2px' }}>Last Login</div>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>February 25, 2026 4:56 AM</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '2px' }}>Entra ID</div>
                                <div style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-text-main)', fontFamily: 'monospace', wordBreak: 'break-all', backgroundColor: 'var(--color-bg-subtle)', padding: '8px', borderRadius: '4px', marginTop: '4px' }}>
                                    b0bc0d5d−5742−4a00−9ead−5a5f341e9455
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
