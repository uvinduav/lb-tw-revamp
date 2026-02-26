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

import bankLogoSc from '../../assets/bank-icons/scbl.png';
import bankLogoBoc from '../../assets/bank-icons/bocc.png';

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

                    const label = value.toLocaleString() + 'M';
                    ctx.fillText(label, bar.x, bar.y - 5);
                }
            });
        });
        ctx.restore();
    }
};

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

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    topLabelsPlugin,
    ghostBarsPlugin
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
                {name ? name.charAt(0) : 'B'}
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


const DebtDetails = () => {
    // Mock Data
    const summaryData = {
        totalOutstanding: "LKR 2,585,033,333.32",
        wacd: "10.04%",
        totalLoans: 6,
        shortTermLoans: { count: 3, value: "LKR 2,328,600,000.00" },
        longTermLoans: { count: 3, value: "LKR 256,433,333.32" }
    };

    const bankDistributionData = {
        labels: ['Bank of China', 'Standard Chartered'],
        datasets: [{
            label: 'Debt (Million LKR)',
            data: [2308, 275],
            backgroundColor: ['#B10A32', '#38D200'],
            borderRadius: 0,
            barThickness: 40,
            minBarLength: 0,
            hoverBackgroundColor: ['#B10A32dd', '#38D200dd']
        }]
    };

    const interestTypeData = {
        labels: ['Fixed', 'Floating'],
        datasets: [{
            data: [90.0, 10.0],
            backgroundColor: ['#3b82f6', '#f97316'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const banks = [
        {
            id: 1,
            name: "Bank of China",
            logo: bankLogoBoc,
            color: "#fee2e2",
            totalOutstanding: "LKR 2,308,933,333.32",
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
            logo: bankLogoSc,
            color: "#dbeafe",
            totalOutstanding: "LKR 275,000,000.00",
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

            <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                            Debt Breakdown by Bank
                        </h1>
                        <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 400, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span>Total Outstanding: {summaryData.totalOutstanding}</span>
                            <span style={{ color: '#e5e7eb' }}>•</span>
                            <span>WACD: {summaryData.wacd}</span>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Total Loans</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalLoans}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Short-Term Loans</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.shortTermLoans.count}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{summaryData.shortTermLoans.value}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Long-Term Loans</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.longTermLoans.count}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{summaryData.longTermLoans.value}</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>WACD</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>{summaryData.wacd}</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '0' }}>
                    {/* Bank-wise Debt Distribution */}
                    <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <h3 className="widget-title" style={{ marginBottom: '16px' }}>Bank-wise Debt Distribution (Million LKR)</h3>
                        <div style={{ height: '200px' }}>
                            <Bar
                                data={bankDistributionData}
                                plugins={[topLabelsPlugin, ghostBarsPlugin]}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    plugins: { legend: { display: false } },
                                    onClick: (event, elements) => {
                                        if (elements.length > 0) {
                                            const index = elements[0].index;
                                            const bankId = banks[index].id;
                                            const element = document.getElementById(`bank-section-${bankId}`);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }
                                    },
                                    onHover: (event, chartElement) => {
                                        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                                    },
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

                    {/* Debt by Interest Type */}
                    <div style={{ flex: 1, padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
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
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '48px' }}>
                {banks.map((bank) => (
                    <div key={bank.id} id={`bank-section-${bank.id}`}>

                        {/* Bank Header Info - Outside Table */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', paddingLeft: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={40} />
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>{bank.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                        <span>{bank.loanCount} loans ({bank.loanDesc})</span>
                                        <span style={{ color: '#e5e7eb' }}>•</span>
                                        <span>{bank.share}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{bank.totalOutstanding}</div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0' }}>
                                    <span style={{ color: '#9ca3af' }}>Avg Rate: {bank.avgRate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper - Dashboard Entity Overview Style */}
                        <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
                            <table className="data-table" style={{ borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap' }}>LOAN FACILITY</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>TYPE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>RATE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>DAILY ACCRUAL</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>MATURITY</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>FREQUENCY</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap' }}>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.loans.map((loan) => (
                                        <tr key={loan.id} className="hover-row">
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{loan.name}</div>
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <div style={{ fontSize: '13px', color: 'var(--color-text-main)', cursor: loan.margin ? 'help' : 'default', whiteSpace: 'nowrap' }} title={loan.margin || ''}>
                                                    {loan.type}
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace', textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <div 
                                                    title={loan.type === 'Floating' && loan.margin ? loan.margin.replace(' Margin: ', ' + ').replace(' + +', ' + ') : ''}
                                                    style={{ cursor: loan.type === 'Floating' ? 'help' : 'default' }}
                                                >
                                                    {loan.rate}
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace', textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <span style={{ color: '#9ca3af' }}>{loan.accrual.split(' ')[0]}</span>
                                                <span> {loan.accrual.split(' ')[1]}</span>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{loan.maturity}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', whiteSpace: 'nowrap' }}>{loan.frequency}</td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px', whiteSpace: 'nowrap', maxWidth: 'none', overflow: 'visible' }}>
                                                <div
                                                    style={{
                                                        fontSize: '13px',
                                                        fontWeight: 400,
                                                        color: 'var(--color-text-main)',
                                                        fontFamily: 'monospace',
                                                        cursor: loan.isForeign ? 'help' : 'default',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    title={loan.isForeign ? loan.lkrAmount : ''}
                                                >
                                                    <span style={{ color: '#9ca3af' }}>{loan.amount.split(' ')[0]}</span>
                                                    <span>{loan.amount.split(' ')[1]}</span>
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
