import React from 'react';
import { TrendingUp, TrendingDown, Building2, ChevronDown } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

import bankLogoHnb from '../../assets/bank-icons/hnb.png';
import bankLogoCom from '../../assets/bank-icons/comb.png';
import bankLogoSamp from '../../assets/bank-icons/sampath.png';

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

const topLabelsPlugin = {
    id: 'topLabels',
    afterDatasetsDraw(chart) {
        if (chart.config.type !== 'bar') return;
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((bar, index) => {
                const value = dataset.data[index];
                if (value !== undefined && value !== null && value > 0) {
                    ctx.fillStyle = '#64748b';
                    ctx.font = '500 9px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    let label;
                    const pluginOptions = chart.options.plugins.topLabels || {};
                    let valueUnit = 'M';
                    if (dataset.unit !== undefined) {
                        valueUnit = dataset.unit;
                    } else if (pluginOptions.unit !== undefined) {
                        valueUnit = pluginOptions.unit;
                    }

                    if (valueUnit === 'M') {
                        label = value.toLocaleString() + 'M';
                    } else {
                        // For other units, append the unit (could be empty string)
                        label = value + valueUnit;
                    }

                    ctx.fillText(label, bar.x, bar.y - 5);
                }
            });
        });
        ctx.restore();
    }
};

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

// Reusable Chart Card Component
const ChartCard = (props) => {
    const { title, chartData, details, columns } = props;

    const chartOptions = {
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
        elements: { arc: { borderWidth: 2 } }
    };

    return (
        <div className="bg-white border border-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{title}</h3>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
                <div className="w-[150px] h-[150px] relative shrink-0">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>

                <div className="flex-1 min-w-[300px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-border h-8">
                                {columns.map((col, index) => (
                                    <th key={index} className="text-[11px] text-[#888] font-semibold uppercase py-1" style={{ textAlign: col.align || 'left' }}>
                                        {col.header}
                                    </th>
                                ))}</tr >
                        </thead>
                        <tbody>
                            {details.map((item, index) => (
                                <tr key={index} className={`h-8 ${index < details.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="py-1" style={{ textAlign: col.align || 'left' }}>
                                            {col.render ? col.render(item) : (
                                                <span className={`text-[13px] font-normal ${col.monospace ? 'font-mono' : ''}`} style={{
                                                    color: col.color ? (typeof col.color === 'function' ? col.color(item) : col.color) : '#000000'
                                                }}>
                                                    {(() => {
                                                        const val = item[col.key];
                                                        if (typeof val === 'string' && val.includes(' ') && val.split(' ')[0].length === 3) {
                                                            const parts = val.split(' ');
                                                            return (
                                                                <>
                                                                    <span className="text-gray-400 font-normal">{parts[0]}</span>
                                                                    <span> {parts.slice(1).join(' ')}</span>
                                                                </>
                                                            );
                                                        }
                                                        return val;
                                                    })()}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const LogoImage = ({ src, name, color, size = 48 }) => {
    const [error, setError] = React.useState(false);

    if (error || !src) {
        return (
            <div
                className="rounded flex items-center justify-center font-semibold border border-black/5 shrink-0"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color || '#f3f4f6',
                    fontSize: size > 20 ? '16px' : '10px',
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                }}
            >
                {name ? name.charAt(0) : 'I'}
            </div>
        );
    }

    return (
        <div
            className="rounded bg-white border border-border flex items-center justify-center shrink-0 overflow-hidden"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <img
                src={src}
                alt={name}
                onError={() => setError(true)}
                className="w-full h-full object-contain"
                style={{ padding: size > 30 ? '4px' : '2px' }}
            />
        </div>
    );
};


const InvestmentDetails = () => {
    const [rateFilter, setRateFilter] = React.useState('All');

    // Mock Data
    const summaryData = {
        totalInvestments: "Rs 11,453,278,578.97",
        activeFDs: 17,
        totalPrincipal: "Rs 10,346,720,084.07",
        interestEarned: "Rs 1,106,558,494.90",
        wair: "9.52%"
    };

    const categoryDistributionData = {
        labels: ['Hatton National Bank', 'Commercial Bank', 'Sampath Bank'],
        datasets: [{
            label: 'Investment (Million LKR)',
            data: [5450, 3200, 1838],
            backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444'],
            borderRadius: 0,
            barThickness: 40,
            minBarLength: 0,
            hoverBackgroundColor: ['#f59e0bdd', '#3b82f6dd', '#ef4444dd']
        }]
    };

    // Data copied from Dashboard
    const investmentData = {
        labels: ['USD', 'EUR', 'LKR'],
        datasets: [{
            data: [12.6, 0.8, 86.6],
            backgroundColor: ['#10b981', '#f59e0b', '#3b82f6'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4,
        }],
    };

    const investmentDetails = [
        { color: '#10b981', label: 'USD', count: 6, lkrEquivalent: 'LKR 1,039.60M', percentage: '12.6%', value: 'USD 4.52M' },
        { color: '#f59e0b', label: 'EUR', count: 1, lkrEquivalent: 'LKR 72.00M', percentage: '0.8%', value: 'EUR 0.24M' },
        { color: '#3b82f6', label: 'LKR', count: 11, lkrEquivalent: 'LKR 9,950.00M', percentage: '86.6%', value: 'LKR 9,950.00M' }
    ];

    const investmentColumns = [
        {
            header: 'CURRENCY', key: 'label', fontWeight: 400, render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[13px] font-normal text-text-main">{item.label}</span>
                </div>
            )
        },
        { header: 'FD COUNT', key: 'count', monospace: true, align: 'right' },
        { header: 'LKR EQUIVALENT', key: 'lkrEquivalent', monospace: true, align: 'right' },
        { header: '% OF TOTAL', key: 'percentage', monospace: true, align: 'right' },
        { header: 'AMOUNT', key: 'value', monospace: true, align: 'right' },
    ];

    const bankRatesData = {
        labels: ['Hatton National Bank', 'Commercial Bank', 'Sampath Bank'],
        datasets: [
            {
                label: 'Blended Rate',
                data: [9.52, 10.1, 9.2],
                backgroundColor: '#6366f1',
                unit: '%',
                minBarLength: 0
            },
            {
                label: 'EUR',
                data: [1.5, 0, 1.5],
                backgroundColor: '#f59e0b',
                unit: '%',
                minBarLength: 0
            },
            {
                label: 'GBP',
                data: [2.0, 0, 0],
                backgroundColor: '#ef4444',
                unit: '%',
                minBarLength: 5
            },
            {
                label: 'LKR',
                data: [11.5, 10.25, 12.0],
                backgroundColor: '#3b82f6',
                unit: '%',
                minBarLength: 5
            },
            {
                label: 'SGD',
                data: [3.5, 0, 0],
                backgroundColor: '#14b8a6',
                unit: '%',
                minBarLength: 5
            },
            {
                label: 'USD',
                data: [4.25, 3.8, 4.5],
                backgroundColor: '#10b981',
                unit: '%',
                minBarLength: 5
            }
        ]
    };

    const filteredBankRatesData = {
        ...bankRatesData,
        datasets: rateFilter === 'All'
            ? bankRatesData.datasets.filter(ds => ds.label !== 'Blended Rate')
            : bankRatesData.datasets.filter(ds => ds.label === rateFilter)
    };

    const maturityAllData = {
        labels: ['Hatton National Bank', 'Commercial Bank', 'Sampath Bank'],
        datasets: [{
            data: [50.0, 30.0, 20.0],
            backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4,
        }]
    };

    const maturityAllDetails = [
        { label: 'Hatton National Bank', amount: 'USD 2.26M', count: 3, avgRate: '4.25%', share: '50.0%', color: '#f59e0b' },
        { label: 'Commercial Bank', amount: 'USD 1.35M', count: 2, avgRate: '3.80%', share: '30.0%', color: '#3b82f6' },
        { label: 'Sampath Bank', amount: 'USD 0.91M', count: 1, avgRate: '3.50%', share: '20.0%', color: '#ef4444' },
    ];

    const maturityColumns = [
        {
            header: 'BANK', key: 'label', fontWeight: 400, render: (item) => (
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[13px] font-normal text-text-main">{item.label}</span>
                </div>
            )
        },
        { header: 'FD COUNT', key: 'count', monospace: true, align: 'right' },
        { header: 'AVG RATE', key: 'avgRate', monospace: true, align: 'right' },
        { header: '% OF USD TOTAL', key: 'share', monospace: true, align: 'right' },
        { header: 'AMOUNT', key: 'amount', monospace: true, align: 'right' },
    ];



    const banks = [
        {
            id: 1,
            name: "Hatton National Bank",
            logo: bankLogoHnb,
            color: "#fefce8",
            totalVolume: "LKR 5,450,000,000.00",
            share: "47.4% of total",
            count: 8,
            desc: "5 LKR FDs, 3 USD FDs",
            investments: [
                {
                    id: 'i1',
                    type: "Fixed Deposit",
                    ref: "FD-88291002",
                    currency: "LKR",
                    renewalType: "Auto-Renewal",
                    startDate: "2025-10-15",
                    duration: "6 months",
                    rate: "10.50%",
                    interestEarned: "LKR 26,250,000.00",
                    maturityValue: "LKR 526,250,000.00",
                    maturity: "2026-04-15",
                    amount: "LKR 500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i2',
                    type: "Fixed Deposit",
                    ref: "FD-88291003",
                    currency: "LKR",
                    renewalType: "Manual",
                    startDate: "2025-11-20",
                    duration: "6 months",
                    rate: "10.50%",
                    interestEarned: "LKR 13,125,000.00",
                    maturityValue: "LKR 263,125,000.00",
                    maturity: "2026-05-20",
                    amount: "LKR 250,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i3',
                    type: "Fixed Deposit",
                    ref: "FD-USD-001",
                    currency: "USD",
                    renewalType: "Auto-Renewal",
                    startDate: "2025-06-01",
                    duration: "1 year",
                    rate: "4.25%",
                    interestEarned: "USD 42,500.00",
                    maturityValue: "USD 1,042,500.00",
                    maturity: "2026-06-01",
                    amount: "USD 1,000,000.00",
                    lkrAmount: "LKR 230,000,000.00",
                    isForeign: true
                }
            ]
        },
        {
            id: 2,
            name: "Commercial Bank",
            logo: bankLogoCom,
            color: "#e0f2fe",
            totalVolume: "LKR 3,200,000,000.00",
            share: "27.8% of total",
            count: 5,
            desc: "5 LKR FDs",
            investments: [
                {
                    id: 'i4',
                    type: "Fixed Deposit",
                    ref: "FD-COMB-992",
                    currency: "LKR",
                    renewalType: "Auto-Renewal",
                    startDate: "2025-09-30",
                    duration: "6 months",
                    rate: "10.25%",
                    interestEarned: "LKR 61,500,000.00",
                    maturityValue: "LKR 1,261,500,000.00",
                    maturity: "2026-03-30",
                    amount: "LKR 1,200,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i5',
                    type: "Repo",
                    ref: "REPO-002",
                    currency: "LKR",
                    renewalType: "Manual",
                    startDate: "2026-01-28",
                    duration: "1 month",
                    rate: "9.50%",
                    interestEarned: "LKR 6,333,333.33",
                    maturityValue: "LKR 806,333,333.33",
                    maturity: "2026-02-28",
                    amount: "LKR 800,000,000.00",
                    isForeign: false
                }
            ]
        },
        {
            id: 3,
            name: "Sampath Bank",
            logo: bankLogoSamp,
            color: "#ffedd5",
            totalVolume: "LKR 1,838,720,000.00",
            share: "16.0% of total",
            count: 4,
            desc: "3 LKR FDs, 1 EUR FD",
            investments: [
                {
                    id: 'i6',
                    type: "Fixed Deposit",
                    ref: "FD-SAMP-112",
                    currency: "LKR",
                    renewalType: "Auto-Renewal",
                    startDate: "2025-08-15",
                    duration: "1 year",
                    rate: "10.00%",
                    interestEarned: "LKR 50,000,000.00",
                    maturityValue: "LKR 550,000,000.00",
                    maturity: "2026-08-15",
                    amount: "LKR 500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i7',
                    type: "Fixed Deposit",
                    ref: "FD-EUR-001",
                    currency: "EUR",
                    renewalType: "Auto-Renewal",
                    startDate: "2025-12-20",
                    duration: "1 year",
                    rate: "1.50%",
                    interestEarned: "EUR 3,600.00",
                    maturityValue: "EUR 243,600.00",
                    maturity: "2026-12-20",
                    amount: "EUR 240,000.00",
                    lkrAmount: "LKR 72,000,000.00",
                    isForeign: true
                }
            ]
        }
    ];

    return (
        <div className="h-full overflow-y-auto p-6">

            <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                {/* Header Section */}
                <div className="mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-text-main m-0">
                            Investment Details
                        </h1>
                        <div className="mt-1 text-[13px] font-normal text-text-secondary flex items-center gap-2">
                            <span>Total Investments: {summaryData.totalInvestments}</span>
                            <span className="text-gray-200">•</span>
                            <span>{summaryData.activeFDs} Total FDs</span>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">Total Principal</div>
                        <div className="text-base font-semibold text-black">{summaryData.totalPrincipal}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">Interest Earned</div>
                        <div className="text-base font-semibold text-black">{summaryData.interestEarned}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">WAIR</div>
                        <div className="text-base font-semibold text-black">{summaryData.wair}</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="flex gap-6 mb-0">
                    {/* Investment Distribution */}
                    <div className="flex-1 p-4 bg-white rounded-lg border border-border">
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">Bank-wise Investment Distribution (Million LKR)</h3>
                        <div style={{ height: '200px' }}>
                            <Bar
                                data={categoryDistributionData}
                                plugins={[topLabelsPlugin, ghostBarsPlugin]}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    onClick: (event, elements) => {
                                        if (elements.length > 0) {
                                            const index = elements[0].index;
                                            const bankName = categoryDistributionData.labels[index];
                                            const elementId = `bank-${bankName.replace(/\s+/g, '-').toLowerCase()}`;
                                            const element = document.getElementById(elementId);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }
                                    },
                                    onHover: (event, elements) => {
                                        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
                                    },
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: { color: '#f3f4f6' },
                                            grace: '10%'
                                        },
                                        x: {
                                            grid: { display: false },
                                            ticks: {
                                                autoSkip: false,
                                                maxRotation: 45,
                                                minRotation: 45,
                                                font: { size: 10 }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>


                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <ChartCard
                        title="Currency Breakdown"
                        chartData={investmentData}
                        details={investmentDetails}
                        columns={investmentColumns}
                    />
                    <ChartCard
                        title="USD Fixed Deposits - Bank Distribution"
                        chartData={maturityAllData}
                        details={maturityAllDetails}
                        columns={maturityColumns}
                    />
                </div>

                <div className="flex gap-6 mt-6">
                    <div className="flex-1 p-4 bg-white rounded-lg border border-border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">Bank Investment Rates by Currency</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-slate-500">View:</span>
                                <div className="relative flex items-center border border-emerald-500 rounded-md px-3 h-8 bg-white">
                                    <select
                                        value={rateFilter}
                                        onChange={(e) => setRateFilter(e.target.value)}
                                        className="appearance-none border-none bg-transparent text-[13px] font-medium pr-5 cursor-pointer outline-none h-full"
                                    >
                                        <option value="All">All</option>
                                        <option value="Blended Rate">Blended Rate</option>
                                        <option value="LKR">LKR</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="SGD">SGD</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-2 pointer-events-none text-slate-500" />
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '200px' }}>
                            <Bar
                                data={filteredBankRatesData}
                                plugins={[ghostBarsPlugin]}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'right',
                                            labels: {
                                                boxWidth: 12,
                                                font: { size: 10 }
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: { color: '#f3f4f6' },
                                            grace: '10%',
                                            title: {
                                                display: true,
                                                text: 'Interest Rate (%)',
                                                font: {
                                                    size: 11,
                                                    weight: 500
                                                },
                                                color: '#64748b'
                                            },
                                            ticks: {
                                                callback: (value) => value + '%'
                                            }
                                        },
                                        x: {
                                            grid: { display: false },
                                            ticks: {
                                                autoSkip: false,
                                                font: { size: 10 }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12 pb-12">
                {banks.map((bank) => (
                    <div key={bank.id} id={`bank-${bank.name.replace(/\s+/g, '-').toLowerCase()}`}>

                        {/* Bank Header Info */}
                        <div className="flex justify-between items-end mb-4 pl-1">
                            <div className="flex items-center gap-3">
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={40} />
                                <div>
                                    <h3 className="text-base font-semibold text-text-main m-0">{bank.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                                        <span>{bank.count} active investments</span>
                                        <span className="text-gray-200">•</span>
                                        <span>{bank.share}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-base font-semibold text-text-main leading-tight">{bank.totalVolume}</div>
                                <div className="text-xs text-text-secondary mt-1 font-normal flex items-center justify-end">
                                    <span className="text-gray-400">{bank.desc}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="m-0 bg-white border-t border-border overflow-x-auto">
                            <table className="w-full border-collapse text-[13px]">
                                <thead className="sticky top-0 z-10">
                                    <tr>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">ACC. NO.</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">TYPE</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">RENEWAL</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">START DATE</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">RATE</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">INTEREST EARNED</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">MATURITY VALUE</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">MATURITY</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">PRINCIPAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.investments.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-bg-subtle transition-colors duration-150">
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className="text-[13px] font-medium text-text-main">{inv.ref}</div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">{inv.type}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">{inv.renewalType}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">{inv.startDate}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 font-mono text-text-main whitespace-nowrap">{inv.rate}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 whitespace-nowrap">
                                                <div className="text-[13px] font-normal text-text-main font-mono inline-flex items-center gap-1">
                                                    <span className="text-gray-400">{inv.interestEarned.split(' ')[0]}</span>
                                                    <span>{inv.interestEarned.split(' ')[1]}</span>
                                                </div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 whitespace-nowrap">
                                                <div className="text-[13px] font-normal text-text-main font-mono inline-flex items-center gap-1">
                                                    <span className="text-gray-400">{inv.maturityValue.split(' ')[0]}</span>
                                                    <span>{inv.maturityValue.split(' ')[1]}</span>
                                                </div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">
                                                {inv.duration} ({inv.maturity})
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 whitespace-nowrap">
                                                <div
                                                    className={`text-[13px] font-normal text-text-main font-mono inline-flex items-center gap-1 ${inv.isForeign ? 'cursor-help' : ''}`}
                                                    title={inv.isForeign ? inv.lkrAmount : ''}
                                                >
                                                    <span className="text-gray-400">{inv.amount.split(' ')[0]}</span>
                                                    <span>{inv.amount.split(' ')[1]}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentDetails;
