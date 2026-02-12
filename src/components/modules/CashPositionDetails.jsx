import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
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

const CashPositionDetails = ({ onNavigate }) => {
    // Mock Data
    const summaryData = {
        totalCash: "Rs 7,721,100,000.43",
        netLiquidity: "Rs 4,324,850,000.36",
        activeAccounts: 12,
        totalBanks: 6
    };

    const bankDistributionData = {
        labels: ['Lion Brewery', 'Ceylon Beverage', 'Luxury Brands'],
        datasets: [{
            label: 'Cash',
            data: [5120.6, 1250.5, 320.5],
            backgroundColor: '#3b82f6',
            borderRadius: 4,
            barThickness: 60
        }]
    };

    const currencyDistributionData = {
        labels: ['LKR', 'USD', 'EUR'],
        datasets: [{
            data: [75.5, 20.0, 4.5],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    const entities = [
        {
            id: 1,
            name: "Lion Brewery Sri Lanka",
            logo: "brewery_logo_2.png",
            color: "#fef3c7",
            totalBalance: "Rs 5,120,600,000.43",
            share: "66.3% of total",
            accountCount: 3,
            accountDesc: "2 LKR, 1 USD",
            accounts: [
                {
                    id: 'a1',
                    bank: "Bank of China",
                    accountNo: "7829-2231-0092",
                    currency: "LKR",
                    type: "Savings",
                    rate: "4.50%",
                    balance: "LKR 2,500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'a2',
                    bank: "Standard Chartered",
                    accountNo: "8821-3341-1102",
                    currency: "USD",
                    type: "Current",
                    rate: "0.50%",
                    balance: "USD 8,500,000.00",
                    lkrBalance: "LKR 1,955,000,000.00",
                    isForeign: true
                },
                {
                    id: 'a3',
                    bank: "Hatton National Bank",
                    accountNo: "1122-3344-5566",
                    currency: "LKR",
                    type: "Current",
                    rate: "0.00%",
                    balance: "LKR 665,600,000.43",
                    isForeign: false
                }
            ]
        },
        {
            id: 2,
            name: "Ceylon Beverage Holdings",
            logo: "brewery_logo_1.png",
            color: "#e0f2fe",
            totalBalance: "Rs 1,250,500,000.00",
            share: "16.2% of total",
            accountCount: 2,
            accountDesc: "1 LKR, 1 EUR",
            accounts: [
                {
                    id: 'a4',
                    bank: "Commercial Bank",
                    accountNo: "5566-7788-9900",
                    currency: "LKR",
                    type: "Savings",
                    rate: "4.25%",
                    balance: "LKR 800,000,000.00",
                    isForeign: false
                },
                {
                    id: 'a5',
                    bank: "Bank of China",
                    accountNo: "9988-7766-5544",
                    currency: "EUR",
                    type: "Current",
                    rate: "0.10%",
                    balance: "EUR 1,500,000.00",
                    lkrBalance: "LKR 450,500,000.00",
                    isForeign: true
                }
            ]
        },
        {
            id: 3,
            name: "Luxury Brands Pvt Ltd.",
            logo: "brewery_logo_3.png",
            color: "#f1f5f9",
            totalBalance: "Rs 320,500,000.00",
            share: "4.1% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                {
                    id: 'a6',
                    bank: "Sampath Bank",
                    accountNo: "1234-5678-9012",
                    currency: "LKR",
                    type: "Current",
                    rate: "0.00%",
                    balance: "LKR 320,500,000.00",
                    isForeign: false
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
                    backgroundColor: '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Wallet size={28} className="text-blue" />
                </div>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                        Cash Position Details
                    </h1>
                    <div style={{ marginTop: '4px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Total Cash: </span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalCash}</span>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Active Accounts</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.activeAccounts}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Total Banks</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.totalBanks}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Net Liquidity</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)' }}>{summaryData.netLiquidity}</div>
                </div>
                <div className="widget-card" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Daily Change</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>+2.4%</div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                {/* Entity-wise Cash Distribution */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Entity-wise Cash Distribution (Million LKR)</h3>
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

                {/* Cash by Currency */}
                <div className="widget-card" style={{ flex: 1, padding: '16px' }}>
                    <h3 className="widget-title" style={{ marginBottom: '16px' }}>Cash by Currency</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '180px', height: '180px' }}>
                            <Doughnut
                                data={currencyDistributionData}
                                options={{
                                    cutout: '0%',
                                    plugins: { legend: { display: false } },
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                        {currencyDistributionData.labels.map((label, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '12px', height: '8px', backgroundColor: currencyDistributionData.datasets[0].backgroundColor[index] }}></div>
                                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{label}: {currencyDistributionData.datasets[0].data[index]}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '16px', marginTop: '48px', paddingLeft: '4px' }}>Detailed Breakdown by Entity</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '48px' }}>
                {entities.map((entity) => (
                    <div key={entity.id}>

                        {/* Entity Header Info - Outside Table */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', paddingLeft: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <LogoImage src={entity.logo} name={entity.name} color={entity.color} size={32} />
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>{entity.name}</h3>
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{entity.accountCount} accounts ({entity.accountDesc})</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-main)', lineHeight: 1.2 }}>{entity.totalBalance}</div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', justifyContent: 'flex-end' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{entity.share}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper - Dashboard Entity Overview Style */}
                        <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                            <table className="data-table" style={{ borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ paddingLeft: '24px', width: '25%' }}>BANK</th>
                                        <th>ACCOUNT NUMBER</th>
                                        <th>TYPE</th>
                                        <th>CURRENCY</th>
                                        <th>RATE</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>BALANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entity.accounts.map((account) => (
                                        <tr key={account.id} className="hover-row">
                                            <td style={{ paddingLeft: '24px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{account.bank}</div>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{account.accountNo}</td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{account.type}</td>
                                            <td>
                                                <span style={{
                                                    fontSize: '12px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                                                    backgroundColor: account.currency === 'LKR' ? '#e0f2fe' : account.currency === 'USD' ? '#dcfce7' : '#fef3c7',
                                                    color: account.currency === 'LKR' ? '#0369a1' : account.currency === 'USD' ? '#15803d' : '#b45309'
                                                }}>
                                                    {account.currency}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: '13px', color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{account.rate}</td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                                <div
                                                    style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-main)', fontFamily: 'monospace', cursor: account.isForeign ? 'help' : 'default' }}
                                                    title={account.isForeign ? account.lkrBalance : ''}
                                                >
                                                    {account.balance}
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

export default CashPositionDetails;
