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
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '4px',
                    backgroundColor: color || '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size > 20 ? '10px' : '8px',
                    fontWeight: 600,
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                    border: '1px solid rgba(0,0,0,0.05)'
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
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '4px',
                objectFit: 'cover',
                border: '1px solid var(--color-border)'
            }}
        />
    );
};

// Reusable Top Row Summary Card
const SummaryWidget = ({ title, value, subtext, onClick }) => (
    <div className="widget-card" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="widget-header">
            <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
        </div>

        <div style={{ marginTop: '0px' }}>
            <div className="widget-value-row">
                <span className="widget-value">{value}</span>
            </div>
            <p className="widget-subtext">
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
        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
            </div>

            <div style={{ flex: 1, display: 'flex', gap: '32px', alignItems: 'flex-start', flexDirection: chartType === 'bar' ? 'column' : 'row' }}>
                {/* Chart Section */}
                <div style={{
                    width: chartType === 'bar' ? '100%' : '180px',
                    height: '150px',
                    position: 'relative',
                    flexShrink: 0
                }}>
                    {chartType === 'doughnut' ? (
                        <Doughnut data={chartData} options={doughnutOptions} />
                    ) : (
                        <Bar data={chartData} options={barOptions} />
                    )}
                </div>

                {/* Legend/Details Section (For Charts) */}
                {details && chartType !== 'bar' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {details.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'grid',
                                gridTemplateColumns: item.count !== undefined ? '1.5fr auto 1.5fr' : '1fr 1fr',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></div>
                                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>{item.label}</span>
                                </div>

                                {item.count !== undefined && (
                                    <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                                        {item.count}
                                    </div>
                                )}

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 500, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{item.value}</div>
                                    {item.subtext && <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{item.subtext}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Section for Bar Chart (Data Table style) */}
            {chartType === 'bar' && columns && (
                <div style={{ marginTop: '20px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Currency / Type</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', textAlign: 'right' }}>Avg Rate</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', textAlign: 'right' }}>Amount</span>
                    </div>
                    {details.map((item, idx) => (
                        <div key={idx} style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>{item.currency}</div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', fontSize: '13px', marginBottom: '6px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                    <span style={{ color: '#374151' }}>Deposits</span>
                                </div>
                                <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '12px', textAlign: 'right' }}>{item.avgRate}</span>
                                <span style={{ fontFamily: 'monospace', textAlign: 'right', fontWeight: 500 }}>{item.deposits}</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', fontSize: '13px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                    <span style={{ color: '#374151' }}>Loans</span>
                                </div>
                                <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '12px', textAlign: 'right' }}>{item.loanRate}</span>
                                <span style={{ fontFamily: 'monospace', textAlign: 'right', fontWeight: 500 }}>{item.loans}</span>
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
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

            <div className="dashboard-container" style={{ padding: '24px' }}>

                {/* Header & Summary Section */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    {/* Header Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <LogoImage src={bankLogos[bank]} name={bank} size={48} />
                        <div>
                            <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                                {bank}
                            </h1>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                {entity.name}
                            </div>
                        </div>
                    </div>

                    {/* Summary Widgets Grid */}
                    <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%', marginBottom: 0 }}>
                        <div style={{ height: '100%' }}>
                            <ChartCard
                                title="Investment Breakdown"
                                chartData={investmentData}
                                details={investmentDetails}
                            />
                        </div>
                        <div style={{ height: '100%' }}>
                            <ChartCard
                                title="FD Maturity - All Currencies"
                                chartData={fdMaturityData}
                                details={fdMaturityDetails}
                            />
                        </div>
                        <div style={{ height: '100%' }}>
                            <ChartCard
                                title="LKR FD Maturity"
                                chartData={lkrFdMaturityData}
                                details={lkrFdMaturityDetails}
                            />
                        </div>
                        <div style={{ height: '100%' }}>
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
                <div id="operating-accounts" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Operating Accounts</h2>
                    </div>
                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                        <table className="data-table" style={{ minWidth: '100%' }}>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th>ACCOUNT NUMBER</th>
                                    <th>COMPANY</th>
                                    <th>ACCOUNT NAME</th>
                                    <th>TYPE</th>
                                    <th>CURRENCY</th>
                                    <th style={{ textAlign: 'right' }}>AVG BALANCE</th>
                                    <th style={{ textAlign: 'right' }}>BALANCE</th>
                                    <th style={{ textAlign: 'right', paddingRight: '24px' }}>TREND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {operatingAccounts.map((acc, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover-row"
                                        onClick={() => onNavigate && onNavigate('Account Details', entity, bank, acc)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td style={{ fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{acc.accountNo}</td>
                                        <td style={{ color: 'var(--color-text-main)' }}>{acc.company}</td>
                                        <td style={{ color: 'var(--color-text-main)' }}>{acc.name}</td>
                                        <td style={{ color: 'var(--color-text-main)' }}>{acc.type}</td>
                                        <td><span className="currency-badge">{acc.currency}</span></td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>
                                            <span style={{ color: '#9ca3af' }}>{acc.currency} </span>{acc.avgBalance}
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 500 }}>
                                            <span style={{ color: '#9ca3af' }}>{acc.currency} </span>{acc.balance}
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: '4px',
                                                color: acc.trend >= 0 ? '#10b981' : '#ef4444',
                                                fontSize: '13px',
                                                fontWeight: 500
                                            }}>
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
                <div id="loan-facilities" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Loan Facilities</h2>
                    </div>
                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                        <table className="data-table" style={{ minWidth: '100%' }}>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th>TYPE</th>
                                    <th style={{ textAlign: 'right' }}>AMOUNT</th>
                                    <th style={{ textAlign: 'right' }}>OUTSTANDING</th>
                                    <th style={{ textAlign: 'right' }}>INTEREST RATE</th>
                                    <th style={{ textAlign: 'right', paddingRight: '24px' }}>MATURITY DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanFacilities.map((loan, idx) => (
                                    <tr key={idx} className="hover-row">
                                        <td style={{ color: 'var(--color-text-main)' }}>{loan.type}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>
                                            <span style={{ color: '#9ca3af' }}>{loan.amount.split(' ')[0]} </span>{loan.amount.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 500, color: 'var(--color-text-main)' }}>
                                            <span style={{ color: '#9ca3af' }}>{loan.outstanding.split(' ')[0]} </span>{loan.outstanding.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{loan.rate}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{loan.maturity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fixed Deposits Table */}
                <div id="fixed-deposits" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Fixed Deposits</h2>
                    </div>
                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                        <table className="data-table" style={{ minWidth: '100%' }}>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th>FD NUMBER</th>
                                    <th style={{ textAlign: 'right' }}>AMOUNT</th>
                                    <th style={{ textAlign: 'right' }}>INTEREST RATE</th>
                                    <th style={{ textAlign: 'right', paddingRight: '24px' }}>MATURITY DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixedDeposits.map((fd, idx) => (
                                    <tr key={idx} className="hover-row">
                                        <td style={{ fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{fd.fdNo}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 500, color: 'var(--color-text-main)' }}>
                                            <span style={{ color: '#9ca3af' }}>{fd.amount.split(' ')[0]} </span>{fd.amount.split(' ').slice(1).join(' ')}
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{fd.rate}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{fd.maturity}</td>
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
