import {
    TrendingUp,
    TrendingDown,
    Calendar,
    CheckCircle,
    AlertCircle,
    Clock,
    RotateCw
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
    if (!account) return null;

    // --- Mock Data ---
    const accountInfo = {
        accountNumber: account.accountNo || '0039545007',
        type: account.type || 'SAVINGS',
        currency: 'LKR - Sri Lankan Rupee',
        purpose: 'urgent,PT01', // Example tags
        startDate: 'Feb 09, 2026',
        lastUpdate: 'Feb 09, 2026',
        status: 'Active',
        balance: account.balance || 'LKR 4,500,000.00',
        avgBalance: 'LKR 4,500,000.00',
        change7d: 'LKR 4,500,000.00'
    };

    const labels = Array.from({ length: 30 }, (_, i) => i + 1); // 1 to 30
    const dataPoints = Array(22).fill(0).concat([100000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000]);

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
                            valueClass="text-green"
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
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '8px' }}>
                                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>ACCOUNT NUMBER</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{accountInfo.accountNumber}</div>
                                </div>
                                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>ACCOUNT TYPE</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{accountInfo.type}</div>
                                </div>
                                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>CURRENCY</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{accountInfo.currency}</div>
                                </div>
                                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>PURPOSE</div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>urgent</span>
                                        <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>PT01</span>
                                    </div>
                                </div>
                                <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>START DATE</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calendar size={14} className="text-gray" />
                                        {accountInfo.startDate}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.05em', marginBottom: '2px' }}>LAST BALANCE UPDATE</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Clock size={14} className="text-gray" />
                                        {accountInfo.lastUpdate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Balance Trend Chart */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>30-Day Balance Trend</h2>
                        </div>
                        <div className="widget-card" style={{ padding: '24px', flex: 1 }}>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Balance history for the last 30 days</p>
                            <div style={{ height: '300px', width: '100%' }}>
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountDetails;
