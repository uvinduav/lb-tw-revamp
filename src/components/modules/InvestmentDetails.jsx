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
        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                <div style={{ width: '150px', height: '150px', position: 'relative', flexShrink: 0 }}>
                    <Doughnut data={chartData} options={chartOptions} />
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                                {columns.map((col, index) => (
                                    <th key={index} style={{ textAlign: col.align || 'left', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>
                                        {col.header}
                                    </th>
                                ))}</tr >
                        </thead>
                        <tbody>
                            {details.map((item, index) => (
                                <tr key={index} style={{ borderBottom: index < details.length - 1 ? '1px solid #f3f4f6' : 'none', height: '32px' }}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} style={{ padding: '4px 0', textAlign: col.align || 'left' }}>
                                            {col.render ? col.render(item) : (
                                                <span style={{
                                                    fontSize: '13px',
                                                    fontWeight: 400,
                                                    fontFamily: col.monospace ? 'monospace' : 'inherit',
                                                    color: col.color ? (typeof col.color === 'function' ? col.color(item) : col.color) : '#000000'
                                                }}>
                                                    {(() => {
                                                        const val = item[col.key];
                                                        if (typeof val === 'string' && val.includes(' ') && val.split(' ')[0].length === 3) {
                                                            const parts = val.split(' ');
                                                            return (
                                                                <>
                                                                    <span style={{ color: '#9ca3af', fontWeight: 400 }}>{parts[0]}</span>
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
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '4px',
                    backgroundColor: color || '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size > 20 ? '16px' : '10px',
                    fontWeight: 600,
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                    border: '1px solid rgba(0,0,0,0.05)',
                    flexShrink: 0
                }}
            >
                {name ? name.charAt(0) : 'I'}
            </div>
        );
    }

    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '4px',
                backgroundColor: 'white',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden'
            }}
        >
            <img
                src={src}
                alt={name}
                onError={() => setError(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: size > 30 ? '4px' : '2px'
                }}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{item.label}</span>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{item.label}</span>
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
            avgRate: "9.52%",
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
            avgRate: "10.10%",
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
            avgRate: "9.20%",
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
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflowY: 'auto', padding: '24px' }}>

            <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                            Investment Details
                        </h1>
                        <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>Total Investments: {summaryData.totalInvestments}</span>
                            <span style={{ color: '#e5e7eb' }}>•</span>
                            <span>Avg. Rate: {summaryData.wair}</span>
                            <span style={{ color: '#e5e7eb' }}>•</span>
                            <span>{summaryData.activeFDs} Total FDs</span>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Total Principal</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'black' }}>{summaryData.totalPrincipal}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Interest Earned</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'black' }}>{summaryData.interestEarned}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>WAIR</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'black' }}>{summaryData.wair}</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '0' }}>
                    {/* Investment Distribution */}
                    <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <h3 className="widget-title" style={{ marginBottom: '16px' }}>Bank-wise Investment Distribution (Million LKR)</h3>
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

                <div className="investment-grid" style={{ marginTop: '24px' }}>
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

                <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
                    <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 className="widget-title" style={{ margin: 0 }}>Bank Investment Rates by Currency</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>View:</span>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #10b981',
                                    borderRadius: '6px',
                                    padding: '0 12px',
                                    height: '32px',
                                    backgroundColor: 'white'
                                }}>
                                    <select
                                        value={rateFilter}
                                        onChange={(e) => setRateFilter(e.target.value)}
                                        style={{
                                            appearance: 'none',
                                            border: 'none',
                                            background: 'transparent',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            paddingRight: '20px',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            height: '100%'
                                        }}
                                    >
                                        <option value="All">All</option>
                                        <option value="Blended Rate">Blended Rate</option>
                                        <option value="LKR">LKR</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="SGD">SGD</option>
                                    </select>
                                    <ChevronDown size={14} style={{ position: 'absolute', right: '8px', pointerEvents: 'none', color: '#64748b' }} />
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '48px' }}>
                {banks.map((bank) => (
                    <div key={bank.id} id={`bank-${bank.name.replace(/\s+/g, '-').toLowerCase()}`}>

                        {/* Bank Header Info - Outside Table */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', paddingLeft: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={40} />
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>{bank.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                        <span>{bank.count} active investments</span>
                                        <span style={{ color: '#e5e7eb' }}>•</span>
                                        <span>{bank.share}</span>
                                        <span style={{ color: '#e5e7eb' }}>•</span>
                                        <span>Avg. Rate {bank.avgRate}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{bank.totalVolume}</div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0' }}>
                                    <span style={{ color: '#9ca3af' }}>{bank.desc}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper - Dashboard Entity Overview Style */}
                        <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
                            <table className="data-table" style={{ borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap' }}>ACC. NO.</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>TYPE</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>RENEWAL</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>START DATE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>RATE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>INTEREST EARNED</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>MATURITY VALUE</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>MATURITY</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>PRINCIPAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.investments.map((inv) => (
                                        <tr key={inv.id} className="hover-row">
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{inv.ref}</div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{inv.type}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{inv.renewalType}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{inv.startDate}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace', textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>{inv.rate}</td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <div style={{
                                                    fontSize: '13px',
                                                    fontWeight: 400,
                                                    color: 'var(--color-text-main)',
                                                    fontFamily: 'monospace',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    <span style={{ color: '#9ca3af' }}>{inv.interestEarned.split(' ')[0]}</span>
                                                    <span>{inv.interestEarned.split(' ')[1]}</span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <div style={{
                                                    fontSize: '13px',
                                                    fontWeight: 400,
                                                    color: 'var(--color-text-main)',
                                                    fontFamily: 'monospace',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    <span style={{ color: '#9ca3af' }}>{inv.maturityValue.split(' ')[0]}</span>
                                                    <span>{inv.maturityValue.split(' ')[1]}</span>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>
                                                {inv.duration} ({inv.maturity})
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <div
                                                    style={{
                                                        fontSize: '13px',
                                                        fontWeight: 400,
                                                        color: 'var(--color-text-main)',
                                                        fontFamily: 'monospace',
                                                        cursor: inv.isForeign ? 'help' : 'default',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    title={inv.isForeign ? inv.lkrAmount : ''}
                                                >
                                                    <span style={{ color: '#9ca3af' }}>{inv.amount.split(' ')[0]}</span>
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
