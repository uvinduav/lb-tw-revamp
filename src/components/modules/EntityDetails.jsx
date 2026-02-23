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
                className="rounded flex items-center justify-center font-semibold border border-black/5"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color || '#f3f4f6',
                    fontSize: size > 20 ? '10px' : '8px',
                    color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
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
            className="rounded object-cover border border-border"
            style={{ width: `${size}px`, height: `${size}px` }}
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
        <div className="h-full overflow-hidden flex flex-col">

            <div className="flex-1 overflow-y-auto p-6">

                {/* Header, Summary & Chart Section */}
                <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                    {/* Entity Header Info */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <LogoImage src={entity.logo} name={entity.name} color={entity.color} size={48} />
                            <div>
                                <h1 className="text-xl font-semibold text-text-main m-0">
                                    {entity.name}
                                </h1>
                                <div className="flex gap-4 text-[13px] text-text-secondary mt-1">
                                    <span className="flex items-center gap-1.5">
                                        <Building2 size={14} /> {entity.banks} Banks
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Wallet size={14} /> {entity.accounts} Accounts
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Summary Widgets - 4 Columns */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        {summaryWidgets.map((widget, index) => {
                            const Icon = widget.icon;
                            return (
                                <div key={index} className="bg-white border border-border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{widget.title}</h3>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold font-mono text-text-main">{widget.value}</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Currency Distribution - Dashboard Style */}
                    <div className="bg-white border border-border rounded-lg p-4 mb-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">Currency Distribution</h3>
                            </div>
                            <RotateCw size={14} className="text-gray-400 cursor-pointer" />
                        </div>

                        <div className="flex items-center gap-12 py-4">
                            {/* Left: Chart */}
                            <div className="w-[150px] h-[150px] relative shrink-0">
                                <Doughnut
                                    data={currencyDistributionData}
                                    options={{
                                        cutout: '0%',
                                        plugins: { legend: { display: false } },
                                        maintainAspectRatio: false
                                    }}
                                />
                            </div>

                            {/* Right: Data Table */}
                            <div className="flex-1">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-border h-8">
                                            <th className="text-left text-[11px] text-[#888] font-semibold uppercase py-1">CURRENCY</th>
                                            <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">AMOUNT</th>
                                            <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">LKR EQUIVALENT</th>
                                            <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">SHARE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { color: '#3b82f6', currency: 'LKR', amount: '954,945,469.80', lkr: 'Rs 954,945,469.80', share: '75.0%' },
                                            { color: '#10b981', currency: 'USD', amount: '1,200,000.00', lkr: 'Rs 280,000,000.00', share: '20.0%' },
                                            { color: '#f59e0b', currency: 'EUR', amount: '240,000.00', lkr: 'Rs 72,000,000.00', share: '5.0%' }
                                        ].map((item, index, array) => (
                                            <tr key={index} className={`h-10 ${index < array.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                        <span className="text-[13px] font-medium text-text-main">{item.currency}</span>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="text-[13px] font-normal text-text-main font-mono">{item.currency} {item.amount}</div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="text-xs text-text-secondary font-mono">{item.lkr}</div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="text-[13px] font-normal text-text-main font-mono">{item.share}</div>
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
                <div id="associated-accounts" className="mt-8">
                    <div className="mb-4 pl-1">
                        <h2 className="text-lg font-semibold text-text-main mb-1">Associated Accounts</h2>
                        <p className="text-[13px] text-text-secondary">Click to see detailed list of all accounts by bank</p>
                    </div>

                    <div className="m-0 bg-white border-t border-border overflow-x-auto">
                        <table className="w-full min-w-[1200px] border-collapse text-[13px]">
                            <thead className="sticky top-0 z-10">
                                <tr>
                                    <th className="pl-6 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">BANK</th>
                                    <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">NO. OF ACCOUNTS</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">TOTAL BALANCE</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">SAVINGS</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">CURRENT</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">FD</th>
                                    <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">STL</th>
                                    <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">LTL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountData.map((account, idx) => (
                                    <tr key={idx} className="cursor-pointer hover:bg-bg-subtle transition-colors duration-150" onClick={() => onNavigate && onNavigate('Bank Details', entity, account.bank)}>
                                        <td className="pl-6 px-2.5 py-1 border-b border-border">
                                            <div className="flex items-center gap-2">
                                                <LogoImage src={account.logo} name={account.bank} size={24} />
                                                <span className="font-medium">{account.bank}</span>
                                            </div>
                                        </td>
                                        <td className="px-2.5 py-1 border-b border-border text-text-main text-center">{account.counts}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono font-normal text-text-main">{account.total}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{account.savings}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{account.current}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{account.fd}</td>
                                        <td className="px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{account.stl}</td>
                                        <td className="pr-6 px-2.5 py-1 border-b border-border text-right font-mono text-text-main">{account.ltl}</td>
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
