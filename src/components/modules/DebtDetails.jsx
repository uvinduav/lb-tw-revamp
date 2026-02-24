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
        <div className="h-full overflow-y-auto p-6">

            <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
                {/* Header Section */}
                <div className="mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-text-main m-0">
                            Debt Breakdown by Bank
                        </h1>
                        <div className="mt-1 text-[13px] font-normal text-text-secondary flex items-center gap-3">
                            <span>Total Outstanding: {summaryData.totalOutstanding}</span>
                            <span className="text-gray-200">•</span>
                            <span>WACD: {summaryData.wacd}</span>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">Total Loans</div>
                        <div className="text-lg font-semibold text-text-main">{summaryData.totalLoans}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">Short-Term Loans</div>
                        <div className="text-lg font-semibold text-text-main">{summaryData.shortTermLoans.count}</div>
                        <div className="text-[11px] text-text-secondary mt-1">{summaryData.shortTermLoans.value}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">Long-Term Loans</div>
                        <div className="text-lg font-semibold text-text-main">{summaryData.longTermLoans.count}</div>
                        <div className="text-[11px] text-text-secondary mt-1">{summaryData.longTermLoans.value}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-border">
                        <div className="text-xs text-text-secondary mb-2">WACD</div>
                        <div className="text-lg font-semibold text-red-500">{summaryData.wacd}</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="flex gap-6 mb-0">
                    {/* Bank-wise Debt Distribution */}
                    <div className="flex-1 p-4 bg-white rounded-lg border border-border">
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">Bank-wise Debt Distribution (Million LKR)</h3>
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
                    <div className="flex-1 p-4 bg-white rounded-lg border border-border">
                        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">Debt by Interest Type</h3>
                        <div className="h-[200px] flex items-center justify-center">
                            <div className="w-[180px] h-[180px]">
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
                        <div className="flex justify-center gap-4 mt-4">
                            {interestTypeData.labels.map((label, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                    <div className="w-3 h-2" style={{ backgroundColor: interestTypeData.datasets[0].backgroundColor[index] }}></div>
                                    <span className="text-[11px] text-text-secondary">{label}: {interestTypeData.datasets[0].data[index]}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12 pb-12">
                {banks.map((bank) => (
                    <div key={bank.id} id={`bank-section-${bank.id}`}>

                        {/* Bank Header Info */}
                        <div className="flex justify-between items-end mb-4 pl-1">
                            <div className="flex items-center gap-3">
                                <LogoImage src={bank.logo} name={bank.name} color={bank.color} size={40} />
                                <div>
                                    <h3 className="text-base font-semibold text-text-main m-0">{bank.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                                        <span>{bank.loanCount} loans ({bank.loanDesc})</span>
                                        <span className="text-gray-200">•</span>
                                        <span>{bank.share}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-base font-semibold text-text-main leading-tight">{bank.totalOutstanding}</div>
                                <div className="text-xs text-text-secondary mt-1 font-normal flex items-center justify-end">
                                    <span className="text-gray-400">Avg Rate: {bank.avgRate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="m-0 bg-white border-t border-border overflow-x-auto">
                            <table className="w-full border-collapse text-[13px]">
                                <thead className="sticky top-0 z-10">
                                    <tr>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">LOAN FACILITY</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">TYPE</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">RATE</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">DAILY ACCRUAL</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">MATURITY</th>
                                        <th className="bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">FREQUENCY</th>
                                        <th className="bg-[#fafafa] text-right pr-6 px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8 whitespace-nowrap">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bank.loans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-bg-subtle transition-colors duration-150">
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className="text-[13px] font-medium text-text-main">{loan.name}</div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border whitespace-nowrap">
                                                <div className={`text-[13px] text-text-main ${loan.margin ? 'cursor-help' : ''}`} title={loan.margin || ''}>
                                                    {loan.type}
                                                </div>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 font-mono text-text-main whitespace-nowrap">{loan.rate}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 font-mono text-text-main whitespace-nowrap">
                                                <span className="text-gray-400">{loan.accrual.split(' ')[0]}</span>
                                                <span> {loan.accrual.split(' ')[1]}</span>
                                            </td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">{loan.maturity}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-text-main whitespace-nowrap">{loan.frequency}</td>
                                            <td className="px-2.5 py-1 border-b border-border text-right pr-6 whitespace-nowrap">
                                                <div
                                                    className={`text-[13px] font-normal text-text-main font-mono inline-flex items-center gap-1 ${loan.isForeign ? 'cursor-help' : ''}`}
                                                    title={loan.isForeign ? loan.lkrAmount : ''}
                                                >
                                                    <span className="text-gray-400">{loan.amount.split(' ')[0]}</span>
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
