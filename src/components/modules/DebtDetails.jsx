import React from 'react';
import { CreditCard, TrendingUp, TrendingDown, Building2, Wallet } from 'lucide-react';
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

const DebtDetails = ({ onNavigate }) => {
    // Mock Data
    const summaryData = {
        totalOutstanding: "Rs 2,585,033,333.32",
        wacd: "10.04%",
        totalLoans: 6,
        shortTermLoans: { count: 3, value: "Rs 2,328,600,000.00" },
        longTermLoans: { count: 3, value: "Rs 256,433,333.32" }
    };

    const bankDistributionData = {
        labels: ['Bank of China', 'Standard Chartered', 'New Bank 1'],
        datasets: [{
            label: 'Debt',
            data: [2308.9, 275.0, 1.1],
            backgroundColor: '#ef4444',
            borderRadius: 4,
            barThickness: 60
        }]
    };

    const interestTypeData = {
        labels: ['Fixed', 'Floating', 'Hybrid'],
        datasets: [{
            data: [89.9, 10.0, 0.0],
            backgroundColor: ['#3b82f6', '#f97316', '#a855f7'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const banks = [
        {
            id: 1,
            name: "Bank of China",
            logo: "bank_china_logo.png",
            color: "#fee2e2",
            totalOutstanding: "Rs 2,308,933,333.32",
            share: "89.3% of total",
            avgRate: "10.00%",
            loanCount: 3,
            loanDesc: "1 fixed, 2 floating",
            loans: [
                {
                    id: 'l1',
                    name: "USD STL - STLUSD",
                    type: "Fixed",
                    rate: "10.00%",
                    accrual: "USD 2,739.73",
                    maturity: "1 year (2027-01-23)",
                    frequency: "MONTHLY",
                    amount: "USD 10,000,000.00",
                    lkrAmount: "LKR 2,300,000,000.00",
                    isForeign: true
                },
                {
                    id: 'l2',
                    name: "LKR LTL - LTL",
                    type: "Floating",
                    margin: "AWPLR Margin: 1.00%",
                    rate: "7.50%",
                    accrual: "LKR 1,095.89",
                    maturity: "3 years (2028-01-14)",
                    frequency: "MONTHLY",
                    amount: "LKR 5,333,333.32",
                    isForeign: false
                },
                {
                    id: 'l3',
                    name: "LKR STL - GBP002",
                    type: "Floating",
                    margin: "AWPLR Margin: +2.00%",
                    rate: "10.50%",
                    accrual: "LKR 1,035.62",
                    maturity: "1 year (2027-01-29)",
                    frequency: "MONTHLY",
                    amount: "LKR 3,600,000.00",
                    isForeign: false
                }
            ]
        },
        {
            id: 2,
            name: "Standard Chartered",
            logo: "sc_logo.png",
            color: "#dbeafe",
            totalOutstanding: "Rs 275,000,000.00",
            share: "10.6% of total",
            avgRate: "10.45%",
            loanCount: 2,
            loanDesc: "1 fixed, 1 floating",
            loans: [
                {
                    id: 'l4',
                    name: "SGD LTL - 2020204",
                    type: "Floating",
                    margin: "AWPLR Margin: +2.00%",
                    rate: "10.50%",
                    accrual: "SGD 729.17",
                    maturity: "4 years (2030-02-06)",
                    frequency: "MONTHLY",
                    amount: "SGD 2,500,000.00",
                    lkrAmount: "LKR 250,000,000.00",
                    isForeign: true
                },
                {
                    id: 'l5',
                    name: "SGD STL - 082030042908",
                    type: "Fixed",
                    rate: "10.00%",
                    accrual: "SGD 69.44",
                    maturity: "1 year (2027-01-28)",
                    frequency: "BI-ANNUALLY",
                    amount: "SGD 250,000.00",
                    lkrAmount: "LKR 25,000,000.00",
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
                    backgroundColor: '#fee2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CreditCard size={28} className="text-red" />
                </div>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                        Debt Breakdown by Bank
                    </h1>
                    <div style={{ marginTop: '4px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Outstanding: </span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalOutstanding}</span>
                    </div>
                    <div style={{ marginTop: '2px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>WACD: </span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.wacd}</span>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Total Loans</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalLoans}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Short-Term Loans</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.shortTermLoans.count}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{summaryData.shortTermLoans.value}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Long-Term Loans</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.longTermLoans.count}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{summaryData.longTermLoans.value}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>WACD</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>{summaryData.wacd}</div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                {/* Bank-wise Debt Distribution */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Bank-wise Debt Distribution (Million LKR)</h3>
                    <div style={{ height: '200px' }}>
                        <Bar
                            data={bankDistributionData}
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

                {/* Debt by Interest Type */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Debt by Interest Type</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '180px', height: '180px' }}>
                            <Doughnut
                                data={interestTypeData}
                                options={{
                                    cutout: '0%',
                                    plugins: { legend: { display: false } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                        {interestTypeData.labels.map((label, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '12px', height: '8px', backgroundColor: interestTypeData.datasets[0].backgroundColor[index] }}></div>
                                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{label}: {interestTypeData.datasets[0].data[index]}%</span>
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
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{bank.loanCount} loans ({bank.loanDesc})</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{bank.totalOutstanding}</div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{bank.share}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Avg Rate: {bank.avgRate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper - Dashboard Entity Overview Style */}
                        <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                            <table className="data-table" style={{ borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ paddingLeft: '24px', width: '25%' }}>LOAN FACILITY</th>
                                        <th>TYPE</th>
                                        <th>RATE</th>
                                        <th>DAILY ACCRUAL</th>
                                        <th>MATURITY</th>
                                        <th>FREQUENCY</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.loans.map((loan) => (
                                        <tr key={loan.id} className="hover-row">
                                            <td style={{ paddingLeft: '24px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{loan.name}</div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '13px', color: 'var(--color-text-main)', cursor: loan.margin ? 'help' : 'default' }} title={loan.margin || ''}>
                                                    {loan.type}
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{loan.rate}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{loan.accrual}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{loan.maturity}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{loan.frequency}</td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                                <div
                                                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', fontFamily: 'monospace', cursor: loan.isForeign ? 'help' : 'default' }}
                                                    title={loan.isForeign ? loan.lkrAmount : ''}
                                                >
                                                    {loan.amount}
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

export default DebtDetails;
