import {
    TrendingUp,
    TrendingDown,
    Calendar,
    CheckCircle,
    AlertCircle,
    Clock,
    RotateCw,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';
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
import InterestCalculationTable from './InterestCalculationTable';

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

// Reusable Widget Card for Account Details
const AccountWidget = ({ title, value, subtext, subtextClass, valueClass, icon: Icon }) => (
    <div className="widget-card" style={{ flex: 1 }}>
        <div className="widget-header">
            <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
            <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
        </div>

        <div className="widget-value-row">
            <div className={`widget-value ${valueClass || ''}`}>{value}</div>
            {Icon && (
                <span className={subtextClass} style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon size={14} />
                </span>
            )}
        </div>

        {subtext && (
            <div className={`widget-subtext ${subtextClass}`}>
                {subtext}
            </div>
        )}
    </div>
);

const AccountDetails = ({ account, bank }) => {
    // --- State ---
    const [timeRange, setTimeRange] = useState('30 Days');

    if (!account) return null;

    const accountInfo = {
        accountNumber: account.accountNo || account.accountNumber || '0039545007',
        type: account.type || 'SAVINGS',
        currency: 'LKR - Sri Lankan Rupee',
        purpose: 'urgent,PT01', // Example tags
        startDate: account.startDate || 'Feb 09, 2026',
        lastUpdate: 'Feb 09, 2026',
        status: account.status || 'Active',
        interestRate: account.interestRate || '2.50%',
        balance: account.balance || account.amount || 'LKR 4,500,000.00',
        avgBalance: 'LKR 4,500,000.00',
        change7d: 'LKR 4,500,000.00'
    };

    const getChartData = (range) => {
        if (range === '3 Months') {
            return {
                labels: Array.from({ length: 12 }, (_, i) => `W${i + 1}`),
                data: Array(12).fill(4500000).map(v => v + (Math.random() - 0.5) * 500000)
            };
        }
        if (range === '6 Months') {
            return {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                data: Array(6).fill(4500000).map(v => v + (Math.random() - 0.5) * 1000000)
            };
        }
        return {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            data: Array(22).fill(0).concat([100000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000])
        };
    };

    const { labels, data: dataPoints } = getChartData(timeRange);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Balance',
                data: dataPoints,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: '#3b82f6',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        return `LKR ${context.parsed.y.toLocaleString()}`;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#f3f4f6',
                },
                ticks: {
                    font: { size: 10 },
                    color: '#9ca3af'
                }
            },
            y: {
                grid: {
                    display: true,
                    color: '#f3f4f6',
                },
                ticks: {
                    font: { size: 10 },
                    color: '#9ca3af',
                    callback: function (value) {
                        if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                        if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                        return value;
                    }
                }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const isRenewed = accountInfo.status?.toLowerCase() === 'renewed';

    return (
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div className="dashboard-container" style={{ padding: '24px' }}>

                {/* Header & Widgets Section */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                            {accountInfo.accountNumber}
                        </h1>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                            {bank} • {accountInfo.type}
                        </div>
                    </div>

                    {/* Top Widgets Row */}
                    <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: 0 }}>
                        <AccountWidget
                            title="Current Balance"
                            value={accountInfo.balance}
                        />
                        <AccountWidget
                            title="30-Day Average"
                            value={accountInfo.avgBalance}
                            subtext="0.0% variance"
                            subtextClass="text-green"
                        />
                        <AccountWidget
                            title="7-Day Change"
                            value={accountInfo.change7d}
                            subtext="LKR 4,500,000.00"
                            subtextClass="text-green"
                            icon={TrendingUp}
                        />
                        <AccountWidget
                            title="Account Status"
                            value={accountInfo.status}
                            valueClass={isRenewed ? 'text-blue' : 'text-green'}
                        />
                    </div>
                </div>

                {/* Content Row: Side-by-Side Info and Chart */}
                <div style={{ display: 'flex', gap: '32px', marginTop: '32px', alignItems: 'stretch' }}>
                    {/* Left: Account Information */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Account Information</h2>
                        </div>
                        <div className="widget-card" style={{ padding: '24px', flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>account number</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{accountInfo.accountNumber}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>account type</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{accountInfo.type}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>currency</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{accountInfo.currency}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>interest rate</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{accountInfo.interestRate}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>purpose</div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                        <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>urgent</span>
                                        <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>PT01</span>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>start date</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {accountInfo.startDate}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'lowercase', marginBottom: '4px', fontWeight: 400 }}>last balance update</div>
                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {accountInfo.lastUpdate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Balance Trend Chart */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '16px', paddingLeft: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0' }}>
                                {timeRange === '30 Days' ? '30-Day' : timeRange} Balance Trend
                            </h2>
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    style={{
                                        appearance: 'none',
                                        backgroundColor: 'white',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '6px',
                                        padding: '6px 32px 6px 12px',
                                        fontSize: '12px',
                                        color: 'var(--color-text-main)',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="30 Days">30 Days</option>
                                    <option value="3 Months">3 Months</option>
                                    <option value="6 Months">6 Months</option>
                                </select>
                                <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-secondary)' }} />
                            </div>
                        </div>
                        <div className="widget-card" style={{ padding: '24px', flex: 1 }}>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                                Balance history for the last {timeRange.toLowerCase()}
                            </p>
                            <div style={{ height: '300px', width: '100%' }}>
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance Thresholds Section */}
                <div className="widget-card" style={{ marginTop: '32px', padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '24px' }}>Balance Thresholds</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>Critical Minimum</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>S$2,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>Warning Level</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>S$5,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>Current Balance</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>S$294,910.027</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#a855f7' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--color-text-main)' }}>High Balance Alert</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-main)' }}>S$200,000</span>
                        </div>
                    </div>

                    {/* Spectrum Bar */}
                    <div style={{ position: 'relative', height: '12px', borderRadius: '6px', background: 'linear-gradient(to right, #ef4444 0%, #f97316 25%, #eab308 50%, #d8b4fe 75%, #a855f7 100%)', marginTop: '40px' }}>
                        {/* Current Marker */}
                        <div style={{
                            position: 'absolute',
                            left: '85%', // Approximate position based on value
                            top: '-5px',
                            bottom: '-5px',
                            width: '4px',
                            backgroundColor: 'black',
                            borderRadius: '2px',
                            zIndex: 10
                        }}>
                            <div style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translate(-50%, -8px)',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                whiteSpace: 'nowrap'
                            }}>
                                Current
                                {/* Triangle pointer */}
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '4px solid transparent',
                                    borderRight: '4px solid transparent',
                                    borderTop: '4px solid black'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditional Table Section */}
                {isRenewed && (
                    <InterestCalculationTable account={account} currency={account.currency || 'LKR'} />
                )}

            </div>
        </div>
    );
};

export default AccountDetails;
