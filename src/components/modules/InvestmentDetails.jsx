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
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
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
                    border: '1px solid rgba(0,0,0,0.05)'
                }}
            >
                {name ? name.charAt(0) : 'I'}
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

const InvestmentDetails = ({ onNavigate }) => {
    // Mock Data
    const summaryData = {
        totalInvestments: "Rs 11,488,720,084.07",
        avgReturn: "10.04%",
        activeFDs: 20,
        maturingSoon: 5
    };

    const categoryDistributionData = {
        labels: ['LKR FDs', 'USD FDs', 'EUR FDs'],
        datasets: [{
            label: 'Investment',
            data: [9950.0, 1356.0, 72.0], // Converted to LKR roughly for chart scale
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            borderRadius: 4,
            barThickness: 60
        }]
    };

    const maturityProfileData = {
        labels: ['0-3 Months', '3-6 Months', '6-12 Months', '12+ Months'],
        datasets: [{
            data: [74, 13, 4, 9],
            backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const banks = [
        {
            id: 1,
            name: "Hatton National Bank",
            logo: "hnb_logo.png",
            color: "#fefce8",
            totalVolume: "Rs 5,450,000,000.00",
            share: "47.4% of total",
            count: 8,
            desc: "5 LKR FDs, 3 USD FDs",
            investments: [
                {
                    id: 'i1',
                    type: "Fixed Deposit",
                    ref: "FD-88291002",
                    currency: "LKR",
                    rate: "10.50%",
                    maturity: "2026-04-15",
                    amount: "LKR 500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i2',
                    type: "Fixed Deposit",
                    ref: "FD-88291003",
                    currency: "LKR",
                    rate: "10.50%",
                    maturity: "2026-05-20",
                    amount: "LKR 250,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i3',
                    type: "Fixed Deposit",
                    ref: "FD-USD-001",
                    currency: "USD",
                    rate: "4.25%",
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
            logo: "combank_logo.png",
            color: "#e0f2fe",
            totalVolume: "Rs 3,200,000,000.00",
            share: "27.8% of total",
            count: 5,
            desc: "5 LKR FDs",
            investments: [
                {
                    id: 'i4',
                    type: "Fixed Deposit",
                    ref: "FD-COMB-992",
                    currency: "LKR",
                    rate: "10.25%",
                    maturity: "2026-03-30",
                    amount: "LKR 1,200,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i5',
                    type: "Repo",
                    ref: "REPO-002",
                    currency: "LKR",
                    rate: "9.50%",
                    maturity: "2026-02-28",
                    amount: "LKR 800,000,000.00",
                    isForeign: false
                }
            ]
        },
        {
            id: 3,
            name: "Sampath Bank",
            logo: "sampath_logo.png",
            color: "#ffedd5",
            totalVolume: "Rs 1,838,720,000.00",
            share: "16.0% of total",
            count: 4,
            desc: "3 LKR FDs, 1 EUR FD",
            investments: [
                {
                    id: 'i6',
                    type: "Fixed Deposit",
                    ref: "FD-SAMP-112",
                    currency: "LKR",
                    rate: "10.00%",
                    maturity: "2026-08-15",
                    amount: "LKR 500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'i7',
                    type: "Fixed Deposit",
                    ref: "FD-EUR-001",
                    currency: "EUR",
                    rate: "1.50%",
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

            {/* Header Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '8px',
                    backgroundColor: '#dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TrendingUp size={28} className="text-green" />
                </div>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                        Investment Details
                    </h1>
                    <div style={{ marginTop: '4px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Investments: </span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalInvestments}</span>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Active FDs</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.activeFDs}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Maturing (30 Days)</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.maturingSoon}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Avg Return Rate</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>{summaryData.avgReturn}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>YTD Interest</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>+Rs 235M</div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                {/* Investment Distribution */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Investment Distribution (Million LKR)</h3>
                    <div style={{ height: '200px' }}>
                        <Bar
                            data={categoryDistributionData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Maturity Profile */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Maturity Profile</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '180px', height: '180px' }}>
                            <Doughnut
                                data={maturityProfileData}
                                options={{
                                    cutout: '0%',
                                    plugins: { legend: { display: false } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                        {maturityProfileData.labels.map((label, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '12px', height: '8px', backgroundColor: maturityProfileData.datasets[0].backgroundColor[index] }}></div>
                                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{label}: {maturityProfileData.datasets[0].data[index]}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '16px', marginTop: '48px', paddingLeft: '4px' }}>Detailed Breakdown by Bank</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '48px' }}>
                {banks.map((bank) => (
                    <div key={bank.id}>

                        {/* Bank Header Info - Outside Table */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', paddingLeft: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={32} />
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>{bank.name}</h3>
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{bank.count} active investments ({bank.desc})</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{bank.totalVolume}</div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{bank.share}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper - Dashboard Entity Overview Style */}
                        <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                            <table className="data-table" style={{ borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ paddingLeft: '24px', width: '25%' }}>REFERENCE</th>
                                        <th>TYPE</th>
                                        <th>CURRENCY</th>
                                        <th>RATE</th>
                                        <th>MATURITY DATE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.investments.map((inv) => (
                                        <tr key={inv.id} className="hover-row">
                                            <td style={{ paddingLeft: '24px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{inv.ref}</div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{inv.type}</td>
                                            <td>
                                                <span style={{
                                                    fontSize: '12px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                                                    backgroundColor: inv.currency === 'LKR' ? '#e0f2fe' : inv.currency === 'USD' ? '#dcfce7' : '#fef3c7',
                                                    color: inv.currency === 'LKR' ? '#0369a1' : inv.currency === 'USD' ? '#15803d' : '#b45309'
                                                }}>
                                                    {inv.currency}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{inv.rate}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{inv.maturity}</td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                                <div
                                                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', fontFamily: 'monospace', cursor: inv.isForeign ? 'help' : 'default' }}
                                                    title={inv.isForeign ? inv.lkrAmount : ''}
                                                >
                                                    {inv.amount}
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
