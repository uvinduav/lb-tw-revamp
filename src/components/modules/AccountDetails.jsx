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
    <div className="bg-white border border-border rounded-lg p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{title}</h3>
            <RotateCw size={14} className="text-gray-400 cursor-pointer" />
        </div>

        <div className="flex items-baseline gap-2">
            <div className={`text-xl font-bold font-mono ${valueClass === 'text-green' ? 'text-green-600' : 'text-text-main'}`}>{value}</div>
            {Icon && (
                <span className={`flex items-center ${subtextClass === 'text-green' ? 'text-green-600' : 'text-text-secondary'}`}>
                    <Icon size={14} />
                </span>
            )}
        </div>

        {subtext && (
            <div className={`text-xs mt-1 ${subtextClass === 'text-green' ? 'text-green-600' : 'text-text-secondary'}`}>
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

    const [timeRange, setTimeRange] = useState('30 Days');

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

    return (
        <div className="h-full overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">

                {/* Header & Widgets Section */}
                <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold text-text-main m-0">
                            {accountInfo.accountNumber}
                        </h1>
                        <div className="text-xs text-text-secondary mt-0.5">
                            {bank} • {accountInfo.type}
                        </div>
                    </div>

                    {/* Top Widgets Row */}
                    <div className="grid grid-cols-4 gap-4 mb-0">
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
                <div className="flex gap-8 mt-8 items-stretch">
                    {/* Left: Account Information */}
                    <div className="flex-1 flex flex-col">
                        <div className="mb-4 pl-1">
                            <h2 className="text-lg font-semibold text-text-main mb-1">Account Information</h2>
                        </div>
                        <div className="bg-white border border-border rounded-lg p-6 flex-1">
                            <div className="flex flex-col h-full justify-between gap-2">
                                <div className="border-b border-border pb-2.5">
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">ACCOUNT NUMBER</div>
                                    <div className="text-[13px] font-medium text-text-main font-mono">{accountInfo.accountNumber}</div>
                                </div>
                                <div className="border-b border-border pb-2.5">
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">ACCOUNT TYPE</div>
                                    <div className="text-[13px] font-medium text-text-main">{accountInfo.type}</div>
                                </div>
                                <div className="border-b border-border pb-2.5">
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">CURRENCY</div>
                                    <div className="text-[13px] font-medium text-text-main">{accountInfo.currency}</div>
                                </div>
                                <div className="border-b border-border pb-2.5">
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">PURPOSE</div>
                                    <div className="flex gap-2">
                                        <span className="bg-blue-50 text-blue-500 px-2 py-0.5 rounded text-[11px] font-semibold">urgent</span>
                                        <span className="bg-blue-50 text-blue-500 px-2 py-0.5 rounded text-[11px] font-semibold">PT01</span>
                                    </div>
                                </div>
                                <div className="border-b border-border pb-2.5">
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">START DATE</div>
                                    <div className="text-[13px] font-medium text-text-main flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        {accountInfo.startDate}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-semibold text-gray-500 tracking-wide mb-0.5">LAST BALANCE UPDATE</div>
                                    <div className="text-[13px] font-medium text-text-main flex items-center gap-2">
                                        <Clock size={14} className="text-gray-400" />
                                        {accountInfo.lastUpdate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Balance Trend Chart */}
                    <div className="flex-[1.5] flex flex-col">
                        <div className="mb-4 pl-1 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-text-main mb-0">
                                {timeRange === '30 Days' ? '30-Day' : timeRange} Balance Trend
                            </h2>
                            <div className="relative">
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="appearance-none bg-white border border-border rounded-md py-1.5 pl-3 pr-8 text-xs text-text-main cursor-pointer outline-none"
                                >
                                    <option value="30 Days">30 Days</option>
                                    <option value="3 Months">3 Months</option>
                                    <option value="6 Months">6 Months</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
                            </div>
                        </div>
                        <div className="bg-white border border-border rounded-lg p-6 flex-1">
                            <p className="text-xs text-text-secondary mb-6">
                                Balance history for the last {timeRange.toLowerCase()}
                            </p>
                            <div className="h-[300px] w-full">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance Thresholds Section */}
                <div className="bg-white border border-border rounded-lg p-6 mt-8">
                    <h3 className="text-base font-semibold text-text-main mb-6">Balance Thresholds</h3>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm text-text-main">Critical Minimum</span>
                            </div>
                            <span className="text-sm font-medium text-text-main">S$2,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span className="text-sm text-text-main">Warning Level</span>
                            </div>
                            <span className="text-sm font-medium text-text-main">S$5,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-text-main">Current Balance</span>
                            </div>
                            <span className="text-sm font-medium text-text-main">S$294,910.027</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span className="text-sm text-text-main">High Balance Alert</span>
                            </div>
                            <span className="text-sm font-medium text-text-main">S$200,000</span>
                        </div>
                    </div>

                    {/* Spectrum Bar */}
                    <div className="relative h-3 rounded-md mt-10" style={{ background: 'linear-gradient(to right, #ef4444 0%, #f97316 25%, #eab308 50%, #d8b4fe 75%, #a855f7 100%)' }}>
                        {/* Current Marker */}
                        <div className="absolute left-[85%] -top-1.5 -bottom-1.5 w-1 bg-black rounded-sm z-10">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                                Current
                                {/* Triangle pointer */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-black"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountDetails;
