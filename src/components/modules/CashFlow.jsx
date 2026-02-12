import React, { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    LineChart,
    Activity,
    Globe,
    Banknote
} from 'lucide-react';

const CashFlow = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('cash-flow');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'entity-overview', label: 'Entity Overview', icon: Building2 },
        { id: 'investment-profile', label: 'Investment Profile', icon: LineChart },
        { id: 'awplr-rate', label: 'AWPLR Rate', icon: Activity },
        { id: 'forex-rates', label: 'Forex Rates', icon: Globe },
        { id: 'cash-flow', label: 'Cash Flow', icon: Banknote },
    ];

    const handleTabClick = (id) => {
        if (id !== 'cash-flow') {
            // Navigate back to Dashboard for other tabs
            // We can optionally pass the target section ID if the Dashboard supports deep linking/scrolling on mount
            onNavigate('Dashboard');
        }
    };

    return (
        <div className="dashboard-main-wrapper">
            {/* Tabs Wrapper - Intact from Dashboard style */}
            <div className="dashboard-tabs-wrapper">
                <div className="dashboard-tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {Icon && <Icon size={14} />}
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="dashboard-container">
                {/* Empty Content for now */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--color-text-tertiary)'
                }}>
                    <Banknote size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Cash Flow Module</h2>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>Content coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default CashFlow;
