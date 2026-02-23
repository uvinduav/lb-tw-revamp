import React from 'react';
import {
    Building2,
    Wallet,
    CreditCard,
    Activity,
    TrendingUp,
    TrendingDown,
    LineChart,
    ArrowLeft,
    RotateCw,
    Info,
    CheckCircle,
    Clock
} from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

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
    'People\'s Bank': bankLogoPb,
    'DFCC Bank': bankLogoDfcc
};

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController
);

const ghostBarsPlugin = {
    id: 'ghostBars',
    beforeDatasetsDraw(chart) {
        if (chart.config.type !== 'bar') return;
        const { ctx, chartArea } = chart;
        ctx.save();
        chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            if (meta.hidden) return;
            dataset.data.forEach((value, index) => {
                if (value === 0) {
                    const bar = meta.data[index];
                    if (!bar) return;
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
                    const barWidth = bar.width;
                    ctx.fillRect(
                        bar.x - barWidth / 2,
                        chartArea.top,
                        barWidth,
                        chartArea.bottom - chartArea.top
                    );
                }
            });
        });
        ctx.restore();
    }
};

ChartJS.register(ghostBarsPlugin);

const LogoImage = ({ src, name, color, size = 48 }) => {
    const [error, setError] = React.useState(false);

    if (error || !src) {
        return (
            <div
                className="rounded flex items-center justify-center font-semibold border border-black/5"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color || '#f3f4f6',
                    fontSize: size > 20 ? '10px' : '8px',
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                }}
            >
                {name ? name.charAt(0) : 'B'}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            onError={() => setError(true)}
            className="rounded object-cover border border-border"
            style={{ width: `${size}px`, height: `${size}px` }}
        />
    );
};

// Reusable Top Row Summary Card
const SummaryWidget = ({ title, value, subtext, onClick }) => (
    <div className="bg-white border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" onClick={onClick}>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{title}</h3>
        </div>

        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-text-main">{value}</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
                {subtext}
            </p>
        </div>
    </div>
);

// Reusable Chart Card Component
const ChartCard = (props) => {
    const { title, chartData, details, columns, chartType = 'doughnut', icon: Icon } = props;

    const doughnutOptions = {
        cutout: '0%',
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        elements: { arc: { borderWidth: 2, borderColor: '#ffffff' } }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
                cornerRadius: 4,
                displayColors: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                border: { display: false },
                grid: { color: '#f3f4f6', drawBorder: false },
                ticks: { font: { size: 11, family: 'Inter, sans-serif' }, color: '#6b7280', padding: 8 }
            },
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { font: { size: 12, family: 'Inter, sans-serif' }, color: '#374151', padding: 8 },
                border: { display: false }
            }
        }
    };

    return (
        <div className="bg-white border border-border rounded-lg p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{title}</h3>
            </div>

            <div className={`flex-1 flex gap-8 items-start ${chartType === 'bar' ? 'flex-col' : 'flex-row'}`}>
                {/* Chart Section */}
                <div className={`h-[150px] relative shrink-0 ${chartType === 'bar' ? 'w-full' : 'w-[180px]'}`}>
                    {chartType === 'doughnut' ? (
                        <Doughnut data={chartData} options={doughnutOptions} />
                    ) : (
                        <Bar data={chartData} options={barOptions} />
                    )}
                </div>

                {/* Legend/Details Section (For Charts) */}
                {details && chartType !== 'bar' && (
                    <div className="flex-1 flex flex-col gap-2">
                        {details.map((item, idx) => (
                            <div key={idx} className="grid items-center gap-2 text-[13px]" style={{ gridTemplateColumns: item.count !== undefined ? '1.5fr auto 1.5fr' : '1fr 1fr' }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-text-secondary font-normal">{item.label}</span>
                                </div>

                                {item.count !== undefined && (
                                    <div className="text-center text-text-secondary font-mono">
                                        {item.count}
                                    </div>
                                )}

                                <div className="text-right">
                                    <div className="font-medium text-text-main font-mono">{item.value}</div>
                                    {item.subtext && <div className="text-[11px] text-text-secondary">{item.subtext}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Section for Bar Chart (Data Table style) */}
            {chartType === 'bar' && columns && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-2 mb-3 pb-2 border-b border-gray-100">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase">Currency / Type</span>
                        <span className="text-[11px] font-semibold text-gray-400 uppercase text-right">Avg Rate</span>
                        <span className="text-[11px] font-semibold text-gray-400 uppercase text-right">Amount</span>
                    </div>
                    {details.map((item, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="text-[13px] font-semibold mb-2 text-gray-900">{item.currency}</div>

                            <div className="grid grid-cols-[1fr_auto_auto] gap-2 text-[13px] mb-1.5 items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-700">Deposits</span>
                                </div>
                                <span className="font-mono text-gray-500 text-xs text-right">{item.avgRate}</span>
                                <span className="font-mono text-right font-medium">{item.deposits}</span>
                            </div>

                            <div className="grid grid-cols-[1fr_auto_auto] gap-2 text-[13px] items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="text-gray-700">Loans</span>
                                </div>
                                <span className="font-mono text-gray-500 text-xs text-right">{item.loanRate}</span>
                                <span className="font-mono text-right font-medium">{item.loans}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const BankDetails = ({ entity, bank, onNavigate }) => {
    if (!entity || !bank) return null;

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- Mock Data ---

    const summaryData = [
        { title: 'Total Deposits', value: 'Rs 794,079,169.80', subtext: '13 accounts', icon: Wallet, target: 'operating-accounts' },
        { title: 'Total Loans', value: 'Rs 2,308,933,333.32', subtext: '3 facilities', icon: CreditCard, target: 'loan-facilities' },
        { title: 'Fixed Deposits', value: 'Rs 36,031,308,800.00', subtext: '4 FDs', icon: TrendingUp, target: 'fixed-deposits' },
    ];

    const investmentData = {
        labels: ['FD'],
        datasets: [{
            data: [100],
            backgroundColor: ['#3b82f6'],
            borderWidth: 0,
        }]
    };

    const investmentDetails = [
        { label: 'Total', value: 'Rs 36,031.31M', color: 'transparent' },
        { label: 'WAIR', value: '10.00%', color: 'transparent' },
        { label: 'FD', value: 'Rs 36,031.31M', subtext: 'Avg Rate: 10.00%', color: '#3b82f6' }
    ];

    const fdMaturityData = {
        labels: ['3-6 Months', '6-12 Months', '12+ Months'],
        datasets: [{
            data: [98.5, 0.1, 1.4],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            borderWidth: 0,
        }]
    };

    const fdMaturityDetails = [
        { label: 'Total', value: 'Rs 36,531.31M', color: 'transparent' },
        { label: '0-3 Months', value: '0.0%', color: '#3b82f6' },
        { label: '3-6 Months', value: 'Rs 36,000.00M (2 FDs)', color: '#10b981' },
        { label: '6-12 Months', value: 'Rs 23.00M (1 FDs)', color: '#f59e0b' },
        { label: '12+ Months', value: 'Rs 508.31M (2 FDs)', color: '#ef4444' },
    ];

    const lkrFdMaturityData = {
        labels: ['12+ Months'],
        datasets: [{
            data: [100],
            backgroundColor: ['#ef4444'],
            borderWidth: 0,
        }]
    };

    const lkrFdMaturityDetails = [
        { label: 'Total FDs', value: 'Rs 500.00M', count: 1, color: 'transparent' },
        { label: '0-3 Months', value: '0.0%', count: 0, color: '#3b82f6' },
        { label: '3-6 Months', value: '0.0%', count: 0, color: '#10b981' },
        { label: '6-12 Months', value: '0.0%', count: 0, color: '#f59e0b' },
        { label: '12+ Months', value: 'Rs 500.00M', count: 1, color: '#ef4444' },
    ];

    const forexData = {
        labels: ['EUR', 'USD', 'GBP'],
        datasets: [
            {
                label: 'Deposits',
                data: [120, 0.1, 0.02],
                backgroundColor: '#10b981',
                barPercentage: 0.5,
                categoryPercentage: 0.7,
                borderRadius: 4,
                minBarLength: 0
            },
            {
                label: 'Loans',
                data: [0, 10, 0],
                backgroundColor: '#ef4444',
                barPercentage: 0.5,
                categoryPercentage: 0.7,
                borderRadius: 4,
                minBarLength: 0
            }
        ]
    };

    const forexDetails = [
        { currency: 'EUR', deposits: 'EUR 120,000,000.00', loans: 'EUR 0.00', avgRate: '10.00%', loanRate: '0.00%' },
        { currency: 'USD', deposits: 'USD 100,000.00', loans: 'USD 10,000,000.00', avgRate: '10.00%', loanRate: '10.00%' },
        { currency: 'GBP', deposits: 'GBP 20,000.00', loans: 'GBP 0.00', avgRate: '10.00%', loanRate: '0.00%' },
    ];

    // Mock Data for Operating Accounts
    const operatingAccounts = [
        { accountNo: '1100023456', company: 'Lanka Bell', name: 'Operational Account', type: 'Current', currency: 'LKR', avgBalance: '240,000,000.00', balance: '250,500,000.00', trend: 4.5 },
        { accountNo: '1100023457', company: 'Bell Solutions', name: 'Payroll Account', type: 'Current', currency: 'LKR', avgBalance: '48,000,000.00', balance: '50,000,000.00', trend: 2.1 },
        { accountNo: '1100023458', company: 'Lanka Bell', name: 'Collection Account', type: 'Savings', currency: 'USD', avgBalance: '1,150,000.00', balance: '1,200,000.00', trend: -1.2 },
    ];

    // Mock Data for Loan Facilities
    const loanFacilities = [
        { type: 'STL', amount: 'LKR 500,000,000.00', outstanding: 'LKR 450,000,000.00', rate: '12.5%', maturity: '2026-12-31' },
        { type: 'LTL', amount: 'LKR 1,000,000,000.00', outstanding: 'LKR 800,000,000.00', rate: '11.0%', maturity: '2030-06-30' },
    ];

    // Mock Data for Fixed Deposits
    const fixedDeposits = [
        { fdNo: 'FD00123', amount: 'LKR 100,000,000.00', rate: '9.5%', maturity: '2026-06-15', status: 'Active' },
        { fdNo: 'FD00124', amount: 'LKR 50,000,000.00', rate: '9.2%', maturity: '2026-03-20', status: 'Active' },
    ];

    return (
        <div className="h-full overflow-hidden flex flex-col">

            <div className="flex-1 overflow-y-auto p-6">

                {/* Header & Summary Section */}
                <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                    {/* Header Info */}
                    <div className="flex items-center gap-4 mb-6">
                        <LogoImage src={bankLogos[bank]} name={bank} size={48} />
                        <div>
                            <h1 className="text-xl font-semibold text-text-main m-0">
                                {bank}
                            </h1>
                            <div className="text-[13px] text-text-secondary mt-1">
                                {entity.name}
                            </div>
                        </div>
                    </div>

                    {/* Summary Widgets Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {summaryData.map((item, index) => (
                            <SummaryWidget
                                key={index}
                                title={item.title}
                                value={item.value}
                                subtext={`Click to view details \u2192`}
                                icon={item.icon}
                                onClick={() => scrollToSection(item.target)}
                            />
                        ))}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-0">
                        <div className="h-full">
                            <ChartCard
                                title="Investment Breakdown"
                                chartData={investmentData}
                                details={investmentDetails}
                            />
                        </div>
                        <div className="h-full">
                            <ChartCard
                                title="FD Maturity - All Currencies"
                                chartData={fdMaturityData}
                                details={fdMaturityDetails}
                            />
                        </div>
                        <div className="h-full">
                            <ChartCard
                                title="LKR FD Maturity"
                                chartData={lkrFdMaturityData}
                                details={lkrFdMaturityDetails}
                            />
                        </div>
                        <div className="h-full">
                            <ChartCard
                                title="Foreign Currency Overview"
                                chartType="bar"
                                chartData={forexData}
                                details={forexDetails}
                                columns={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Operating Accounts Table */}
                <div id="operating-accounts" className="mt-8">
                    <div className="mb-4 pl-1">
                        <h2 className="text-lg font-semibold text-text-main mb-1">Operating Accounts</h2>
                    </div>
                    <div className="m-0 bg-white border-t border-border overflow-x-auto">
                        <table className="w-full border-collapse text-[13px]">
                            <thead className="sticky top-0 z-10">
                                <tr>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">ACCOUNT NUMBER</th>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">COMPANY</th>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">ACCOUNT NAME</th>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">TYPE</th>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">CURRENCY</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">AVG BALANCE</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">BALANCE</th>
                                    <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">TREND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {operatingAccounts.map((acc, idx) => (
                                    <tr
                                        key={idx}
                                        className="cursor-pointer hover:bg-bg-subtle transition-colors duration-150"
                                        onClick={() => onNavigate && onNavigate('Account Details', entity, bank, acc)}
                                    >
                                        <td className="px-2.5 py-1 border-b border-border font-mono text-text-main">{acc.accountNo}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-text-main">{acc.company}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-text-main">{acc.name}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-text-main">{acc.type}</td>
                                        <td className="px-2.5 py-1 border-b border-border"><span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-600">{acc.currency}</span></td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">
                                            <span className="text-gray-400">{acc.currency} </span>{acc.avgBalance}
                                        </td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono font-medium">
                                            <span className="text-gray-400">{acc.currency} </span>{acc.balance}
                                        </td>
                                        <td className="pr-6 px-2.5 py-1 border-b border-border text-right">
                                            <div className={`flex items-center justify-end gap-1 text-[13px] font-medium ${acc.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {acc.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                <span>{Math.abs(acc.trend)}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Loan Facilities Table */}
                <div id="loan-facilities" className="mt-8">
                    <div className="mb-4 pl-1">
                        <h2 className="text-lg font-semibold text-text-main mb-1">Loan Facilities</h2>
                    </div>
                    <div className="m-0 bg-white border-t border-border overflow-x-auto">
                        <table className="w-full border-collapse text-[13px]">
                            <thead className="sticky top-0 z-10">
                                <tr>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">TYPE</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">AMOUNT</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">OUTSTANDING</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">INTEREST RATE</th>
                                    <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">MATURITY DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanFacilities.map((loan, idx) => (
                                    <tr key={idx} className="hover:bg-bg-subtle transition-colors duration-150">
                                        <td className="px-2.5 py-1 border-b border-border text-text-main">{loan.type}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">
                                            <span className="text-gray-400">{loan.amount.split(' ')[0]} </span>{loan.amount.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono font-medium text-text-main">
                                            <span className="text-gray-400">{loan.outstanding.split(' ')[0]} </span>{loan.outstanding.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{loan.rate}</td>
                                        <td className="pr-6 px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{loan.maturity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fixed Deposits Table */}
                <div id="fixed-deposits" className="mt-8">
                    <div className="mb-4 pl-1">
                        <h2 className="text-lg font-semibold text-text-main mb-1">Fixed Deposits</h2>
                    </div>
                    <div className="m-0 bg-white border-t border-border overflow-x-auto">
                        <table className="w-full border-collapse text-[13px]">
                            <thead className="sticky top-0 z-10">
                                <tr>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">FD NUMBER</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">AMOUNT</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">INTEREST RATE</th>
                                    <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">MATURITY DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixedDeposits.map((fd, idx) => (
                                    <tr key={idx} className="hover:bg-bg-subtle transition-colors duration-150">
                                        <td className="px-2.5 py-1 border-b border-border font-mono text-text-main">{fd.fdNo}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono font-medium text-text-main">
                                            <span className="text-gray-400">{fd.amount.split(' ')[0]} </span>{fd.amount.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{fd.rate}</td>
                                        <td className="pr-6 px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{fd.maturity}</td>
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

export default BankDetails;
