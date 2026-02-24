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

import bankLogoSc from '../../assets/bank-icons/scbl.png';
import bankLogoNtb from '../../assets/bank-icons/ntb.png';
import bankLogoCiti from '../../assets/bank-icons/citi.png';
import bankLogoHnb from '../../assets/bank-icons/hnb.png';
import bankLogoBoc from '../../assets/bank-icons/bocc.png';
import bankLogoCom from '../../assets/bank-icons/comb.png';
import bankLogoDeut from '../../assets/bank-icons/deut.png';
import bankLogoSamp from '../../assets/bank-icons/sampath.png';
import bankLogoNdb from '../../assets/bank-icons/ndb.png';
import bankLogoPb from '../../assets/bank-icons/pb.png';
import bankLogoDfcc from '../../assets/bank-icons/dfcc.png';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const LogoPlaceholder = ({ name, color, size = 20 }) => (
    <div
        className="rounded flex items-center justify-center font-semibold border border-black/5 shrink-0"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color || '#f3f4f6',
            fontSize: size > 20 ? '10px' : '9px',
            color: color ? 'rgba(0,0,0,0.5)' : '#9ca3af',
        }}
    >
        {name ? name.charAt(0) : 'E'}
    </div>
);

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
                {name ? name.charAt(0) : 'B'}
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
        const { ctx, chartArea, scales: { x, y } } = chart;
        const dataset = chart.data.datasets[0];

        ctx.save();
        dataset.data.forEach((value, index) => {
            if (value === 0) {
                const meta = chart.getDatasetMeta(0);
                const bar = meta.data[index];
                if (!bar) return;

                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Very light and transparent ghost column
                const barWidth = 40; // match barThickness
                ctx.fillRect(
                    bar.x - barWidth / 2,
                    chartArea.top,
                    barWidth,
                    chartArea.bottom - chartArea.top
                );
            }
        });
        ctx.restore();
    }
};

ChartJS.register(ghostBarsPlugin);

const CashPositionDetails = () => {
    // Mock Data
    const summaryData = {
        totalCash: "Rs 191,460,241,694.04",
        netLiquidity: "Rs 185,200,000,000.00",
        activeAccounts: 45,
        totalBanks: 11
    };

    const chartLabels = ['Standard Chartered', 'Nations Trust Bank', 'Citi Bank', 'Hatton National Bank', 'Bank of China', 'Commercial Bank', 'Deutsche Bank', 'Sampath Bank', 'NDB Bank', 'People\'s Bank', 'DFCC Bank'];
    const chartDataValues = [145000, 28500, 12400, 6700, 4200, 18500, 1200, 9300, 3400, 850, 0];

    const bankColorMap = {
        'Nations Trust Bank': '#EE018B',
        'Standard Chartered': '#38D200',
        'People\'s Bank': '#FDB314',
        'NDB Bank': '#151515',
        'Sampath Bank': '#F17116',
        'Hatton National Bank': '#24ACE6',
        'Deutsche Bank': '#0018A8',
        'Citi Bank': '#255BE3',
        'Bank of China': '#B10A32',
        'Commercial Bank': '#0075CF',
        'DFCC Bank': '#ED1C24'
    };

    const bankColors = chartLabels.map(label => bankColorMap[label] || '#9ca3af');

    const bankDistributionData = {
        labels: chartLabels,
        datasets: [{
            label: 'Cash (Million LKR)',
            data: chartDataValues,
            backgroundColor: bankColors,
            borderRadius: 0,
            barThickness: 40, // thinner bars for more items
            minBarLength: 0,
            hoverBackgroundColor: bankColors.map(c => c + 'dd') // Slightly transparent on hover
        }]
    };

    const banks = [
        {
            id: 1,
            name: "Standard Chartered",
            logo: bankLogoSc,
            color: "#e0f2fe",
            totalBalance: "LKR 145,000,000,000.00",
            share: "65.3% of total",
            accountCount: 5,
            accountDesc: "3 USD, 1 EUR, 1 LKR",
            accounts: [
                {
                    id: 'sc1',
                    company: "Lion Brewery Sri Lanka - Salary Payments",
                    companyColor: "#f0fdf4",
                    accountNo: "01854228901",
                    currency: "USD",
                    type: "Current",
                    balance: "USD 450,000,000.00",
                    lkrBalance: "LKR 144,000,000,000.00",
                    isForeign: true
                },
                {
                    id: 'sc2',
                    company: "Lion Brewery Sri Lanka - General Operations",
                    companyColor: "#f0fdf4",
                    accountNo: "01854224201",
                    currency: "USD",
                    type: "Current",
                    balance: "USD 2,500,000.00",
                    lkrBalance: "LKR 800,000,000.00",
                    isForeign: true
                },
                {
                    id: 'sc3',
                    company: "Lion Brewery Sri Lanka - Vendor Payments",
                    companyColor: "#f0fdf4",
                    accountNo: "01854224202",
                    currency: "EUR",
                    type: "Current",
                    balance: "EUR 540,540.00",
                    lkrBalance: "LKR 198,878,720.00",
                    isForeign: true
                },
                {
                    id: 'sc4',
                    company: "Lion Brewery Sri Lanka - CAPEX",
                    companyColor: "#f0fdf4",
                    accountNo: "01854228903",
                    currency: "LKR",
                    type: "Current",
                    balance: "LKR 1,121,280.00",
                    lkrBalance: "LKR 1,121,280.00",
                    isForeign: false
                },
                {
                    id: 'sc5',
                    company: "Lion Brewery Sri Lanka - Loan Servicing",
                    companyColor: "#f0fdf4",
                    accountNo: "01854228901",
                    currency: "LKR",
                    type: "CDA",
                    balance: "LKR 0.00",
                    lkrBalance: "LKR 0.00",
                    isForeign: false
                }
            ],
            currencyBreakdown: [
                { code: 'USD', amount: '452,500,000.00', lkr: '144,800,000,000.00' },
                { code: 'EUR', amount: '540,540.00', lkr: '198,878,720.00' },
                { code: 'LKR', amount: '1,121,280.00', lkr: '1,121,280.00' }
            ]
        },
        {
            id: 2,
            name: "Bank of China",
            logo: bankLogoBoc,
            color: "#fef2f2",
            totalBalance: "LKR 5,600,000,000.00",
            share: "2.5% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                {
                    id: 'boc1',
                    company: "Lion Brewery Sri Lanka - General Operations",
                    companyColor: "#f0fdf4",
                    accountNo: "00109955874",
                    currency: "LKR",
                    type: "Savings",
                    balance: "LKR 5,600,000,000.00",
                    lkrBalance: "LKR 5,600,000,000.00",
                    isForeign: false
                }
            ],
            currencyBreakdown: [
                { code: 'LKR', amount: '5,600,000,000.00', lkr: '5,600,000,000.00' }
            ]
        },
        {
            id: 3,
            name: "Commercial Bank",
            logo: bankLogoCom,
            color: "#eff6ff",
            totalBalance: "LKR 18,500,000,000.00",
            share: "8.3% of total",
            accountCount: 4,
            accountDesc: "2 LKR, 2 USD",
            accounts: [
                {
                    id: 'comb1',
                    company: "Millers Brewery Ltd - Vendor Payments",
                    companyColor: "#eff6ff",
                    accountNo: "1500428010",
                    currency: "LKR",
                    type: "Current",
                    balance: "LKR 8,500,000,000.00",
                    lkrBalance: "LKR 8,500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'comb2',
                    company: "Millers Brewery Ltd - General Operations",
                    companyColor: "#eff6ff",
                    accountNo: "1500420040",
                    currency: "LKR",
                    type: "Savings",
                    balance: "LKR 1,500,000,000.00",
                    lkrBalance: "LKR 1,500,000,000.00",
                    isForeign: false
                },
                {
                    id: 'comb3',
                    company: "Lion Brewery Sri Lanka - Salary Payments",
                    companyColor: "#f0fdf4",
                    accountNo: "1500420159",
                    currency: "USD",
                    type: "Current",
                    balance: "USD 21,875,000.00",
                    lkrBalance: "LKR 7,000,000,000.00",
                    isForeign: true
                },
                {
                    id: 'comb4',
                    company: "Lion Brewery Sri Lanka - CAPEX",
                    companyColor: "#f0fdf4",
                    accountNo: "1500420801",
                    currency: "LKR",
                    type: "Current",
                    balance: "LKR 1,500,000,000.00",
                    lkrBalance: "LKR 1,500,000,000.00",
                    isForeign: false
                }
            ],
            currencyBreakdown: [
                { code: 'LKR', amount: '11,500,000,000.00', lkr: '11,500,000,000.00' },
                { code: 'USD', amount: '21,875,000.00', lkr: '7,000,000,000.00' }
            ]
        },
        {
            id: 4,
            name: "Nations Trust Bank",
            logo: bankLogoNtb,
            color: "#f0fdf4",
            totalBalance: "LKR 28,500,000,000.00",
            share: "12.8% of total",
            accountCount: 2,
            accountDesc: "2 LKR",
            accounts: [
                { id: 'ntb1', company: "Lion Brewery Sri Lanka - Loan Servicing", companyColor: "#f0fdf4", accountNo: "10023451122", currency: "LKR", type: "Savings", balance: "LKR 28,500,000,000.00", lkrBalance: "LKR 28,500,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '28,500,000,000.00', lkr: '28,500,000,000.00' }]
        },
        {
            id: 5,
            name: "Hatton National Bank",
            logo: bankLogoHnb,
            color: "#fefce8",
            totalBalance: "LKR 6,700,000,000.00",
            share: "3.0% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                { id: 'hnb1', company: "Lion Brewery Sri Lanka - General Operations", companyColor: "#f0fdf4", accountNo: "00344553344", currency: "LKR", type: "Current", balance: "LKR 6,700,000,000.00", lkrBalance: "LKR 6,700,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '6,700,000,000.00', lkr: '6,700,000,000.00' }]
        },
        // Adding other banks with placeholder data to match the chart visualization
        {
            id: 6,
            name: "Citi Bank",
            logo: bankLogoCiti,
            color: "#f1f5f9",
            totalBalance: "LKR 12,400,000,000.00",
            share: "5.6% of total",
            accountCount: 2,
            accountDesc: "1 USD, 1 LKR",
            accounts: [
                { id: 'citi1', company: "Lion Brewery Sri Lanka - Vendor Payments", companyColor: "#f0fdf4", accountNo: "82345555566", currency: "USD", type: "Current", balance: "USD 20,000,000.00", lkrBalance: "LKR 6,400,000,000.00", isForeign: true },
                { id: 'citi2', company: "Luxury Brands - Salary Payments", companyColor: "#fef2f2", accountNo: "82345557788", currency: "LKR", type: "Savings", balance: "LKR 6,000,000,000.00", lkrBalance: "LKR 6,000,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'USD', amount: '20,000,000.00', lkr: '6,400,000,000.00' }, { code: 'LKR', amount: '6,000,000,000.00', lkr: '6,000,000,000.00' }]
        },
        {
            id: 7,
            name: "Deutsche Bank",
            logo: bankLogoDeut,
            color: "#eff6ff",
            totalBalance: "LKR 1,200,000,000.00",
            share: "0.5% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                { id: 'db1', company: "Lion Brewery Sri Lanka - General Operations", companyColor: "#f0fdf4", accountNo: "00567889900", currency: "LKR", type: "Current", balance: "LKR 1,200,000,000.00", lkrBalance: "LKR 1,200,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '1,200,000,000.00', lkr: '1,200,000,000.00' }]
        },
        {
            id: 8,
            name: "Sampath Bank",
            logo: bankLogoSamp,
            color: "#fff7ed",
            totalBalance: "LKR 9,300,000,000.00",
            share: "4.2% of total",
            accountCount: 2,
            accountDesc: "2 LKR",
            accounts: [
                { id: 'samp1', company: "Pubs'N Places Pvt Ltd - CAPEX", companyColor: "#fff7ed", accountNo: "10024452211", currency: "LKR", type: "Savings", balance: "LKR 9,300,000,000.00", lkrBalance: "LKR 9,300,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '9,300,000,000.00', lkr: '9,300,000,000.00' }]
        },
        {
            id: 9,
            name: "NDB Bank",
            logo: bankLogoNdb,
            color: "#fefce8",
            totalBalance: "LKR 3,400,000,000.00",
            share: "1.5% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                { id: 'ndb1', company: "Retail Spaces Pvt Ltd - General Operations", companyColor: "#fefce8", accountNo: "10044554433", currency: "LKR", type: "Current", balance: "LKR 3,400,000,000.00", lkrBalance: "LKR 3,400,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '3,400,000,000.00', lkr: '3,400,000,000.00' }]
        },
        {
            id: 10,
            name: "People's Bank",
            logo: bankLogoPb,
            color: "#fef2f2",
            totalBalance: "LKR 850,000,000.00",
            share: "0.4% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                { id: 'pb1', company: "Lion Brewery Sri Lanka - Vendor Payments", companyColor: "#f0fdf4", accountNo: "10066776655", currency: "LKR", type: "Savings", balance: "LKR 850,000,000.00", lkrBalance: "LKR 850,000,000.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '850,000,000.00', lkr: '850,000,000.00' }]
        },
        {
            id: 11,
            name: "DFCC Bank",
            logo: bankLogoDfcc,
            color: "#f0fdf4",
            totalBalance: "Rs 0.00",
            share: "0.0% of total",
            accountCount: 1,
            accountDesc: "1 LKR",
            accounts: [
                { id: 'dfcc1', company: "Luxury Brands - Loan Servicing", companyColor: "#fef2f2", accountNo: "00889988877", currency: "LKR", type: "Current", balance: "LKR 0.00", lkrBalance: "LKR 0.00", isForeign: false }
            ],
            currencyBreakdown: [{ code: 'LKR', amount: '0.00', lkr: '0.00' }]
        }
    ];

    return (
        <div className="h-full overflow-y-auto p-6">

            <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-text-main m-0">
                            Cash Breakdown by Bank
                        </h1>
                        <div className="mt-1 text-[13px] font-normal text-text-secondary flex items-center gap-2">
                            <span>Total: {summaryData.totalCash}</span>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="mb-0">
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">Bank-wise Cash Distribution (Million LKR)</h3>
                        <div style={{ height: '300px' }}>
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
                                    onClick: (event, elements) => {
                                        if (elements.length > 0) {
                                            const index = elements[0].index;
                                            const bankName = chartLabels[index];
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
                                            grace: '10%' // Add some space at the top for labels
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

            {/* Detailed Breakdown */}
            <div className="flex flex-col gap-12 pb-12">
                {banks.map((bank) => (
                    <div key={bank.id} id={`bank-${bank.name.replace(/\s+/g, '-').toLowerCase()}`}>

                        {/* Bank Header Info - Outside Table */}
                        <div className="flex justify-between items-end mb-4 pl-1">
                            <div className="flex items-center gap-3">
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={40} />
                                <div>
                                    <h3 className="text-base font-semibold text-text-main m-0">{bank.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                                        <span>{bank.accountCount} accounts</span>
                                        <span className="text-gray-200">•</span>
                                        <span>{bank.share}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-base font-semibold text-text-main leading-tight">{bank.totalBalance}</div>
                                <div className="text-xs text-text-secondary mt-1 font-normal flex items-center justify-end">
                                    {bank.currencyBreakdown.map((curr, idx) => (
                                        <React.Fragment key={idx}>
                                            <span>{curr.code} {curr.amount}</span>
                                            {idx < bank.currencyBreakdown.length - 1 && (
                                                <span className="text-gray-200 text-[10px] mx-3">|</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Table wrapper */}
                        <div className="m-0 bg-white border-t border-border overflow-x-auto">
                            <table className="w-full border-collapse text-[13px]">
                                <thead className="sticky top-0 z-10">
                                    <tr>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">COMPANY</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">ACCOUNT NUMBER</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">TYPE</th>
                                        <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">BALANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.accounts.map((account) => (
                                        <tr key={account.id} className="hover:bg-bg-subtle transition-colors duration-150">
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <LogoPlaceholder name={account.company} color={account.companyColor} />
                                                    <div className="text-[13px] font-normal text-text-main">{account.company}</div>
                                                </div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className="text-[13px] font-normal text-text-main font-mono">{account.accountNo}</div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className="text-[13px] font-normal text-text-main">{account.type}</div>
                                            </td>
                                            <td className="pr-6 px-2.5 py-1 border-b border-border text-right whitespace-nowrap">
                                                <div className="text-[13px] font-normal text-text-main font-mono inline-flex items-center gap-1">
                                                    <span className="text-gray-400">{account.balance.split(' ')[0]}</span>
                                                    <span>{account.balance.split(' ')[1]}</span>
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
