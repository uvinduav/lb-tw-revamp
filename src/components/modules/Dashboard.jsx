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
    <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="widget-title" style={{ margin: 0 }}>{title}</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
        <div style={{ width: '150px', height: '150px', position: 'relative', flexShrink: 0 }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                {columns.map((col, index) => (
                  <th key={index} style={{ textAlign: col.align || 'left', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>
                    {col.header}
                  </th>
                ))}</tr >
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index} style={{ borderBottom: index < details.length - 1 ? '1px solid #f3f4f6' : 'none', height: '32px' }}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} style={{ padding: '4px 0', textAlign: col.align || 'left' }}>
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
                                  <span style={{ color: '#9ca3af', fontWeight: 400 }}>{parts[0]}</span>
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
    { id: 1, currency: 'EUR/LKR', name: 'Euro', rate: '300.00', date: 'Dec 12, 2025', cost: 'LKR 30,000,000', costLabel: 'Cost per €100K', flag: 'https://flagcdn.com/w40/eu.png' },
    { id: 2, currency: 'GBP/LKR', name: 'British Pound', rate: '415.39', date: 'Jan 18, 2026', cost: 'LKR 41,539,000', costLabel: 'Cost per £100K', flag: 'https://flagcdn.com/w40/gb.png' },
    { id: 3, currency: 'SGD/LKR', name: 'Singapore Dollar', rate: '100.00', date: 'Feb 06, 2026', cost: 'LKR 10,000,000', costLabel: 'Cost per S$100K', flag: 'https://flagcdn.com/w40/sg.png' },
    { id: 4, currency: 'USD/LKR', name: 'US Dollar', rate: '230.00', date: 'Dec 26, 2025', cost: 'LKR 23,000,000', costLabel: 'Cost per $100K', flag: 'https://flagcdn.com/w40/us.png' },
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
    <div className="dashboard-main-wrapper">
      {/* Search/Tabs Wrapper */}
      <div className="dashboard-tabs-wrapper">
        <div className="dashboard-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <React.Fragment key={tab.id}>
                {tab.id === 'cash-flow' && <div className="vertical-divider" style={{ margin: '0 8px', alignSelf: 'center' }} />}
                <button
                  className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
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

      <div className="dashboard-container" onScroll={handleScroll}>

        {/* Widgets Grid Section */}
        <div style={{ backgroundColor: 'var(--color-bg-subtle)', margin: '-24px -24px 32px -24px', padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <div id="overview" className="dashboard-grid" style={{ marginBottom: 0 }}>
            {widgets.map((widget, index) => {
              const Icon = widget.icon;
              return (
                <div
                  key={index}
                  className={`widget-card ${widget.onClick ? 'clickable' : ''}`}
                  onClick={widget.onClick}
                  style={widget.onClick ? { cursor: 'pointer' } : {}}
                >
                  <div className="widget-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {Icon && <Icon size={14} className="text-gray" />}
                      <h3 className="widget-title" style={{ margin: 0 }}>{widget.title}</h3>
                    </div>
                  </div>

                  <div style={{ marginTop: '0px' }}>
                    <div className="widget-value-row">
                      <span className={`widget-value ${isNegative(widget.value) ? 'text-red' : ''}`}>
                        {widget.value}
                      </span>
                      {widget.change && (
                        <span className={`widget-change ${widget.changeType === 'positive' ? 'text-green' :
                          widget.changeType === 'negative' ? 'text-red' : 'text-gray'
                          }`}>
                          {widget.change}
                        </span>
                      )}
                    </div>
                    {widget.onClick ? (
                      <div style={{ marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 500, color: '#3b82f6' }}>View more</span>
                      </div>
                    ) : (
                      <p className="widget-subtext">
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
        <div id="entity-overview" style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Entity Overview</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Click to drill down</p>
          </div>

          <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
            <table className="data-table min-w-800">
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th style={{ width: '30%' }}>ENTITY NAME</th>
                  <th style={{ textAlign: 'right' }}>TOTAL BALANCE (LKR)</th>
                  <th style={{ textAlign: 'right' }}>ACCOUNTS</th>
                  <th style={{ textAlign: 'right' }}>BANKS</th>
                  <th style={{ textAlign: 'right' }}>CURRENCIES</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((entity) => (
                  <tr
                    key={entity.id}
                    className="hover-row"
                    onClick={() => onNavigate && onNavigate('Entity Details', entity)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <LogoImage src={entity.logo} name={entity.name} color={entity.color} />
                    </td>
                    <td style={{ fontWeight: 500, color: '#000000' }}>{entity.name}</td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 500, color: '#000000', textAlign: 'right' }}>
                      <span style={{ color: '#9ca3af', fontWeight: 400 }}>{entity.balance.split(' ')[0]}</span>
                      <span> {entity.balance.split(' ')[1]}</span>
                    </td>
                    <td style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'right' }}>{entity.accounts}</td>
                    <td style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'right' }}>{entity.banks}</td>
                    <td style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'right' }}>{entity.currencies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Profile Section - Main Wrapper */}
        <div id="investment-profile" style={{ marginTop: '32px' }}>
          {/* Main Section Header */}
          <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>Investment Profile</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Click to drill down</p>
          </div>

          {/* Investment Charts Grid */}
          <div className="investment-grid">
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
          <div style={{ marginTop: 'var(--spacing-md)', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="widget-title" style={{ margin: 0 }}>Foreign Currency Deposits & Loans Overview</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>

              {/* Left: Bar Chart */}
              <div style={{ width: '350px', height: '220px', position: 'relative', flexShrink: 0 }}>
                <Bar
                  data={{
                    labels: ['USD', 'EUR'],
                    datasets: [
                      {
                        label: 'Deposits',
                        data: [4.52, 0.24],
                        backgroundColor: '#10b981',
                        barPercentage: 0.5,
                        categoryPercentage: 0.7,
                        borderRadius: 4
                      },
                      {
                        label: 'Loans',
                        data: [1.25, 0],
                        backgroundColor: '#ef4444',
                        barPercentage: 0.5,
                        categoryPercentage: 0.7,
                        borderRadius: 4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                        displayColors: true
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
              <div style={{ flex: 1.5, minWidth: '400px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)', height: '32px' }}>
                      <th style={{ textAlign: 'left', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>CURRENCY</th>
                      <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#10b981' }}></div>
                          DEPOSITS
                        </div>
                      </th>
                      <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>AVG RATE</th>
                      <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#ef4444' }}></div>
                          LOANS
                        </div>
                      </th>
                      <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>AVG RATE</th>
                      <th style={{ textAlign: 'right', fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', padding: '4px 0' }}>NET POSITION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { currency: 'USD', deposits: 'USD 4.52M', depRate: '3.77%', loans: 'USD 1.25M', loanRate: '5.91%', net: 'USD 3.27M', netType: '(Asset)', color: '#3b82f6' },
                      { currency: 'EUR', deposits: 'EUR 0.24M', depRate: '1.50%', loans: 'EUR 0.00M', loanRate: '0.00%', net: 'EUR 0.24M', netType: '(Asset)', color: '#f59e0b' }
                    ].map((item, index, array) => (
                      <tr key={index} style={{ borderBottom: index < array.length - 1 ? '1px solid #f3f4f6' : 'none', height: '32px' }}>
                        <td style={{ padding: '4px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                            <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-main)' }}>{item.currency}</span>
                          </div>
                        </td>
                        <td style={{ padding: '4px 0', textAlign: 'right' }}>
                          <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'monospace', color: '#000000' }}>
                            <span style={{ color: '#9ca3af', fontWeight: 400 }}>{item.deposits.split(' ')[0]}</span>
                            <span> {item.deposits.split(' ')[1]}</span>
                          </div>
                        </td>
                        <td style={{ padding: '4px 0', textAlign: 'right' }}>
                          <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'monospace', color: '#000000' }}>{item.depRate}</div>
                        </td>
                        <td style={{ padding: '4px 0', textAlign: 'right' }}>
                          <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'monospace', color: '#000000' }}>
                            {item.loans !== 'EUR 0.00M' && item.loans !== 'USD 0.00M' ? (
                              <>
                                <span style={{ color: '#9ca3af', fontWeight: 400 }}>{item.loans.split(' ')[0]}</span>
                                <span> {item.loans.split(' ')[1]}</span>
                              </>
                            ) : (
                              <span style={{ color: '#9ca3af' }}>{item.loans}</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '4px 0', textAlign: 'right' }}>
                          <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'monospace', color: '#000000' }}>{item.loanRate}</div>
                        </td>
                        <td style={{ padding: '4px 0', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'flex-end' }}>
                            <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'monospace', color: '#000000' }}>
                              <span style={{ color: '#9ca3af', fontWeight: 400 }}>{item.net.split(' ')[0]}</span>
                              <span> {item.net.split(' ')[1]}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{item.netType}</div>
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
        <div id="awplr-rate" style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>AWPLR Benchmark Rate</h2>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#eff6ff',
                  color: '#3b82f6',
                  cursor: 'help'
                }}
                onMouseEnter={() => setShowAwplrInfo(true)}
                onMouseLeave={() => setShowAwplrInfo(false)}
              >
                <Info size={12} />
                {showAwplrInfo && (
                  <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(12px)',
                    width: '300px',
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    color: 'var(--color-text-main)'
                  }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '8px' }}>About AWPLR</h4>
                    <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5', margin: 0, fontWeight: 400 }}>
                      The Average Weighted Prime Lending Rate (AWPLR) is the benchmark lending rate published by the Central Bank of Sri Lanka.
                      It represents the weighted average of prime lending rates offered by licensed commercial banks and is used as a reference for pricing floating rate loans and deposits.
                    </p>
                    {/* Triangle arrow for popover */}
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '50%',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: 'white',
                      borderLeft: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)'
                    }}></div>
                  </div>
                )}
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Central Bank of Sri Lanka - Average Weighted Prime Lending Rate</p>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {awplrMetrics.map((metric, index) => (
              <div key={index} className="widget-card">
                <div className="widget-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 className="widget-title" style={{ margin: 0 }}>{metric.title}</h3>
                  </div>
                </div>

                <div style={{ marginTop: '0px' }}>
                  <div className="widget-value-row">
                    <span className={`widget-value ${metric.value.startsWith('+') ? 'text-green' :
                      metric.value.startsWith('-') ? 'text-red' : ''
                      }`}>
                      {metric.value}
                    </span>
                    {metric.trend && (
                      <span className={`widget-change ${metric.value.startsWith('+') ? 'text-green' :
                        metric.value.startsWith('-') ? 'text-red' : 'text-gray'
                        }`}>
                        {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      </span>
                    )}
                  </div>
                  {metric.subtext && (
                    <p className="widget-subtext">
                      {metric.subtext}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', height: '320px', display: 'flex', flexDirection: 'column' }}>
              <h3 className="widget-title" style={{ marginBottom: '16px' }}>AWPLR Trend (AWPLR CBSL Monthly (System))</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Line data={awplrTrendData.monthly} options={lineChartOptions} />
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', height: '320px', display: 'flex', flexDirection: 'column' }}>
              <h3 className="widget-title" style={{ marginBottom: '16px' }}>AWPLR Trend (AWPLR CBSL Weekly (System))</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Line data={awplrTrendData.weekly} options={lineChartOptions} />
              </div>
            </div>
          </div>

        </div>

        {/* Foreign Exchange Rates Section */}
        <div id="forex-rates" style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '16px', paddingLeft: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-main)', margin: 0 }}>Foreign Exchange Rates</h2>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#eff6ff',
                  color: '#3b82f6',
                  cursor: 'help'
                }}
                onMouseEnter={() => setShowForexInfo(true)}
                onMouseLeave={() => setShowForexInfo(false)}
              >
                <Info size={12} />
                {showForexInfo && (
                  <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(12px)',
                    width: '300px',
                    backgroundColor: 'white',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    color: 'var(--color-text-main)'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ color: '#3b82f6', marginTop: '2px' }}><Info size={16} /></div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1e40af', marginBottom: '4px' }}>Selling Rate</h4>
                        <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5', margin: 0, fontWeight: 400 }}>
                          Rate at which banks sell foreign currency to Lion Brewery • Used for import payments, supplier settlements, and CAPEX transactions
                        </p>
                      </div>
                    </div>
                    {/* Triangle arrow for popover */}
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '50%',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: 'white',
                      borderLeft: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)'
                    }}></div>
                  </div>
                )}
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Daily selling rates for major currencies</p>
          </div>

          <div className="table-wrapper" style={{ margin: 0, backgroundColor: 'white', borderTop: '1px solid var(--color-border)' }}>
            <table className="data-table min-w-600">
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ paddingLeft: '24px', width: '20%' }}>CURRENCY (AGAINST LKR)</th>
                  <th style={{ width: '25%' }}>SELLING RATE</th>
                  <th style={{ width: '20%' }}>DATE</th>
                  <th>COST PER 100K</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.map((rate) => (
                  <tr key={rate.id} className="hover-row">
                    <td style={{ paddingLeft: '24px', color: 'var(--color-text-main)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <LogoImage src={rate.flag} name={rate.currency.split('/')[0]} size={20} />
                        <span>{rate.currency.split('/')[0]}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{rate.rate}</div>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{rate.date}</td>
                    <td>
                      <div style={{ fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{rate.cost}</div>
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
