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
                className="rounded bg-white flex items-center justify-center border border-black/5 shrink-0 overflow-hidden"
                style={{ width: `${size}px`, height: `${size}px` }}
            >
                <img src={src} alt={name} className="w-4/5 h-4/5 object-contain" />
            </div>
        );
    }
    return (
        <div
            className="rounded flex items-center justify-center font-semibold border border-black/5 shrink-0"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color || '#f3f4f6',
                fontSize: size > 20 ? '10px' : '9px',
                color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
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
                <span className="text-gray-400 font-normal">{code}</span>
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
        <div className="h-full flex flex-col overflow-hidden bg-white">
            {/* Tabs Wrapper */}
            <div className="border-b border-border bg-white px-6 shrink-0">
                <div className="flex items-center gap-1 h-11">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <React.Fragment key={tab.id}>
                                {tab.id === 'cash-flow' && <div className="w-px h-4 bg-border mx-2 self-center" />}
                                <button
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap border-none cursor-pointer ${activeTab === tab.id ? 'bg-primary-action text-white' : 'bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-main'}`}
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

            <div className="flex-1 overflow-y-auto p-6">

                {/* Header, Summary & Chart Section */}
                <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 m-0 mb-1">Daily Cash Position</h1>
                            <p className="text-[13px] text-gray-500 m-0">Real-time account-level cash positions with daily tracking and variance analysis</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white border border-border rounded-md px-3 h-9 text-[13px] text-text-main">
                                <Filter size={14} className="text-gray-400" />
                                <select
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value)}
                                    className="appearance-none border-none bg-transparent text-[13px] outline-none cursor-pointer pr-5"
                                >
                                    {companies.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown size={14} className="text-gray-400 -ml-4 pointer-events-none" />
                            </div>
                            <button className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-white text-text-secondary hover:bg-bg-subtle cursor-pointer transition-colors" title="Download Report">
                                <Download size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: 'minmax(320px, 1fr) 2fr' }}>
                        {/* Total Cash Balance Card */}
                        <div className="bg-white border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">TOTAL CASH BALANCE</h3>
                                </div>
                            </div>

                            <div>
                                <p className="text-[11px] text-text-secondary m-0">As of February 12, 2026</p>
                                <div className="flex items-baseline gap-2 my-2">
                                    <span className="text-xl font-bold font-mono text-black">2,407.79M</span>
                                    <span className="text-[11px] text-text-secondary mb-1">LKR</span>
                                </div>

                                <div className="border-t border-gray-100 pt-3.5 mt-3.5">
                                    <p className="text-[11px] text-text-secondary mb-1">Daily Movement (vs Yesterday)</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-green-600 text-sm font-medium">~945.00M</span>
                                        <span className="text-green-600 text-xs font-medium">+64.60%</span>
                                        <TrendingUp size={14} className="text-green-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Previous Month Closing Card */}
                        <div className="bg-white border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">PREVIOUS MONTH CLOSING</h3>
                                </div>
                            </div>

                            <div className="mt-2">
                                <table className="w-full border-collapse text-[13px] font-normal text-gray-900">
                                    <tbody>
                                        <tr>
                                            <td className="py-1.5 border-b border-gray-100">Closing Balance (Jan 2026)</td>
                                            <td className="py-1.5 border-b border-gray-100 text-right">LKR 405.72M</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1.5 border-b border-gray-100">Current Balance</td>
                                            <td className="py-1.5 border-b border-gray-100 text-right text-black">LKR 2,407.79M</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1.5">Net Monthly Cash Position</td>
                                            <td className="py-1.5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-green-600">+LKR 2,002.08M</span>
                                                    <span className="text-green-600 text-[11px]">+493.46%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 30-Day Trend Chart */}
                    <div className="bg-white border border-border rounded-lg p-6 mb-0">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <LineChart size={16} className="text-gray-400" />
                                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">30-DAY CASH POSITION TREND</h3>
                            </div>
                            <p className="text-xs text-gray-500 m-0">Rolling 30-day view: Jan 14 - Feb 12, 2026</p>
                        </div>
                        <div className="h-[280px]">
                            <Line data={trendData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Detailed Account Breakdown */}
                <div id="account-breakdown" className="mt-8">
                    <div className="mb-4 pl-1 flex justify-between items-end">
                        <div>
                            <h2 className="text-lg font-semibold text-text-main mb-1">Detailed Account Breakdown</h2>
                            <p className="text-[13px] text-text-secondary">All accounts with currency balances and LKR equivalents</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 bg-white border border-border rounded-md px-3 h-9 text-[13px] text-text-main">
                                <Filter size={14} className="text-gray-400" />
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    className="appearance-none border-none bg-transparent text-[13px] outline-none cursor-pointer pr-5"
                                >
                                    {banks.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <ChevronDown size={14} className="text-gray-400 -ml-4 pointer-events-none" />
                            </div>
                            <div className="flex items-center gap-2 bg-white border border-border rounded-md px-3 h-9 text-[13px] text-text-main">
                                <Filter size={14} className="text-gray-400" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="appearance-none border-none bg-transparent text-[13px] outline-none cursor-pointer pr-5"
                                >
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <ChevronDown size={14} className="text-gray-400 -ml-4 pointer-events-none" />
                            </div>

                            {/* Column Visibility Popover */}
                            <Popover.Root open={isColumnPopoverOpen} onOpenChange={setIsColumnPopoverOpen}>
                                <Popover.Trigger asChild>
                                    <button
                                        className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-white text-text-secondary hover:bg-bg-subtle cursor-pointer relative z-20"
                                        title="View options"
                                    >
                                        {visibleColumns.size === 0 ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                                    </button>
                                </Popover.Trigger>
                                <Popover.Portal>
                                    <Popover.Content className="bg-white rounded-lg shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] w-[280px] z-[2000] border border-border overflow-hidden flex flex-col p-0" align="end" sideOffset={5}>
                                        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
                                            <span className="font-semibold text-sm text-text-main">View options</span>
                                            <button
                                                onClick={() => setVisibleColumns(new Set(COLUMN_DEFS.map(c => c.id).filter(id => id !== 'currency' && id !== 'lkrEquivalent')))}
                                                title="Reset to Default"
                                                className="bg-transparent border-none text-text-secondary cursor-pointer p-1 flex items-center justify-center rounded hover:bg-bg-secondary"
                                            >
                                                <RotateCcw size={14} />
                                            </button>
                                        </div>

                                        <div className="flex flex-col max-h-[300px] overflow-y-auto">
                                            {COLUMN_DEFS.map((col, index) => {
                                                const isVisible = visibleColumns.has(col.id);
                                                const isLast = index === COLUMN_DEFS.length - 1;
                                                return (
                                                    <label key={col.id} className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-[13px] transition-colors duration-200 hover:bg-bg-subtle ${!isLast ? 'border-b border-border' : ''}`}>
                                                        <div className="flex items-center gap-2.5">
                                                            <span className={`flex items-center ${isVisible ? 'text-primary' : 'text-text-tertiary'}`}>
                                                                {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                                            </span>
                                                            <span className={isVisible ? 'text-text-main' : 'text-text-secondary'}>{col.label}</span>
                                                        </div>

                                                        {/* Custom Toggle Switch */}
                                                        <div className="relative w-8 h-[18px]">
                                                            <input
                                                                type="checkbox"
                                                                checked={isVisible}
                                                                onChange={() => toggleColumnVisibility(col.id)}
                                                                className="opacity-0 w-0 h-0"
                                                            />
                                                            <div className={`absolute cursor-pointer inset-0 rounded-full transition-all duration-400 ${isVisible ? 'bg-primary' : 'bg-gray-300'}`}>
                                                                <div className={`absolute h-3.5 w-3.5 bottom-0.5 bg-white rounded-full transition-all duration-400 ${isVisible ? 'left-4' : 'left-0.5'}`}></div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <Popover.Arrow style={{ fill: 'white' }} />
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>
                        </div>
                    </div>

                    <div className="m-0 bg-white border-t border-border overflow-x-auto">
                        <table className="w-full border-collapse text-[13px] min-w-[800px]">
                            <thead className="sticky top-0 z-10">
                                <tr>
                                    {visibleColumns.has('company') && <th className="bg-[#fafafa] text-left pl-4 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '180px' }}>COMPANY</th>}
                                    {visibleColumns.has('bank') && <th className="bg-[#fafafa] text-left px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '120px' }}>BANK</th>}
                                    {visibleColumns.has('type') && <th className="bg-[#fafafa] text-left px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '80px' }}>TYPE</th>}
                                    {visibleColumns.has('odLimit') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '100px' }}>OD LIMIT</th>}
                                    {visibleColumns.has('accName') && <th className="bg-[#fafafa] text-left px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '140px' }}>ACC. NAME</th>}
                                    {visibleColumns.has('accNo') && <th className="bg-[#fafafa] text-left px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '120px' }}>ACC. NO.</th>}
                                    {visibleColumns.has('currency') && <th className="bg-[#fafafa] text-left px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '80px' }}>CURRENCY</th>}
                                    {visibleColumns.has('balance') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '120px' }}>BALANCE</th>}
                                    {visibleColumns.has('lkrEquivalent') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '140px' }}>LKR EQUIVALENT</th>}
                                    {visibleColumns.has('prevDay') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '140px' }}>PREV. DAY BALANCE</th>}
                                    {visibleColumns.has('prevMonth') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '160px' }}>PREV. MONTH CLOSING</th>}
                                    {visibleColumns.has('changeDay') && <th className="bg-[#fafafa] text-right px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '130px' }}>CHANGE (prev. day)</th>}
                                    {visibleColumns.has('changeMonth') && <th className="bg-[#fafafa] text-right pr-6 px-5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8" style={{ minWidth: '150px' }}>CHANGE (prev. month)</th>}
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
                                        <tr key={index} className="hover:bg-bg-subtle transition-colors duration-150">
                                            {visibleColumns.has('company') && (
                                                <td className="pl-4 px-2.5 py-1 border-b border-border">
                                                    <div className="flex items-center gap-2">
                                                        <LogoPlaceholder name={row.company} color={row.companyColor} />
                                                        <span className="font-medium text-black whitespace-nowrap">{row.company}</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.has('bank') && (
                                                <td className="px-5 py-1 border-b border-border">
                                                    <div className="flex items-center gap-2">
                                                        <LogoPlaceholder name={row.bank} color={row.bankColor} src={bankLogos[row.bank]} />
                                                        <span className="text-black">{row.bank}</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.has('type') && <td className="px-5 py-1 border-b border-border text-black">{row.accountType}</td>}
                                            {visibleColumns.has('odLimit') && (
                                                <td className={`px-5 py-1 border-b border-border text-right font-mono ${row.odLimit === 'N/A' ? 'text-gray-400' : 'text-black'}`}>
                                                    {formatValue(row.odLimit)}
                                                </td>
                                            )}
                                            {visibleColumns.has('accName') && <td className="px-5 py-1 border-b border-border text-black">{row.name}</td>}
                                            {visibleColumns.has('accNo') && <td className="px-5 py-1 border-b border-border text-left font-mono text-black text-xs">{row.number}</td>}
                                            {visibleColumns.has('currency') && <td className="px-5 py-1 border-b border-border"><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-600">{row.currency}</span></td>}
                                            {visibleColumns.has('balance') && <td className="px-5 py-1 border-b border-border text-right font-medium font-mono text-black">{formatValue(row.balance)}</td>}
                                            {visibleColumns.has('lkrEquivalent') && <td className="px-5 py-1 border-b border-border text-right font-medium text-black font-mono">{row.lkr.replace('LKR ', '')}</td>}
                                            {visibleColumns.has('prevDay') && <td className="px-5 py-1 border-b border-border text-right text-black font-mono">{formatValue(row.prevDay)}</td>}
                                            {visibleColumns.has('prevMonth') && <td className="px-5 py-1 border-b border-border text-right text-black font-mono">{formatValue(row.prev)}</td>}
                                            {visibleColumns.has('changeDay') && (
                                                <td className="px-5 py-1 border-b border-border text-right">
                                                    <span className={`flex items-center justify-end gap-1 text-xs font-medium font-mono ${row.changeDayType === 'positive' ? 'text-green-600' : row.changeDayType === 'negative' ? 'text-red-500' : 'text-black'}`}>
                                                        {row.changeDay.replace(/[A-Z]{3}\s/, '')}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.has('changeMonth') && (
                                                <td className="pr-5 px-5 py-1 border-b border-border text-right">
                                                    <span className={`flex items-center justify-end gap-1 text-xs font-medium font-mono ${row.changeMonthType === 'positive' ? 'text-green-600' : row.changeMonthType === 'negative' ? 'text-red-500' : 'text-black'}`}>
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
