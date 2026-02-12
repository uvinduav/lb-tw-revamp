import React, { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    LineChart,
    Activity,
    Globe,
    Banknote,
    Filter,
    TrendingUp,
    TrendingDown,
    Calendar,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Info,
    RotateCw,
    Download,
    ChevronDown
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CashFlow = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('cash-flow');
    const [selectedCompany, setSelectedCompany] = useState('All Companies');

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
            if (onNavigate) {
                setTimeout(() => onNavigate('Dashboard'), 0);
            }
        }
    };

    // Mock Data
    const companies = ['All Companies', 'Lion Brewery Sri Lanka', 'Lion Singapore', 'Luxury Brands', 'New Company 1'];

    const trendData = {
        labels: Array.from({ length: 30 }, (_, i) => `Jan ${i + 14}`),
        datasets: [
            {
                label: 'Cash Balance',
                data: [100, 102, 105, 103, 108, 110, 115, 120, 118, 125, 130, 210, 190, 140, 145, 150, 155, 160, 165, 170, 168, 172, 175, 180, 200, 220, 230, 250, 280, 2407.79],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#111827',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: (context) => `LKR ${context.raw} Mns`
                }
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 }, maxTicksLimit: 10 }
            },
            y: {
                grid: { color: '#f3f4f6' },
                ticks: { font: { size: 10 }, callback: (value) => `Rs ${value}M` }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const accountData = [
        { company: 'Luxury Brands', bank: 'Commercial Bank', name: 'PT01', number: '2845', currency: 'EUR', balance: '€4.00M', lkr: 'Rs 1,200.00M', prev: 'Rs 0.00M', change: '+Rs 1,200.00M', changeType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', bank: 'Bank of China', name: 'General Account', number: '30345', currency: 'LKR', balance: 'Rs 500.00M', lkr: 'Rs 500.00M', prev: 'Rs 0.00M', change: '+Rs 500.00M', changeType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', bank: 'Bank of China', name: 'PT01', number: '1421010001', currency: 'LKR', balance: 'Rs 284.12M', lkr: 'Rs 284.12M', prev: 'Rs 149.80M', change: '+Rs 134.33M', changeType: 'positive' },
        { company: 'Luxury Brands', bank: 'People\'s Bank', name: 'General Account', number: '00001', currency: 'EUR', balance: '€0.80M', lkr: 'Rs 240.00M', prev: 'Rs 75.00M', change: '+Rs 165.00M', changeType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', bank: 'Commercial Bank', name: 'PT01', number: 'New01', currency: 'LKR', balance: 'Rs 85.00M', lkr: 'Rs 85.00M', prev: 'Rs 85.00M', change: '+Rs 0.00M', changeType: 'neutral' },
        { company: 'Lion Brewery Sri Lanka', bank: 'Citi Bank', name: 'PT01', number: '0039545000', currency: 'LKR', balance: 'Rs 80.00M', lkr: 'Rs 80.00M', prev: 'Rs 80.00M', change: '+Rs 0.00M', changeType: 'neutral' },
        { company: 'New Company 1', bank: 'People\'s Bank', name: 'urgent,PT01', number: 'Newusd01', currency: 'LKR', balance: 'Rs 7.50M', lkr: 'Rs 7.50M', prev: 'Rs 7.50M', change: '+Rs 0.00M', changeType: 'neutral' },
        { company: 'Lion Brewery Sri Lanka', bank: 'Bank of China', name: 'urgent,PT01', number: '0039545007', currency: 'LKR', balance: 'Rs 4.50M', lkr: 'Rs 4.50M', prev: 'Rs 0.00M', change: '+Rs 4.50M', changeType: 'positive' },
        { company: 'Lion Singapore', bank: 'Commercial Bank', name: 'PT01', number: '0909', currency: 'LKR', balance: 'Rs 0.25M', lkr: 'Rs 0.25M', prev: 'Rs 2.00M', change: '-Rs 1.75M', changeType: 'negative' },
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Tabs Wrapper */}
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

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>Daily Cash Position</h1>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Real-time account-level cash positions with daily tracking and variance analysis</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="filter-dropdown-container">
                            <Filter size={14} className="text-gray" />
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="filter-select"
                            >
                                {companies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown size={14} className="text-gray select-arrow" />
                        </div>
                        <button className="download-btn" title="Download Report">
                            <Download size={14} />
                        </button>
                    </div>
                </div>

                {/* Summary Cards Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr) 1fr', gap: '24px', marginBottom: '24px' }}>

                    {/* Total Cash Balance Card */}
                    <div className="widget-card">
                        <div className="widget-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Wallet size={14} className="text-gray" />
                                <h3 className="widget-title" style={{ margin: 0 }}>TOTAL CASH BALANCE</h3>
                            </div>
                            <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
                        </div>

                        <div style={{ marginTop: '0px' }}>
                            <p className="widget-label">As of February 12, 2026</p>
                            <div className="widget-value-row" style={{ margin: '8px 0' }}>
                                <span className="widget-value-xl text-green">2,407.79 Mns</span>
                                <span className="widget-label" style={{ marginBottom: '4px' }}>LKR</span>
                            </div>

                            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', marginTop: '12px' }}>
                                <p className="widget-label" style={{ marginBottom: '4px' }}>Daily Movement (vs Yesterday)</p>
                                <div className="widget-value-row">
                                    <span className="widget-value text-green" style={{ fontSize: '16px' }}>~945.00 Mns</span>
                                    <span className="widget-change text-green">+64.60%</span>
                                    <TrendingUp size={14} className="text-green" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Previous Month Closing Card */}
                    <div className="widget-card">
                        <div className="widget-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} className="text-gray" />
                                <h3 className="widget-title" style={{ margin: 0 }}>PREVIOUS MONTH CLOSING</h3>
                            </div>
                            <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
                        </div>

                        <div style={{ marginTop: '8px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontWeight: '400', color: '#111827' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Closing Balance (Jan 2026)</td>
                                        <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>Rs 405.72M</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Current Balance</td>
                                        <td className="text-green" style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>Rs 2,407.79M</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Month Change</td>
                                        <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                <span className="text-green">+Rs 2,002.08M</span>
                                                <span className="text-green" style={{ fontSize: '11px' }}>+493.46%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '6px 0' }}>Daily Variance</td>
                                        <td style={{ padding: '6px 0', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                <span className="text-green">+Rs 945.00M</span>
                                                <span className="text-green" style={{ fontSize: '11px' }}>+64.60%</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Small Insight Widgets Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="widget-card" style={{ flex: 1 }}>
                            <div className="widget-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <TrendingUp size={14} className="text-green" />
                                    <h3 className="widget-title" style={{ margin: 0 }}>MONTHLY GROWTH</h3>
                                </div>
                                <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <div className="widget-value-row">
                                    <span className="widget-value text-green">+493.46%</span>
                                </div>
                                <p className="widget-subtext">
                                    +Rs 2,002.08M this month
                                </p>
                            </div>
                        </div>

                        <div className="widget-card" style={{ flex: 1 }}>
                            <div className="widget-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Globe size={14} className="text-primary" />
                                    <h3 className="widget-title" style={{ margin: 0 }}>PORTFOLIO SCOPE</h3>
                                </div>
                                <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <div className="widget-value-row">
                                    <span className="widget-value">26 Accounts</span>
                                </div>
                                <p className="widget-subtext">
                                    Multi-currency (3 Currencies)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 30-Day Trend Chart */}
                <div className="widget-card" style={{ marginBottom: '24px', padding: '24px' }}>
                    <div className="widget-header" style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LineChart size={16} className="text-gray" />
                            <h3 className="widget-title" style={{ margin: 0 }}>30-DAY CASH POSITION TREND</h3>
                        </div>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Rolling 30-day view: Jan 14 - Feb 12, 2026</p>
                    </div>
                    <div style={{ height: '280px' }}>
                        <Line data={trendData} options={chartOptions} />
                    </div>
                </div>

                {/* Detailed Account Breakdown */}
                <div id="account-breakdown" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Detailed Account Breakdown</h2>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>All accounts with currency balances and LKR equivalents</p>
                    </div>

                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
                        <table className="data-table min-w-800">
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th style={{ paddingLeft: '24px' }}>COMPANY</th>
                                    <th>BANK</th>
                                    <th>ACCOUNT NAME</th>
                                    <th>ACCOUNT NUMBER</th>
                                    <th>CURRENCY</th>
                                    <th style={{ textAlign: 'right' }}>CURRENCY BALANCE</th>
                                    <th style={{ textAlign: 'right' }}>LKR EQUIVALENT</th>
                                    <th style={{ textAlign: 'right' }}>PREV MONTH CLOSING</th>
                                    <th style={{ textAlign: 'right', paddingRight: '24px' }}>CHANGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountData.map((row, index) => (
                                    <tr key={index} className="hover-row">
                                        <td style={{ paddingLeft: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.company.includes('Lion') ? '#10b981' : row.company.includes('Luxury') ? '#ef4444' : '#8b5cf6' }}></div>
                                                <span style={{ fontWeight: 500 }}>{row.company}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 600, color: '#9ca3af', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                    {row.bank.charAt(0)}
                                                </div>
                                                <span>{row.bank}</span>
                                            </div>
                                        </td>
                                        <td>{row.name}</td>
                                        <td style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '12px' }}>{row.number}</td>
                                        <td><span className="currency-badge">{row.currency}</span></td>
                                        <td style={{ textAlign: 'right', fontWeight: 500, fontFamily: 'monospace' }}>{row.balance}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 500, color: '#10b981', fontFamily: 'monospace' }}>{row.lkr}</td>
                                        <td style={{ textAlign: 'right', color: '#6b7280', fontFamily: 'monospace' }}>{row.prev}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <span className={row.changeType === 'positive' ? 'text-green' : row.changeType === 'negative' ? 'text-red' : 'text-gray'} style={{ fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                                                {row.changeType === 'positive' ? <TrendingUp size={12} /> : row.changeType === 'negative' ? <TrendingDown size={12} /> : null}
                                                {row.change}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default CashFlow;
