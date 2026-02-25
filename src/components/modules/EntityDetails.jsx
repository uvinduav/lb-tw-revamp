import React from 'react';
import {
    Building2,
    Wallet,
    CreditCard,
    Activity,
    Download,
    RotateCw,
    LineChart
} from 'lucide-react';
import bankLogoCom from '../../assets/bank-icons/comb.png';
import bankLogoHnb from '../../assets/bank-icons/hnb.png';
import bankLogoSc from '../../assets/bank-icons/scbl.png';
import bankLogoSamp from '../../assets/bank-icons/sampath.png';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
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
                    fontSize: size > 20 ? '10px' : '8px',
                    fontWeight: 600,
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}
            >
                {name ? name.charAt(0) : 'E'}
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

const EntityDetails = ({ entity, onNavigate }) => {
    if (!entity) return null;

    // Mock Consolidated Data for this Entity
    const summaryWidgets = [
        {
            title: "Total Cash",
            value: entity.balance || "LKR 0.00",
            change: "+2.4%",
            changeType: "positive",
            icon: Wallet
        },
        {
            title: "Total Debt",
            value: "LKR 450,000,000.00", // Mock
            change: "-1.2%",
            changeType: "positive", // Debt going down is good
            icon: CreditCard
        },
        {
            title: "Investments",
            value: "LKR 150,000,000.00", // Mock
            change: "+3.2%",
            changeType: "positive",
            icon: LineChart
        },
        {
            title: "Net Position",
            value: "LKR 800,500,000.00", // Mock
            change: "+5.6%",
            changeType: "positive",
            icon: Activity
        }
    ];

    // Mock Account Data - Summary by Bank
    const accountData = [
        { bank: 'Commercial Bank', logo: bankLogoCom, counts: 3, savings: 'Rs 150.00M', current: 'Rs 300.00M', fd: 'Rs 0.00M', stl: 'Rs 1,000.00M', ltl: 'Rs 0.00M', total: 'Rs 1,450.00M' },
        { bank: 'Hatton National Bank', logo: bankLogoHnb, counts: 2, savings: 'Rs 138.72M', current: 'Rs 205.35M', fd: 'Rs 0.00M', stl: 'Rs 0.00M', ltl: 'Rs 6.00M', total: 'Rs 350.07M' },
        { bank: 'Standard Chartered', logo: bankLogoSc, counts: 4, savings: 'Rs 0.00M', current: 'Rs 0.00M', fd: 'Rs 20,000.00M', stl: 'Rs 0.00M', ltl: 'Rs 0.00M', total: 'Rs 20,000.00M' },
        { bank: 'Sampath Bank', logo: bankLogoSamp, counts: 1, savings: 'Rs 0.00M', current: 'Rs 0.00M', fd: 'Rs 16,031.31M', stl: 'Rs 1,303.60M', ltl: 'Rs 0.00M', total: 'Rs 17,334.91M' },
    ];

    // Mock Chart Data
    const currencyDistributionData = {
        labels: ['LKR', 'USD', 'EUR'],
        datasets: [{
            data: [75, 20, 5],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            borderWidth: 0,
        }]
    };



    return (
        <div className="dashboard-main-wrapper" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

            <div className="dashboard-container" style={{ padding: '24px' }}>

                {/* Header, Summary & Chart Section */}
                <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    {/* Entity Header Info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <LogoImage src={entity.logo} name={entity.name} color={entity.color} size={48} />
                            <div>
                                <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>
                                    {entity.name}
                                </h1>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Building2 size={14} /> {entity.banks} Banks
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Wallet size={14} /> {entity.accounts} Accounts
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Summary Widgets - 4 Columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
                        {summaryWidgets.map((widget, index) => {
                            const Icon = widget.icon;
                            return (
                                <div key={index} className="widget-card">
                                    <div className="widget-header">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <h3 className="widget-title" style={{ margin: 0 }}>{widget.title}</h3>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '12px' }}>
                                        <div className="widget-value-row">
                                            <span className="widget-value">{widget.value}</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Currency Distribution - Dashboard Style */}
                    <div className="widget-card" style={{ marginBottom: 0 }}>
                        <div className="widget-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <h3 className="widget-title" style={{ margin: 0 }}>Currency Distribution</h3>
                            </div>
                            <RotateCw size={14} className="text-gray" style={{ cursor: 'pointer' }} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', padding: '16px 0' }}>
                            {/* Left: Chart */}
                            <div style={{ width: '150px', height: '150px', position: 'relative', flexShrink: 0 }}>
                                <Doughnut
                                    data={currencyDistributionData}
                                    options={{
                                        cutout: '0%', // Full pie as per dashboard images
                                        plugins: { legend: { display: false } },
                                        maintainAspectRatio: false
                                    }}
                                />
                            </div>

                            {/* Right: Data Table */}
                            <div style={{ flex: 1 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                                            <th style={{ textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>CURRENCY</th>
                                            <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>AMOUNT</th>
                                            <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>LKR EQUIVALENT</th>
                                            <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>SHARE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { color: '#3b82f6', currency: 'LKR', amount: '954,945,469.80', lkr: 'Rs 954,945,469.80', share: '75.0%' },
                                            { color: '#10b981', currency: 'USD', amount: '1,200,000.00', lkr: 'Rs 280,000,000.00', share: '20.0%' },
                                            { color: '#f59e0b', currency: 'EUR', amount: '240,000.00', lkr: 'Rs 72,000,000.00', share: '5.0%' }
                                        ].map((item, index, array) => (
                                            <tr key={index} style={{ borderBottom: index < array.length - 1 ? '1px solid #f3f4f6' : 'none', height: '40px' }}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></div>
                                                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-main)' }}>{item.currency}</span>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{item.currency} {item.amount}</div>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{item.lkr}</div>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)', fontFamily: 'monospace' }}>{item.share}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Associated Accounts Table */}
                <div id="associated-accounts" style={{ marginTop: '32px' }}>
                    <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Associated Accounts</h2>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Click to see detailed list of all accounts by bank</p>
                    </div>

                    <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)', overflowX: 'auto' }}>
                        <table className="data-table" style={{ minWidth: '1200px' }}>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th style={{ paddingLeft: '24px' }}>BANK</th>
                                    <th>NO. OF ACCOUNTS</th>
                                    <th style={{ textAlign: 'right' }}>TOTAL BALANCE</th>
                                    <th style={{ textAlign: 'right' }}>SAVINGS</th>
                                    <th style={{ textAlign: 'right' }}>CURRENT</th>
                                    <th style={{ textAlign: 'right' }}>FD</th>
                                    <th style={{ textAlign: 'right' }}>STL</th>
                                    <th style={{ textAlign: 'right', paddingRight: '24px' }}>LTL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountData.map((account, idx) => (
                                    <tr key={idx} className="hover-row" onClick={() => onNavigate && onNavigate('Bank Details', entity, account.bank)}>
                                        <td style={{ paddingLeft: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <LogoImage src={account.logo} name={account.bank} size={24} />
                                                <span style={{ fontWeight: 500 }}>{account.bank}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--color-text-main)', textAlign: 'center' }}>{account.counts}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 400, color: 'var(--color-text-main)' }}>{account.total}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{account.savings}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{account.current}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{account.fd}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{account.stl}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{account.ltl}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EntityDetails;
