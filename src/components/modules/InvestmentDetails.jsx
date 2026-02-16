import React from 'react';
import { TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import bankLogoHnb from '../../assets/bank-icons/hnb.png';
import bankLogoCom from '../../assets/bank-icons/comb.png';
import bankLogoSamp from '../../assets/bank-icons/sampath.png';

const topLabelsPlugin = {
    id: 'topLabels',
    afterDatasetsDraw(chart) {
        if (chart.config.type !== 'bar') return;
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((bar, index) => {
                const value = dataset.data[index];
                if (value !== undefined && value !== null) {
                    ctx.fillStyle = '#64748b';
                    ctx.font = '500 9px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    
                    let label;
                    if (value > 0) {
                        label = value.toLocaleString() + 'M';
                    } else {
                        label = '0M';
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
    BarElement,
    topLabelsPlugin
);

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


const InvestmentDetails = ({ onNavigate }) => {
    // Mock Data
    const summaryData = {
        totalInvestments: "Rs 11,488,720,084.07",
        avgReturn: "10.04%",
        activeFDs: 20,
        maturingSoon: 5
    };

    const categoryDistributionData = {
        labels: ['Hatton National Bank', 'Commercial Bank', 'Sampath Bank'],
        datasets: [{
            label: 'Investment (Million LKR)',
            data: [5450, 3200, 1838],
            backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444'],
            borderRadius: 0,
            barThickness: 40,
            minBarLength: 5,
            hoverBackgroundColor: ['#f59e0bdd', '#3b82f6dd', '#ef4444dd']
        }]
    };



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
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Active FDs</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.activeFDs}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Maturing (30 Days)</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.maturingSoon}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Avg Return Rate</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>{summaryData.avgReturn}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>YTD Interest</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>+Rs 235M</div>
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
                                plugins={[topLabelsPlugin]}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
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
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '48px' }}>
                {banks.map((bank) => (
                    <div key={bank.id}>

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
                                        <th style={{ whiteSpace: 'nowrap' }}>REFERENCE</th>
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
