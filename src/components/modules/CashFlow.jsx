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
    Settings,
    Eye,
    EyeOff,
    RotateCcw,
    ChevronDown
} from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
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

import bankLogoSc from '../../assets/bank-icons/scbl.png';
import bankLogoNtb from '../../assets/bank-icons/ntb.png';
import bankLogoCiti from '../../assets/bank-icons/citi.png';
import bankLogoHnb from '../../assets/bank-icons/hnb.png';
import bankLogoBoc from '../../assets/bank-icons/bocc.png';
import bankLogoCom from '../../assets/bank-icons/comb.png';
import bankLogoDeut from '../../assets/bank-icons/deut.png';
import bankLogoSamp from '../../assets/bank-icons/sampath.png';
import bankLogoNdb from '../../assets/bank-icons/ndb.png';
import bankLogoPb from '../../assets/bank-icons/pb.png';
import bankLogoDfcc from '../../assets/bank-icons/dfcc.png';

const bankLogos = {
    'Standard Chartered': bankLogoSc,
    'Nations Trust Bank': bankLogoNtb,
    'Citi Bank': bankLogoCiti,
    'Hatton National Bank': bankLogoHnb,
    'Bank of China': bankLogoBoc,
    'Commercial Bank': bankLogoCom,
    'Deutsche Bank': bankLogoDeut,
    'Sampath Bank': bankLogoSamp,
    'NDB Bank': bankLogoNdb,
    "People's Bank": bankLogoPb,
    'DFCC Bank': bankLogoDfcc
};

const LogoPlaceholder = ({ name, color, size = 20, src }) => {
    if (src) {
        return (
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '4px',
                    backgroundColor: 'white', // Ensure white background for logos
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.05)',
                    flexShrink: 0,
                    overflow: 'hidden'
                }}
            >
                <img
                    src={src}
                    alt={name}
                    style={{
                        width: '80%', // Slightly smaller to fit nicely
                        height: '80%',
                        objectFit: 'contain'
                    }}
                />
            </div>
        );
    }
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '4px',
                backgroundColor: color || '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: size > 20 ? '10px' : '9px',
                fontWeight: 600,
                color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                border: '1px solid rgba(0,0,0,0.05)',
                flexShrink: 0
            }}
        >
            {name ? name.charAt(0) : 'E'}
        </div>
    );
};

const CashFlow = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('cash-flow');
    const [selectedCompany, setSelectedCompany] = useState('All Companies');
    const [selectedBank, setSelectedBank] = useState('All Banks');
    const [selectedType, setSelectedType] = useState('All Types');

    const COLUMN_DEFS = [
        { id: 'company', label: 'COMPANY' },
        { id: 'bank', label: 'BANK' },
        { id: 'type', label: 'TYPE' },
        { id: 'odLimit', label: 'OD LIMIT' },
        { id: 'accName', label: 'ACC. NAME' },
        { id: 'accNo', label: 'ACC. NO.' },
        { id: 'currency', label: 'CURRENCY' },
        { id: 'balance', label: 'BALANCE' },
        { id: 'lkrEquivalent', label: 'LKR EQUIVALENT' },
        { id: 'prevDay', label: 'PREV. DAY BALANCE' },
        { id: 'prevMonth', label: 'PREV. MONTH CLOSING' },
        { id: 'changeDay', label: 'CHANGE (prev. day)' },
        { id: 'changeMonth', label: 'CHANGE (prev. month)' },
    ];

    const [visibleColumns, setVisibleColumns] = useState(new Set([
        'company', 'bank', 'type', 'odLimit', 'accName', 'accNo',
        'balance', 'prevDay', 'prevMonth', 'changeDay', 'changeMonth'
    ])); // currency and lkrEquivalent are excluded by default
    const [isColumnPopoverOpen, setIsColumnPopoverOpen] = useState(false);

    const toggleColumnVisibility = (columnId) => {
        setVisibleColumns(prev => {
            const newSet = new Set(prev);
            if (newSet.has(columnId)) {
                newSet.delete(columnId);
            } else {
                newSet.add(columnId);
            }
            return newSet;
        });
    };

    const formatValue = (val) => {
        if (!val || val === 'N/A') return val;
        // Match optional sign, 3-letter currency code, and the rest
        const match = val.match(/^([+-]?)([A-Z]{3})\s(.*)$/);
        if (!match) return val;
        const [_, sign, code, amount] = match;
        return (
            <>
                {sign && <span>{sign}</span>}
                <span style={{ color: '#9ca3af', fontWeight: 400 }}>{code}</span>
                <span> {amount}</span>
            </>
        );
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'entity-overview', label: 'Entity Overview', icon: Building2 },
        { id: 'investment-profile', label: 'Investment Profile', icon: LineChart },
        { id: 'awplr-rate', label: 'AWPLR Rate', icon: Activity },
        { id: 'forex-rates', label: 'Forex Rates', icon: Globe },
        { id: 'cash-flow', label: 'Cash Flow', icon: Banknote },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
        if (id !== 'cash-flow') {
            if (onNavigate) {
                setTimeout(() => onNavigate('Dashboard'), 0);
            }
        }
    };

    // Mock Data
    const companies = ['All Companies', 'Lion Brewery Sri Lanka', 'Lion Singapore', 'Luxury Brands', 'New Company 1'];
    const banks = ['All Banks', 'Bank of China', 'Citi Bank', 'Commercial Bank', 'People\'s Bank'];
    const types = ['All Types', 'SA', 'CA', 'MMS'];

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
                ticks: { font: { size: 10 }, callback: (value) => `LKR ${value}M` }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const accountData = [
        { company: 'Luxury Brands', companyColor: '#fef2f2', bank: 'Commercial Bank', bankColor: '#eff6ff', accountType: 'CA', odLimit: 'LKR 100.00M', name: 'General Account', number: '1020304050', currency: 'EUR', balance: 'EUR 4.00M', lkr: 'LKR 1,200.00M', prevDay: 'LKR 1,150.00M', prev: 'LKR 0.00M', changeDay: '+LKR 50.00M', changeDayType: 'positive', changeMonth: '+LKR 1,200.00M', changeMonthType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', companyColor: '#f0fdf4', bank: 'Bank of China', bankColor: '#fff7ed', accountType: 'SA', odLimit: 'N/A', name: 'General Account', number: '9988776655', currency: 'LKR', balance: 'LKR 500.00M', lkr: 'LKR 500.00M', prevDay: 'LKR 480.00M', prev: 'LKR 0.00M', changeDay: '+LKR 20.00M', changeDayType: 'positive', changeMonth: '+LKR 500.00M', changeMonthType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', companyColor: '#f0fdf4', bank: 'Bank of China', bankColor: '#fff7ed', accountType: 'CA', odLimit: 'LKR 50.00M', name: 'General Account', number: '8877665544', currency: 'LKR', balance: 'LKR 284.12M', lkr: 'LKR 284.12M', prevDay: 'LKR 290.00M', prev: 'LKR 149.80M', changeDay: '-LKR 5.88M', changeDayType: 'negative', changeMonth: '+LKR 134.33M', changeMonthType: 'positive' },
        { company: 'Luxury Brands', companyColor: '#fef2f2', bank: 'People\'s Bank', bankColor: '#faf5ff', accountType: 'MMS', odLimit: 'N/A', name: 'General Account', number: '7766554433', currency: 'EUR', balance: 'EUR 0.80M', lkr: 'LKR 240.00M', prevDay: 'LKR 235.00M', prev: 'LKR 75.00M', changeDay: '+LKR 5.00M', changeDayType: 'positive', changeMonth: '+LKR 165.00M', changeMonthType: 'positive' },
        { company: 'Lion Brewery Sri Lanka', companyColor: '#f0fdf4', bank: 'Commercial Bank', bankColor: '#eff6ff', accountType: 'CA', odLimit: 'LKR 25.00M', name: 'General Account', number: '6655443322', currency: 'LKR', balance: 'LKR 85.00M', lkr: 'LKR 85.00M', prevDay: 'LKR 85.00M', prev: 'LKR 85.00M', changeDay: 'LKR 0.00M', changeDayType: 'neutral', changeMonth: 'LKR 0.00M', changeMonthType: 'neutral' },
        { company: 'Lion Brewery Sri Lanka', companyColor: '#f0fdf4', bank: 'Citi Bank', bankColor: '#f0f9ff', accountType: 'SA', odLimit: 'N/A', name: 'General Account', number: '5544332211', currency: 'LKR', balance: 'LKR 80.00M', lkr: 'LKR 80.00M', prevDay: 'LKR 80.00M', prev: 'LKR 80.00M', changeDay: 'LKR 0.00M', changeDayType: 'neutral', changeMonth: 'LKR 0.00M', changeMonthType: 'neutral' },
        { company: 'New Company 1', companyColor: '#f5f3ff', bank: 'People\'s Bank', bankColor: '#faf5ff', accountType: 'SA', odLimit: 'N/A', name: 'General Account', number: '4433221100', currency: 'LKR', balance: 'LKR 7.50M', lkr: 'LKR 7.50M', prevDay: 'LKR 7.50M', prev: 'LKR 7.50M', changeDay: 'LKR 0.00M', changeDayType: 'neutral', changeMonth: 'LKR 0.00M', changeMonthType: 'neutral' },
        { company: 'Lion Brewery Sri Lanka', companyColor: '#f0fdf4', bank: 'Bank of China', bankColor: '#fff7ed', accountType: 'CA', odLimit: 'LKR 10.00M', name: 'General Account', number: '3322110099', currency: 'LKR', balance: 'LKR 4.50M', lkr: 'LKR 4.50M', prevDay: 'LKR 4.00M', prev: 'LKR 0.00M', changeDay: '+LKR 0.50M', changeDayType: 'positive', changeMonth: '+LKR 4.50M', changeMonthType: 'positive' },
        { company: 'Lion Singapore', companyColor: '#fff7ed', bank: 'Commercial Bank', bankColor: '#eff6ff', accountType: 'MMS', odLimit: 'N/A', name: 'General Account', number: '2211009988', currency: 'LKR', balance: 'LKR 0.25M', lkr: 'LKR 0.25M', prevDay: 'LKR 0.30M', prev: 'LKR 2.00M', changeDay: '-LKR 0.05M', changeDayType: 'negative', changeMonth: '-LKR 1.75M', changeMonthType: 'negative' },
    ];

    return (
        <div className="dashboard-main-wrapper">
            {/* Tabs Wrapper */}
            <div className="dashboard-tabs-wrapper">
                <div className="dashboard-tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <React.Fragment key={tab.id}>
                                {tab.id === 'cash-flow' && <div className="vertical-divider" style={{ margin: '0 8px', alignSelf: 'center' }} />}
                                <button
                                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => handleTabClick(tab.id)}
                                >
                                    {Icon && <Icon size={14} />}
                                    {tab.label}
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="dashboard-container">

                {/* Header, Summary & Chart Section */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '24px', marginBottom: '24px' }}>
                        {/* Total Cash Balance Card */}
                        <div className="widget-card">
                            <div className="widget-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <h3 className="widget-title" style={{ margin: 0 }}>TOTAL CASH BALANCE</h3>
                                </div>
                            </div>

                            <div style={{ marginTop: '0px' }}>
                                <p className="widget-label">As of February 12, 2026</p>
                                <div className="widget-value-row" style={{ margin: '8px 0' }}>
                                    <span className="widget-value text-black">2,407.79M</span>
                                    <span className="widget-label" style={{ marginBottom: '4px' }}>LKR</span>
                                </div>

                                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '14px', marginTop: '14px' }}>
                                    <p className="widget-label" style={{ marginBottom: '4px' }}>Daily Movement (vs Yesterday)</p>
                                    <div className="widget-value-row">
                                        <span className="text-green" style={{ fontSize: '14px', fontWeight: 500 }}>~945.00M</span>
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
                                    <h3 className="widget-title" style={{ margin: 0 }}>PREVIOUS MONTH CLOSING</h3>
                                </div>
                            </div>

                            <div style={{ marginTop: '8px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontWeight: '400', color: '#111827' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Closing Balance (Jan 2026)</td>
                                            <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>LKR 405.72M</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Current Balance</td>
                                            <td className="text-black" style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>LKR 2,407.79M</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>Net Monthly Cash Position</td>
                                            <td style={{ padding: '6px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                    <span className="text-green">+LKR 2,002.08M</span>
                                                    <span className="text-green" style={{ fontSize: '11px' }}>+493.46%</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '6px 0' }}>Daily Variance</td>
                                            <td style={{ padding: '6px 0', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                    <span className="text-green">+LKR 945.00M</span>
                                                    <span className="text-green" style={{ fontSize: '11px' }}>+64.60%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 30-Day Trend Chart */}
                    <div className="widget-card" style={{ marginBottom: 0, padding: '24px' }}>
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
                </div>

                {/* Detailed Account Breakdown */}
                <div id="account-breakdown" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Detailed Account Breakdown</h2>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>All accounts with currency balances and LKR equivalents</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="filter-dropdown-container">
                                <Filter size={14} className="text-gray" />
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    className="filter-select"
                                >
                                    {banks.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <ChevronDown size={14} className="text-gray select-arrow" />
                            </div>
                            <div className="filter-dropdown-container">
                                <Filter size={14} className="text-gray" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="filter-select"
                                >
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <ChevronDown size={14} className="text-gray select-arrow" />
                            </div>

                            {/* Column Visibility Popover */}
                            <Popover.Root open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
                                <Popover.Trigger asChild>
                                    <button
                                        className="filter-dropdown-container"
                                        title="View options"
                                        style={{ height: '36px', width: '36px', padding: 0, justifyContent: 'center', zIndex: 20, position: 'relative', cursor: 'pointer' }}
                                    >
                                        {visibleColumns.size === 0 ? <EyeOff size={16} className="text-gray" /> : <Eye size={16} className="text-gray" />}
                                    </button>
                                </Popover.Trigger>
                                <Popover.Portal>
                                    <Popover.Content className="popover-content" align="end" sideOffset={5} style={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                        width: '280px',
                                        zIndex: 2000,
                                        border: '1px solid var(--color-border)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 0
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px 16px 12px',
                                            borderBottom: '1px solid var(--color-border)'
                                        }}>
                                            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-main)' }}>View options</span>
                                            <button
                                                onClick={() => setVisibleColumns(new Set(COLUMN_DEFS.map(c => c.id).filter(id => id !== 'currency' && id !== 'lkrEquivalent')))}
                                                title="Reset to Default"
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--color-text-secondary)',
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '4px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <RotateCcw size={14} />
                                            </button>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            maxHeight: '300px',
                                            overflowY: 'auto',
                                            padding: '0'
                                        }}>
                                            {COLUMN_DEFS.map((col, index) => {
                                                const isVisible = visibleColumns.has(col.id);
                                                const isLast = index === COLUMN_DEFS.length - 1;
                                                return (
                                                    <label key={col.id} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '10px 16px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        transition: 'background-color 0.2s',
                                                        borderBottom: isLast ? 'none' : '1px solid var(--color-border)'
                                                    }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <span style={{
                                                                color: isVisible ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}>
                                                                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                                            </span>
                                                            <span style={{
                                                                color: isVisible ? 'var(--color-text-main)' : 'var(--color-text-secondary)'
                                                            }}>{col.label}</span>
                                                        </div>

                                                        {/* Custom Toggle Switch */}
                                                        <div style={{ position: 'relative', width: '32px', height: '18px' }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isVisible}
                                                                onChange={() => toggleColumnVisibility(col.id)}
                                                                style={{
                                                                    opacity: 0,
                                                                    width: 0,
                                                                    height: 0
                                                                }}
                                                            />
                                                            <div style={{
                                                                position: 'absolute',
                                                                cursor: 'pointer',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                backgroundColor: isVisible ? 'var(--color-primary)' : '#ccc',
                                                                transition: '.4s',
                                                                borderRadius: '34px'
                                                            }}>
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    content: '',
                                                                    height: '14px',
                                                                    width: '14px',
                                                                    left: isVisible ? '16px' : '2px',
                                                                    bottom: '2px',
                                                                    backgroundColor: 'white',
                                                                    transition: '.4s',
                                                                    borderRadius: '50%'
                                                                }}></div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <Popover.Arrow className="popover-arrow" style={{ fill: 'white' }} />
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>
                        </div>
                    </div>

                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
                        <table className="data-table min-w-800">
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    {visibleColumns.has('company') && <th style={{ minWidth: '180px', paddingLeft: '16px' }}>COMPANY</th>}
                                    {visibleColumns.has('bank') && <th style={{ minWidth: '120px', paddingLeft: '20px', paddingRight: '20px' }}>BANK</th>}
                                    {visibleColumns.has('type') && <th style={{ minWidth: '80px', paddingLeft: '20px', paddingRight: '20px' }}>TYPE</th>}
                                    {visibleColumns.has('odLimit') && <th style={{ textAlign: 'right', minWidth: '100px', paddingLeft: '20px', paddingRight: '20px' }}>OD LIMIT</th>}
                                    {visibleColumns.has('accName') && <th style={{ minWidth: '140px', paddingLeft: '20px', paddingRight: '20px' }}>ACC. NAME</th>}
                                    {visibleColumns.has('accNo') && <th style={{ minWidth: '120px', paddingLeft: '20px', paddingRight: '20px' }}>ACC. NO.</th>}
                                    {visibleColumns.has('currency') && <th style={{ minWidth: '80px', paddingLeft: '20px', paddingRight: '20px' }}>CURRENCY</th>}
                                    {visibleColumns.has('balance') && <th style={{ textAlign: 'right', minWidth: '120px', paddingLeft: '20px', paddingRight: '20px' }}>BALANCE</th>}
                                    {visibleColumns.has('lkrEquivalent') && <th style={{ textAlign: 'right', minWidth: '140px', paddingLeft: '20px', paddingRight: '20px' }}>LKR EQUIVALENT</th>}
                                    {visibleColumns.has('prevDay') && <th style={{ textAlign: 'right', minWidth: '140px', paddingLeft: '20px', paddingRight: '20px' }}>PREV. DAY BALANCE</th>}
                                    {visibleColumns.has('prevMonth') && <th style={{ textAlign: 'right', minWidth: '160px', paddingLeft: '20px', paddingRight: '20px' }}>PREV. MONTH CLOSING</th>}
                                    {visibleColumns.has('changeDay') && <th style={{ textAlign: 'right', minWidth: '130px', paddingLeft: '20px', paddingRight: '20px' }}>CHANGE (prev. day)</th>}
                                    {visibleColumns.has('changeMonth') && <th style={{ textAlign: 'right', paddingRight: '24px', minWidth: '150px', paddingLeft: '20px' }}>CHANGE (prev. month)</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {[...accountData]
                                    .filter(row => {
                                        const companyMatch = selectedCompany === 'All Companies' || row.company === selectedCompany;
                                        const bankMatch = selectedBank === 'All Banks' || row.bank === selectedBank;
                                        const typeMatch = selectedType === 'All Types' || row.accountType === selectedType;
                                        return companyMatch && bankMatch && typeMatch;
                                    })
                                    .sort((a, b) => {
                                        if (a.company !== b.company) return a.company.localeCompare(b.company);
                                        if (a.bank !== b.bank) return a.bank.localeCompare(b.bank);
                                        return (a.accountType || '').localeCompare(b.accountType || '');
                                    })
                                    .map((row, index) => (
                                        <tr key={index} className="hover-row">
                                            {visibleColumns.has('company') && (
                                                <td style={{ maxWidth: 'none', overflow: 'visible', textOverflow: 'clip', paddingLeft: '16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <LogoPlaceholder name={row.company} color={row.companyColor} />
                                                        <span style={{ fontWeight: 500, color: '#000000', whiteSpace: 'nowrap' }}>{row.company}</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.has('bank') && (
                                                <td style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <LogoPlaceholder name={row.bank} color={row.bankColor} src={bankLogos[row.bank]} />
                                                        <span style={{ color: '#000000' }}>{row.bank}</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.has('type') && <td style={{ color: '#000000', paddingLeft: '20px', paddingRight: '20px' }}>{row.accountType}</td>}
                                            {visibleColumns.has('odLimit') && (
                                                <td style={{ textAlign: 'right', fontFamily: 'monospace', color: row.odLimit === 'N/A' ? '#9ca3af' : '#000000', paddingLeft: '20px', paddingRight: '20px' }}>
                                                    {formatValue(row.odLimit)}
                                                </td>
                                            )}
                                            {visibleColumns.has('accName') && <td style={{ color: '#000000', paddingLeft: '20px', paddingRight: '20px' }}>{row.name}</td>}
                                            {visibleColumns.has('accNo') && <td style={{ textAlign: 'left', fontFamily: 'monospace', color: '#000000', fontSize: '12px', paddingLeft: '20px', paddingRight: '20px' }}>{row.number}</td>}
                                            {visibleColumns.has('currency') && <td style={{ paddingLeft: '20px', paddingRight: '20px' }}><span className="currency-badge" style={{ color: '#000000' }}>{row.currency}</span></td>}
                                            {visibleColumns.has('balance') && <td style={{ textAlign: 'right', fontWeight: 500, fontFamily: 'monospace', color: '#000000', paddingLeft: '20px', paddingRight: '20px' }}>{formatValue(row.balance)}</td>}
                                            {visibleColumns.has('lkrEquivalent') && <td style={{ textAlign: 'right', fontWeight: 500, color: '#000000', fontFamily: 'monospace', paddingLeft: '20px', paddingRight: '20px' }}>{row.lkr.replace('LKR ', '')}</td>}
                                            {visibleColumns.has('prevDay') && <td style={{ textAlign: 'right', color: '#000000', fontFamily: 'monospace', paddingLeft: '20px', paddingRight: '20px' }}>{formatValue(row.prevDay)}</td>}
                                            {visibleColumns.has('prevMonth') && <td style={{ textAlign: 'right', color: '#000000', fontFamily: 'monospace', paddingLeft: '20px', paddingRight: '20px' }}>{formatValue(row.prev)}</td>}
                                            {visibleColumns.has('changeDay') && (
                                                <td style={{ textAlign: 'right', paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <span className={row.changeDayType === 'positive' ? 'text-green' : row.changeDayType === 'negative' ? 'text-red' : ''} style={{ color: row.changeDayType === 'neutral' ? '#000000' : undefined, fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', fontFamily: 'monospace' }}>
                                                        {row.changeDay.replace(/[A-Z]{3}\s/, '')}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.has('changeMonth') && (
                                                <td style={{ textAlign: 'right', paddingRight: '20px', paddingLeft: '20px' }}>
                                                    <span className={row.changeMonthType === 'positive' ? 'text-green' : row.changeMonthType === 'negative' ? 'text-red' : ''} style={{ color: row.changeMonthType === 'neutral' ? '#000000' : undefined, fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', fontFamily: 'monospace' }}>
                                                        {row.changeMonth.replace(/[A-Z]{3}\s/, '')}
                                                    </span>
                                                </td>
                                            )}
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
