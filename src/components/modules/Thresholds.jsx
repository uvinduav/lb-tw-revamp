import React, { useState } from 'react';
import { Info, ChevronDown, Coins, Save, Percent } from 'lucide-react';

const Thresholds = () => {
    const primaryColor = '#8d6e63';
    const greyColor = '#9ca3af';
    
    // Status colors
    const colors = {
        critical: '#ef4444', // Red
        warning: '#f59e0b',  // Orange
        success: '#10b981',  // Green
    };

    // State for Balance Thresholds
    const [balanceThresholds, setBalanceThresholds] = useState([
        { id: 'eur', title: 'EUR Balance Thresholds', critical: '500,000', warning: '1,000,000', high: '5,000,000' },
        { id: 'gbp', title: 'GBP Balance Thresholds', critical: '400,000', warning: '800,000', high: '4,000,000' },
        { id: 'lkr', title: 'LKR Balance Thresholds', critical: '50,000,000', warning: '100,000,000', high: '500,000,000' },
        { id: 'sgd', title: 'SGD Balance Thresholds', critical: '200,000', warning: '500,000', high: '2,500,000' },
        { id: 'usd', title: 'USD Balance Thresholds', critical: '1,000,000', warning: '2,000,000', high: '10,000,000' },
    ]);

    // State for Rates & Financial
    const [financialThresholds, setFinancialThresholds] = useState([
        { id: 'wacc', title: 'WACC (Weighted Average Cost of Capital) %', criticalAbove: '15.00', warningAbove: '12.00', goodBelow: '10.00' },
        { id: 'wacd', title: 'WACD (Weighted Average Cost of Debt) %', criticalAbove: '12.00', warningAbove: '10.00', goodBelow: '8.00' },
    ]);

    const [expandedSections, setExpandedSections] = useState(new Set());
    const [showInfoPopover, setShowInfoPopover] = useState(false);

    const toggleExpand = (id) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedSections(newExpanded);
    };

    const handleInputChange = (id, field, value, type) => {
        if (type === 'balance') {
            setBalanceThresholds(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
        } else {
            setFinancialThresholds(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
        }
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
        transition: 'border-color 0.2s',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontWeight: 400
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: 600,
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        color: 'var(--color-text-secondary)'
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = primaryColor;
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = '#e5e7eb';
    };

    const valueSummaryStyle = {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontWeight: 400
    };

    const renderThresholdSummary = (t, type) => {
        if (type === 'balance') {
            return (
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600 }}>
                    <span style={{ color: greyColor }}>C: <span style={{ ...valueSummaryStyle, color: colors.critical }}>{t.critical || '-'}</span></span>
                    <span style={{ color: greyColor }}>W: <span style={{ ...valueSummaryStyle, color: colors.warning }}>{t.warning || '-'}</span></span>
                    <span style={{ color: greyColor }}>H: <span style={{ ...valueSummaryStyle, color: colors.success }}>{t.high || '-'}</span></span>
                </div>
            );
        }
        return (
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600 }}>
                <span style={{ color: greyColor }}>C: <span style={{ ...valueSummaryStyle, color: colors.critical }}>{t.criticalAbove ? `${t.criticalAbove}%` : '-'}</span></span>
                <span style={{ color: greyColor }}>W: <span style={{ ...valueSummaryStyle, color: colors.warning }}>{t.warningAbove ? `${t.warningAbove}%` : '-'}</span></span>
                <span style={{ color: greyColor }}>G: <span style={{ ...valueSummaryStyle, color: colors.success }}>{t.goodBelow ? `${t.goodBelow}%` : '-'}</span></span>
            </div>
        );
    };

    const renderToggleHeader = (threshold, type) => (
        <div 
            onClick={() => toggleExpand(threshold.id)}
            style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px 12px',
                margin: '0 -12px',
                borderRadius: '6px',
                transition: 'background-color 0.2s',
                backgroundColor: expandedSections.has(threshold.id) ? 'var(--color-bg-subtle)' : 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = expandedSections.has(threshold.id) ? 'var(--color-bg-subtle)' : 'transparent'}
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
                    {type === 'balance' ? <Coins size={18} /> : <Percent size={18} />}
                </div>
                <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)', margin: 0 }}>
                        {threshold.title}
                    </h3>
                </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {renderThresholdSummary(threshold, type)}
                <div 
                    style={{ 
                        color: 'var(--color-text-tertiary)', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                        transform: expandedSections.has(threshold.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    <ChevronDown size={18} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflowY: 'auto' }}>
            <div className="dashboard-container" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                
                <div style={{ flex: 1 }}>
                    {/* Header Section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                                Threshold Configuration
                            </h1>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                Manage balance and financial rate thresholds for system alerts
                            </p>
                        </div>
                        <button 
                            className="btn btn-primary"
                            style={{ 
                                height: '36px', 
                                padding: '0 20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                backgroundColor: primaryColor,
                                border: 'none',
                                color: 'white',
                                borderRadius: '6px',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            <Save size={18} />
                            Save Configuration
                        </button>
                    </div>

                    {/* Balance Thresholds Section */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', position: 'relative' }}>
                            <h2 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
                                Balance Thresholds
                            </h2>
                            <div 
                                style={{ color: primaryColor, cursor: 'help', display: 'flex' }}
                                onMouseEnter={() => setShowInfoPopover(true)}
                                onMouseLeave={() => setShowInfoPopover(false)}
                            >
                                <Info size={14} />
                            </div>
                            
                            {/* Info Popover */}
                            {showInfoPopover && (
                                <div style={{ 
                                    position: 'absolute',
                                    top: '24px',
                                    left: '120px',
                                    width: '280px',
                                    padding: '12px',
                                    backgroundColor: 'white',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    zIndex: 10,
                                    fontSize: '12px',
                                    lineHeight: '1.5',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    <div style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Threshold Definitions</div>
                                    Configure balance thresholds for each currency. 
                                    <div style={{ marginTop: '4px' }}>
                                        <span style={{ color: colors.critical, fontWeight: 600 }}>Critical</span> = Red alert <br/>
                                        <span style={{ color: colors.warning, fontWeight: 600 }}>Warning</span> = Orange alert <br/>
                                        <span style={{ color: colors.success, fontWeight: 600 }}>High Balance</span> = Idle cash detection
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {balanceThresholds.map((t) => (
                                <div key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    {renderToggleHeader(t, 'balance')}
                                    
                                    {expandedSections.has(t.id) && (
                                        <div style={{ 
                                            padding: '0 12px 24px 12px',
                                        }}>
                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: '1fr 1fr 1fr', 
                                                gap: '20px',
                                                padding: '20px 0',
                                            }}>
                                                <div>
                                                    <label style={labelStyle}>Critical Level (Red Alert)</label>
                                                    <input 
                                                        style={{ ...inputStyle, color: colors.critical }}
                                                        placeholder="Enter amount"
                                                        value={t.critical}
                                                        onChange={(e) => handleInputChange(t.id, 'critical', e.target.value, 'balance')}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Warning Level (Orange Alert)</label>
                                                    <input 
                                                        style={{ ...inputStyle, color: colors.warning }}
                                                        placeholder="Enter amount"
                                                        value={t.warning}
                                                        onChange={(e) => handleInputChange(t.id, 'warning', e.target.value, 'balance')}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>High Balance Level (Idle Cash)</label>
                                                    <input 
                                                        style={{ ...inputStyle, color: colors.success }}
                                                        placeholder="Enter amount"
                                                        value={t.high}
                                                        onChange={(e) => handleInputChange(t.id, 'high', e.target.value, 'balance')}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rates & Financial Section */}
                    <div>
                        <h2 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
                            Rates & Financial
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {financialThresholds.map((t) => (
                                <div key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    {renderToggleHeader(t, 'financial')}
                                    
                                    {expandedSections.has(t.id) && (
                                        <div style={{ 
                                            padding: '0 12px 24px 12px',
                                        }}>
                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: '1fr 1fr 1fr', 
                                                gap: '20px',
                                                padding: '20px 0',
                                            }}>
                                                <div>
                                                    <label style={labelStyle}>Critical Level (Red) - Above</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <input 
                                                            style={{ ...inputStyle, color: colors.critical }}
                                                            placeholder="0.00"
                                                            value={t.criticalAbove}
                                                            onChange={(e) => handleInputChange(t.id, 'criticalAbove', e.target.value, 'financial')}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                        />
                                                        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: greyColor, fontFamily: 'ui-monospace, monospace' }}>%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Warning Level (Orange) - Above</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <input 
                                                            style={{ ...inputStyle, color: colors.warning }}
                                                            placeholder="0.00"
                                                            value={t.warningAbove}
                                                            onChange={(e) => handleInputChange(t.id, 'warningAbove', e.target.value, 'financial')}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                        />
                                                        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: greyColor, fontFamily: 'ui-monospace, monospace' }}>%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Good Level (Green) - Below</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <input 
                                                            style={{ ...inputStyle, color: colors.success }}
                                                            placeholder="0.00"
                                                            value={t.goodBelow}
                                                            onChange={(e) => handleInputChange(t.id, 'goodBelow', e.target.value, 'financial')}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                        />
                                                        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: greyColor, fontFamily: 'ui-monospace, monospace' }}>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thresholds;
