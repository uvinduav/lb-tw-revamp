import React from 'react';
import {
  Wallet,
  Activity,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Calendar,
  Globe,
  AlertCircle,
  SquareArrowOutUpRight,
  Info,
  LayoutDashboard,
  Building2,
  LineChart,
  Banknote
} from 'lucide-react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController
);

const LogoImage = ({ src, name, color, size = 24 }) => {
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
    <div className="bg-white border border-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{title}</h3>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-[150px] h-[150px] relative shrink-0">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <div className="flex-1 min-w-[300px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border h-8">
                {columns.map((col, index) => (
                  <th key={index} className="text-[11px] text-[#888] font-semibold uppercase py-1" style={{ textAlign: col.align || 'left' }}>
                    {col.header}
                  </th>
                ))}</tr >
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index} className={`h-8 ${index < details.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-1" style={{ textAlign: col.align || 'left' }}>
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
                                  <span className="text-gray-400 font-normal">{parts[0]}</span>
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

const Dashboard = ({ onNavigate }) => {
  const [showAwplrInfo, setShowAwplrInfo] = React.useState(false);
  const [showForexInfo, setShowForexInfo] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');

  const scrollToSection = (id) => {
    // Check for external navigation first
    if (id === 'cash-flow') {
      if (onNavigate) {
        setTimeout(() => onNavigate('Cash Flow'), 0);
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const scrollContainer = document.querySelector('.dashboard-container');
      if (scrollContainer) {
        const offset = 100; // Padding offset for headspace
        scrollContainer.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    }
    setActiveTab(id);
  };

  const handleScroll = (e) => {
    const scrollContainer = e.target;
    const scrollPos = scrollContainer.scrollTop + 120; // offset + generous buffer

    // Check sections in reverse to find the last one that has passed the scroll threshold
    const currentSection = [...tabs].reverse().find(tab => {
      const section = document.getElementById(tab.id);
      return section && section.offsetTop <= scrollPos;
    });

    if (currentSection && currentSection.id !== activeTab) {
      setActiveTab(currentSection.id);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'entity-overview', label: 'Entity Overview', icon: Building2 },
    { id: 'investment-profile', label: 'Investment Profile', icon: LineChart },
    { id: 'awplr-rate', label: 'AWPLR Rate', icon: Activity },
    { id: 'forex-rates', label: 'Forex Rates', icon: Globe },
    { id: 'cash-flow', label: 'Cash Flow', icon: Banknote },
  ];

  // Hardcoded Widgets Data
  const widgets = [
    {
      title: "Total Cash Position",
      value: "LKR 7,721,100,000.43",
      change: "+2.4%",
      changeType: "positive",
      subtext: "Click for details →",
      icon: Wallet,
      onClick: () => onNavigate('Cash Position Details')
    },
    {
      title: "Total Debt Outstanding",
      value: "LKR 3,396,250,000.03",
      change: "",
      changeType: "negative",
      subtext: "4 loans (3 floating)",
      link: "Click for details →",
      icon: CreditCard,
      onClick: () => onNavigate('Debt Details')
    },
    {
      title: "Total Investments",
      value: "LKR 11,488,720,084.07",
      change: "",
      changeType: "positive",
      subtext: "20 Active FDs",
      link: "Click for details →",
      icon: TrendingUp,
      onClick: () => onNavigate('Investment Details')
    },
    {
      title: "Net Liquidity",
      value: "LKR 4,324,850,000.36",
      change: "",
      changeType: "positive",
      subtext: "Cash - Debt",
      icon: Activity
    },
    {
      title: "Weighted Avg Cost of Debt",
      value: "9.36%",
      change: "",
      changeType: "neutral",
      subtext: "Per annum",
      icon: TrendingDown
    },
    {
      title: "WACC (Net of Investment)",
      value: "-0.64%",
      change: "",
      changeType: "negative",
      subtext: "WACD 9.36% - WAIR 10.00%",
      icon: DollarSign
    }
  ];

  // Hardcoded Entity Overview Data
  const entities = [
    {
      id: 1,
      name: "Ceylon Beverage Holdings",
      balance: "LKR 1,250,500,000.00",
      banks: 4,
      accounts: 12,
      currencies: 2,
      logo: "brewery_logo_1.png",
      color: "#e0f2fe" // Muted Blue
    },
    {
      id: 2,
      name: "Lion Beer Ceylon PTE LTD",
      balance: "LKR 845,000,200.00",
      banks: 3,
      accounts: 8,
      currencies: 1,
      logo: "brewery_logo_2.png",
      color: "#fef3c7" // Muted Gold
    },
    {
      id: 3,
      name: "Lion Brewery Sri Lanka",
      balance: "LKR 5,120,600,000.43",
      banks: 6,
      accounts: 24,
      currencies: 3,
      logo: "brewery_logo_2.png",
      color: "#fef3c7" // Muted Gold
    },
    {
      id: 4,
      name: "Luxury Brands Pvt Ltd.",
      balance: "LKR 320,500,000.00",
      banks: 2,
      accounts: 5,
      currencies: 1,
      logo: "brewery_logo_3.png",
      color: "#f1f5f9" // Muted Slate
    },
    {
      id: 5,
      name: "Millers Brewery Ltd",
      balance: "LKR 145,000,000.00",
      banks: 2,
      accounts: 4,
      currencies: 1,
      logo: "brewery_logo_4.png",
      color: "#dcfce7" // Muted Green
    },
    {
      id: 6,
      name: "Pearl Spring Pvt Ltd",
      balance: "LKR 12,000,000.00",
      banks: 1,
      accounts: 2,
      currencies: 1,
      logo: "brewery_logo_4.png",
      color: "#f0fdf4" // Muted Mint
    },
    {
      id: 7,
      name: "Pubs'N Places Pvt Ltd",
      balance: "LKR 8,200,800.00",
      banks: 1,
      accounts: 3,
      currencies: 1,
      logo: "brewery_logo_4.png",
      color: "#f3e8ff" // Muted Purple
    },
    {
      id: 8,
      name: "Retail Spaces Pvt Ltd",
      balance: "LKR 19,300,000.00",
      banks: 1,
      accounts: 2,
      currencies: 1,
      logo: "brewery_logo_4.png",
      color: "#ffedd5" // Muted Orange
    }
  ];

  // Investment Profile Data
  const investmentData = {
    labels: ['LKR', 'USD', 'EUR'],
    datasets: [{
      data: [86.6, 12.6, 0.8],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 4,
    }],
  };

  const investmentDetails = [
    { color: '#3b82f6', label: 'LKR FDs', value: 'LKR 9,950.00M', count: 13, avgRate: '10.01%', banks: 6 },
    { color: '#10b981', label: 'USD FDs', value: 'USD 4.52M', count: 6, avgRate: '3.77%', banks: 3 },
    { color: '#f59e0b', label: 'EUR FDs', value: 'EUR 0.24M', count: 1, avgRate: '1.50%', banks: 1 }
  ];

  const investmentColumns = [
    {
      header: 'CATEGORY', key: 'label', fontWeight: 400, render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
          <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{item.label}</span>
        </div>
      )
    },
    { header: 'VALUE', key: 'value', monospace: true, align: 'right' },
    { header: 'COUNT', key: 'count', monospace: true, align: 'right' },
    { header: 'AVG RATE', key: 'avgRate', monospace: true, color: 'var(--color-green)', align: 'right' },
    { header: 'BANKS', key: 'banks', monospace: true, align: 'right' },
  ];

  // Maturity Profile - All Currencies Data
  const maturityAllData = {
    labels: ['0-3 Months', '3-6 Months', '6-12 Months', '12+ Months'],
    datasets: [{
      data: [74.3, 13.1, 3.9, 8.7],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 4,
    }]
  };

  const maturityAllDetails = [
    { label: '0-3 Months', value: 'LKR 8,538.72M', count: 15, share: '74.3%', color: '#10b981' },
    { label: '3-6 Months', value: 'LKR 1,500.00M', count: 3, share: '13.1%', color: '#3b82f6' },
    { label: '6-12 Months', value: 'LKR 450.00M', count: 1, share: '3.9%', color: '#f59e0b' },
    { label: '12+ Months', value: 'LKR 1,000.00M', count: 1, share: '8.7%', color: '#ef4444' },
  ];

  // Maturity Profile - LKR Data
  const maturityLKRData = {
    labels: ['0-3 Months', '3-6 Months', '6-12 Months'],
    datasets: [{
      data: [14.6, 23.3, 62.2],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 4,
    }]
  };

  const maturityLKRDetails = [
    { label: '0-3 Months', value: 'LKR 534.32M', count: 5, share: '14.6%', color: '#10b981' },
    { label: '3-6 Months', value: 'LKR 853.84M', count: 7, share: '23.3%', color: '#3b82f6' },
    { label: '6-12 Months', value: 'LKR 2281.99M', count: 21, share: '62.2%', color: '#f59e0b' },
  ];

  const maturityColumns = [
    {
      header: 'PERIOD', key: 'label', fontWeight: 400, render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
          <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{item.label}</span>
        </div>
      )
    },
    { header: 'VALUE', key: 'value', monospace: true, align: 'right' },
    { header: 'COUNT', key: 'count', monospace: true, align: 'right' },
    { header: 'SHARE', key: 'share', monospace: true, align: 'right' },
  ];

  // Currency-wise Investment Data
  const currencyWiseData = {
    labels: ['LKR', 'USD', 'EUR'],
    datasets: [{
      data: [86.6, 12.6, 0.8],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 4,
    }]
  };




  const isNegative = (val) => {
    // Check if value contains a minus sign (handles "Rs -100" and "-0.64%")
    return val && typeof val === 'string' && val.includes('-');
  };

  // AWPLR Data
  const awplrMetrics = [
    { title: 'Latest Benchmark', value: '8.99%', subtext: 'As of Jan 30, 2026', color: '#8b5cf6', bg: '#f5f3ff' },
    { title: 'Weekly Change', value: '+4.95%', trend: 'up', color: '#10b981', bg: '#fdfdfd' },
    { title: 'Monthly Change', value: '+1.35%', trend: 'up', color: '#10b981', bg: '#fdfdfd' },
    { title: 'Yearly Change', value: 'N/A', subtext: 'No data', color: '#ef4444', bg: '#fdfdfd' },
  ];

  const awplrTrendData = {
    monthly: {
      labels: ['Jan 2, 2026', 'Jan 30, 2026'],
      datasets: [
        {
          label: 'AWPLR',
          data: [8.87, 8.99],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0,
          pointRadius: 3,
          pointBackgroundColor: '#8b5cf6',
          fill: true,
        }
      ]
    },
    weekly: {
      labels: ['Dec 5, 2025', 'Dec 12, 2025', 'Dec 19, 2025', 'Dec 26, 2025', 'Jan 2, 2026', 'Jan 9, 2026', 'Jan 16, 2026', 'Jan 23, 2026', 'Jan 30, 2026', 'Feb 6, 2026'],
      datasets: [
        {
          label: 'AWPLR',
          data: [8.74, 8.81, 8.78, 8.94, 9.07, 9.19, 8.98, 8.90, 8.88, 9.32],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#8b5cf6',
          fill: true,
        }
      ]
    }
  };

  // Foreign Exchange Rates Data
  const exchangeRates = [
    { id: 1, currency: 'EUR/LKR', name: 'Euro', rate: '300.00', prevRate: '300.70', date: 'Dec 12, 2025', cost: 'LKR 30,000,000', flag: 'https://flagcdn.com/w40/eu.png', change: '-0.70', changePercent: '-0.23%' },
    { id: 2, currency: 'GBP/LKR', name: 'British Pound', rate: '415.39', prevRate: '414.44', date: 'Jan 18, 2026', cost: 'LKR 41,539,000', flag: 'https://flagcdn.com/w40/gb.png', change: '+0.95', changePercent: '+0.23%' },
    { id: 3, currency: 'SGD/LKR', name: 'Singapore Dollar', rate: '100.00', prevRate: '100.15', date: 'Feb 06, 2026', cost: 'LKR 10,000,000', flag: 'https://flagcdn.com/w40/sg.png', change: '-0.15', changePercent: '-0.15%' },
    { id: 4, currency: 'USD/LKR', name: 'US Dollar', rate: '230.00', prevRate: '229.55', date: 'Dec 26, 2025', cost: 'LKR 23,000,000', flag: 'https://flagcdn.com/w40/us.png', change: '+0.45', changePercent: '+0.20%' },
  ];

  const forexOverviewData = [
    { currency: 'USD', deposits: 'USD 4.52M', depVal: 4.52, depRate: '3.77%', loans: 'USD 1.25M', loanVal: 1.25, loanRate: '5.91%', net: 'USD 3.27M', netType: '(Asset)', color: '#3b82f6' },
    { currency: 'EUR', deposits: 'EUR 0.24M', depVal: 0.24, depRate: '1.50%', loans: 'EUR 0.00M', loanVal: 0, loanRate: '0.00%', net: 'EUR 0.24M', netType: '(Asset)', color: '#f59e0b' }
  ];


  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        cornerRadius: 4,
        displayColors: false,
        intersect: false,
        mode: 'index',
      }
    },
    scales: {
      y: {
        border: { display: false },
        grid: { color: '#f3f4f6', drawBorder: false },
        ticks: {
          font: { size: 11, family: 'monospace' },
          color: '#6b7280',
          padding: 8,
          callback: function (value) {
            return value.toFixed(2) + '%';
          }
        }
      },
      x: {
        grid: { display: true, color: '#f3f4f6', drawBorder: false },
        ticks: { font: { size: 10, family: 'Inter, sans-serif' }, color: '#9ca3af', padding: 8, maxRotation: 45, minRotation: 45 },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Search/Tabs Wrapper */}
      <div className="px-6 pt-3 pb-0 shrink-0 border-b border-border bg-white">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <React.Fragment key={tab.id}>
                {tab.id === 'cash-flow' && <div className="h-5 w-px bg-gray-200 mx-2 self-center" />}
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-t border-none cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === tab.id ? 'text-primary-action bg-bg-subtle border-b-2 border-b-primary-action' : 'text-text-secondary bg-transparent hover:text-text-main hover:bg-bg-subtle'}`}
                  onClick={() => scrollToSection(tab.id)}
                >
                  {Icon && <Icon size={14} />}
                  {tab.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6" onScroll={handleScroll}>

        {/* Widgets Grid Section */}
        <div className="bg-bg-subtle -m-6 mb-8 p-6 border-b border-border">
          <div className="mb-6 pl-1">
            <h2 className="text-lg font-semibold text-text-main mb-1">Group Overview</h2>
            <p className="text-[13px] text-text-secondary">Consolidated financial performance metrics</p>
          </div>
          <div id="overview" className="grid grid-cols-3 gap-4 mb-0">
            {widgets.map((widget, index) => {
              const Icon = widget.icon;
              return (
                <div
                  key={index}
                  className={`bg-white border border-border rounded-lg p-4 transition-all duration-200 ${widget.onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''}`}
                  onClick={widget.onClick}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {Icon && <Icon size={14} className="text-gray-400" />}
                      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{widget.title}</h3>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-xl font-bold font-mono ${isNegative(widget.value) ? 'text-red-500' : 'text-text-main'}`}>
                        {widget.value}
                      </span>
                      {widget.change && (
                        <span className={`text-xs font-semibold ${widget.changeType === 'positive' ? 'text-green-600' :
                          widget.changeType === 'negative' ? 'text-red-500' : 'text-gray-400'
                          }`}>
                          {widget.change}
                        </span>
                      )}
                    </div>
                    {widget.onClick ? (
                      <div className="mt-1">
                        <span className="text-[11px] font-medium text-blue-500">View more</span>
                      </div>
                    ) : (
                      <p className="text-xs text-text-secondary mt-1">
                        {widget.subtext}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Entity Overview Section */}
        <div id="entity-overview" className="mt-8">
          <div className="mb-4 pl-1">
            <h2 className="text-lg font-semibold text-text-main mb-1">Entity Overview</h2>
            <p className="text-[13px] text-text-secondary">Click to drill down</p>
          </div>

          <div className="m-0 bg-white border-t border-border overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-[13px]">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="w-10 bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8"></th>
                  <th className="w-[30%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">ENTITY NAME</th>
                  <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">TOTAL BALANCE (LKR)</th>
                  <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">ACCOUNTS</th>
                  <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">BANKS</th>
                  <th className="bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">CURRENCIES</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((entity) => (
                  <tr
                    key={entity.id}
                    className="cursor-pointer hover:bg-bg-subtle transition-colors duration-150"
                    onClick={() => onNavigate && onNavigate('Entity Details', entity)}
                  >
                    <td className="px-2.5 py-1 border-b border-border">
                      <LogoImage src={entity.logo} name={entity.name} color={entity.color} />
                    </td>
                    <td className="px-2.5 py-1 border-b border-border font-medium text-black">{entity.name}</td>
                    <td className="px-2.5 py-1 border-b border-border font-mono font-medium text-black text-right">
                      <span className="text-gray-400 font-normal">{entity.balance.split(' ')[0]}</span>
                      <span> {entity.balance.split(' ')[1]}</span>
                    </td>
                    <td className="px-2.5 py-1 border-b border-border text-black font-mono text-right">{entity.accounts}</td>
                    <td className="px-2.5 py-1 border-b border-border text-black font-mono text-right">{entity.banks}</td>
                    <td className="px-2.5 py-1 border-b border-border text-black font-mono text-right">{entity.currencies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Profile Section - Main Wrapper */}
        <div id="investment-profile" className="mt-8">
          {/* Main Section Header */}
          <div className="mb-4 pl-1">
            <h2 className="text-lg font-semibold text-text-main mb-1">Investment Profile</h2>
            <p className="text-[13px] text-text-secondary">Click to drill down</p>
          </div>

          {/* Investment Charts Grid */}
          <div className="grid grid-cols-2 gap-4">
            <ChartCard
              title="Total Investments by Category"
              chartData={investmentData}
              details={investmentDetails}
              columns={investmentColumns}
            />
            <ChartCard
              title="FD Maturity Profile - All Currencies"
              chartData={maturityAllData}
              details={maturityAllDetails}
              columns={maturityColumns}
            />
            <ChartCard
              title="LKR FD Maturity Profile"
              chartData={maturityLKRData}
              details={maturityLKRDetails}
              columns={maturityColumns}
            />
            <ChartCard
              title="Currency-wise Investment"
              chartData={currencyWiseData}
              details={investmentDetails}
              columns={investmentColumns}
            />
          </div>

          {/* Foreign Currency Profile Section */}
          <div className="mt-4 bg-white border border-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">Foreign Currency Deposits & Loans Overview</h3>
            </div>

            <div className="flex items-start gap-4 flex-wrap">

              {/* Left: Bar Chart */}
              <div className="w-[350px] h-[220px] relative shrink-0">
                <Bar
                  data={{
                    labels: forexOverviewData.map(d => d.currency),
                    datasets: [
                      {
                        label: 'Deposits',
                        data: forexOverviewData.map(d => d.depVal),
                        backgroundColor: '#10b981',
                        barPercentage: 1.0,
                        categoryPercentage: 0.8,
                        borderRadius: 4,
                        minBarLength: 0
                      },
                      {
                        label: 'Loans',
                        data: forexOverviewData.map(d => d.loanVal),
                        backgroundColor: '#ef4444',
                        barPercentage: 1.0,
                        categoryPercentage: 0.8,
                        borderRadius: 4,
                        minBarLength: 0
                      }
                    ]
                  }}
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
                        display: false, // Hidden as per user request
                      },
                      tooltip: {
                        backgroundColor: '#1f2937',
                        padding: 12,
                        titleFont: { size: 13 },
                        bodyFont: { size: 12 },
                        cornerRadius: 4,
                        displayColors: true,
                        callbacks: {
                          label: function (context) {
                            const item = forexOverviewData[context.dataIndex];
                            const label = context.dataset.label;
                            const value = context.raw;
                            const rate = label === 'Deposits' ? item.depRate : item.loanRate;
                            return `${label}: ${item.currency} ${value}M (${rate})`;
                          }
                        }
                      },
                      datalabels: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        border: { display: false },
                        grid: { color: '#f3f4f6', drawBorder: false },
                        ticks: { font: { size: 11, family: 'Inter, sans-serif' }, color: '#6b7280', padding: 8 }
                      },
                      x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { font: { size: 12, family: 'Inter, sans-serif' }, color: '#374151', padding: 8 },
                        border: { display: false }
                      }
                    }
                  }}
                />
              </div>

              {/* Right: Data Table */}
              <div className="flex-[1.5] min-w-[400px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border h-8">
                      <th className="text-left text-[11px] text-[#888] font-semibold uppercase py-1">CURRENCY</th>
                      <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">
                        <div className="flex items-center gap-1.5 justify-end">
                          <div className="w-2 h-2 rounded-sm bg-emerald-500"></div>
                          DEPOSITS (AVG RATE)
                        </div>
                      </th>
                      <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">
                        <div className="flex items-center gap-1.5 justify-end">
                          <div className="w-2 h-2 rounded-sm bg-red-500"></div>
                          LOANS (AVG RATE)
                        </div>
                      </th>
                      <th className="text-right text-[11px] text-[#888] font-semibold uppercase py-1">NET POSITION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forexOverviewData.map((item, index, array) => (
                      <tr key={index} className={`h-8 ${index < array.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                        <td className="py-1">
                          <span className="text-[13px] font-normal text-text-main">{item.currency}</span>
                        </td>
                        <td className="py-1 text-right">
                          <div className="text-[13px] font-normal font-mono text-black">
                            <span className="text-gray-400 font-normal">{item.deposits.split(' ')[0]}</span>
                            <span> {item.deposits.split(' ')[1]}</span>
                            <span className="text-emerald-500 text-xs ml-1.5">({item.depRate})</span>
                          </div>
                        </td>
                        <td className="py-1 text-right">
                          <div className="text-[13px] font-normal font-mono text-black">
                            {item.loans !== 'EUR 0.00M' && item.loans !== 'USD 0.00M' ? (
                              <>
                                <span className="text-gray-400 font-normal">{item.loans.split(' ')[0]}</span>
                                <span> {item.loans.split(' ')[1]}</span>
                                <span className="text-red-500 text-xs ml-1.5">({item.loanRate})</span>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-400">{item.loans}</span>
                                <span className="text-gray-400 text-xs ml-1.5">(0.00%)</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="py-1 text-right">
                          <div className="flex items-baseline gap-1 justify-end">
                            <div className="text-[13px] font-normal font-mono text-black">
                              <span className="text-gray-400 font-normal">{item.net.split(' ')[0]}</span>
                              <span> {item.net.split(' ')[1]}</span>
                            </div>
                            <div className="text-[11px] text-text-secondary">{item.netType}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        {/* AWPLR Section */}
        <div id="awplr-rate" className="mt-8">
          <div className="mb-4 pl-1">
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-lg font-semibold text-text-main m-0">AWPLR Benchmark Rate</h2>
              <div
                className="relative flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-500 cursor-help"
                onMouseEnter={() => setShowAwplrInfo(true)}
                onMouseLeave={() => setShowAwplrInfo(false)}
              >
                <Info size={12} />
                {showAwplrInfo && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-3 w-[300px] bg-white border border-border rounded-lg p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] text-text-main">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">About AWPLR</h4>
                    <p className="text-[13px] text-gray-700 leading-relaxed m-0 font-normal">
                      The Average Weighted Prime Lending Rate (AWPLR) is the benchmark lending rate published by the Central Bank of Sri Lanka.
                      It represents the weighted average of prime lending rates offered by licensed commercial banks and is used as a reference for pricing floating rate loans and deposits.
                    </p>
                    {/* Triangle arrow for popover */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-b border-border"></div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[13px] text-text-secondary">Central Bank of Sri Lanka - Average Weighted Prime Lending Rate</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {awplrMetrics.map((metric, index) => (
              <div key={index} className="bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide m-0">{metric.title}</h3>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xl font-bold font-mono ${metric.value.startsWith('+') ? 'text-green-600' :
                      metric.value.startsWith('-') ? 'text-red-500' : 'text-text-main'
                      }`}>
                      {metric.value}
                    </span>
                    {metric.trend && (
                      <span className={`text-xs font-semibold ${metric.value.startsWith('+') ? 'text-green-600' :
                        metric.value.startsWith('-') ? 'text-red-500' : 'text-gray-400'
                        }`}>
                        {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      </span>
                    )}
                  </div>
                  {metric.subtext && (
                    <p className="text-xs text-text-secondary mt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-border h-[320px] flex flex-col">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">AWPLR Trend (AWPLR CBSL Monthly (System))</h3>
              <div className="flex-1 relative">
                <Line data={awplrTrendData.monthly} options={lineChartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-border h-[320px] flex flex-col">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">AWPLR Trend (AWPLR CBSL Weekly (System))</h3>
              <div className="flex-1 relative">
                <Line data={awplrTrendData.weekly} options={lineChartOptions} />
              </div>
            </div>
          </div>

        </div>

        {/* Foreign Exchange Rates Section */}
        <div id="forex-rates" className="mt-8">
          <div className="mb-4 pl-1">
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-lg font-semibold text-text-main m-0">Foreign Exchange Rates</h2>
              <div
                className="relative flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-500 cursor-help"
                onMouseEnter={() => setShowForexInfo(true)}
                onMouseLeave={() => setShowForexInfo(false)}
              >
                <Info size={12} />
                {showForexInfo && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 translate-x-3 w-[300px] bg-white border border-border rounded-lg p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] text-text-main">
                    <div className="flex gap-2 items-start">
                      <div className="text-blue-500 mt-0.5"><Info size={16} /></div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">Selling Rate</h4>
                        <p className="text-[13px] text-gray-700 leading-relaxed m-0 font-normal">
                          Rate at which banks sell foreign currency to Lion Brewery • Used for import payments, supplier settlements, and CAPEX transactions
                        </p>
                      </div>
                    </div>
                    {/* Triangle arrow for popover */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-b border-border"></div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[13px] text-text-secondary">Daily selling rates for major currencies</p>
          </div>

          <div className="m-0 bg-white border-t border-border overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-[13px]">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="pl-6 w-[20%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">CURRENCY (AGAINST LKR)</th>
                  <th className="w-[12%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">DATE</th>
                  <th className="w-[12%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">SELLING RATE</th>
                  <th className="w-[12%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">PREV. RATE</th>
                  <th className="w-[15%] bg-[#fafafa] text-left px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">COST PER 100K</th>
                  <th className="pr-6 bg-[#fafafa] text-right px-2.5 py-1 font-semibold text-[#888] text-[11px] uppercase h-8">CHANGE</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-bg-subtle transition-colors duration-150">
                    <td className="pl-6 px-2.5 py-1 border-b border-border text-text-main">
                      <div className="flex items-center gap-3">
                        <LogoImage src={rate.flag} name={rate.currency.split('/')[0]} size={20} />
                        <span>{rate.currency.split('/')[0]}</span>
                      </div>
                    </td>
                    <td className="px-2.5 py-1 border-b border-border text-text-secondary">{rate.date}</td>
                    <td className="px-2.5 py-1 border-b border-border">
                      <div className="font-mono text-text-main">{rate.rate}</div>
                    </td>
                    <td className="px-2.5 py-1 border-b border-border">
                      <div className="font-mono text-text-secondary">{rate.prevRate}</div>
                    </td>
                    <td className="px-2.5 py-1 border-b border-border">
                      <div className="font-mono text-text-main">{rate.cost}</div>
                    </td>
                    <td className="pr-6 px-2.5 py-1 border-b border-border text-right">
                      {(() => {
                        const isPos = rate.change.startsWith('+');
                        const colorClass = isPos ? 'text-red-500' : 'text-emerald-500';
                        const Icon = isPos ? TrendingUp : TrendingDown;
                        return (
                          <div className="inline-flex items-center gap-2">
                            <Icon size={14} className={colorClass} />
                            <span className={`${colorClass} text-[13px] font-semibold font-mono`}>
                              {rate.change} ({rate.changePercent})
                            </span>
                          </div>
                        );
                      })()}
                    </td>
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

export default Dashboard;
