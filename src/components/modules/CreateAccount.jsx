import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import Select, { components as RSComponents } from 'react-select';
import { COMPANY_DATA, BANK_DATA, BRANCH_DATA, DURATION_DATA, CURRENCY_DATA, BENCHMARK_DATA } from '../../constants/parameterData';

// Import bank logos
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

const bankLogos = {
  'Standard Chartered': bankLogoSc,
  'Hatton National Bank': bankLogoHnb,
  'Citi Bank': bankLogoCiti,
  'Deutsche Bank': bankLogoDeut,
  'Sampath Bank': bankLogoSamp,
  'Commercial Bank': bankLogoCom,
  'DFCC Bank': bankLogoDfcc,
  'NDB Bank': bankLogoNdb,
  'Bank of China': bankLogoBoc,
  "People's Bank": bankLogoPb,
  'Nation Trust Bank': bankLogoNtb
};

// Company colors mapping from Dashboard
const companyColors = {
  'Ceylon Beverage Holdings': '#e0f2fe',
  'Lion Beer Ceylon PTE LTD': '#fef3c7',
  'Lion Brewery Sri Lanka': '#fef3c7',
  'Luxury Brands Pvt Ltd.': '#f1f5f9',
  'Millers Brewery Ltd': '#dcfce7',
  'Pearl Spring Pvt Ltd': '#f0fdf4',
  "Pubs'N Places Pvt Ltd": '#f3e8ff',
  'Retail Spaces Pvt Ltd': '#ffedd5'
};

const LogoPlaceholder = ({ name, color, size = 20, src }) => {
  if (src) {
    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '4px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(0,0,0,0.05)',
        flexShrink: 0,
        overflow: 'hidden'
      }}>
        <img src={src} alt={name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
      </div>
    );
  }
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '4px',
      backgroundColor: color || '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 600,
      color: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(0,0,0,0.05)',
      flexShrink: 0
    }}>
      {name ? name.charAt(0) : 'E'}
    </div>
  );
};

const FlagPlaceholder = ({ code, size = 18 }) => {
  const flagCode = code === 'USD' ? 'us' : code === 'EUR' ? 'eu' : code === 'GBP' ? 'gb' : code === 'JPY' ? 'jp' : code === 'AUD' ? 'au' : code === 'CAD' ? 'ca' : code === 'CHF' ? 'ch' : code === 'CNY' ? 'cn' : code === 'INR' ? 'in' : 'lk';
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '4px',
      backgroundColor: '#f9fafb', // Light grey background for the square frame
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(0,0,0,0.05)',
      flexShrink: 0,
      overflow: 'hidden'
    }}>
      <img
        src={`https://flagcdn.com/w20/${flagCode}.png`}
        alt=""
        style={{ width: '120%', height: '120%', objectFit: 'cover' }}
      />
    </div>
  );
};

const CustomOption = (props) => {
  const isBank = props.selectProps.name === 'bank';
  const isCompany = props.selectProps.name === 'company';
  const isCurrency = props.selectProps.name === 'currency';
  const label = props.data.label;

  let icon = null;
  if (isBank) {
    icon = <LogoPlaceholder name={label} src={bankLogos[label]} />;
  } else if (isCompany) {
    icon = <LogoPlaceholder name={label} color={companyColors[label]} />;
  } else if (isCurrency) {
    icon = <FlagPlaceholder code={props.data.value} size={20} />;
  }

  return (
    <RSComponents.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        <span style={{ fontSize: '13px' }}>{props.children}</span>
      </div>
    </RSComponents.Option>
  );
};

const CustomSingleValue = (props) => {
  const isBank = props.selectProps.name === 'bank';
  const isCompany = props.selectProps.name === 'company';
  const isCurrency = props.selectProps.name === 'currency';
  const label = props.data.label;

  let icon = null;
  if (isBank) {
    icon = <LogoPlaceholder name={label} src={bankLogos[label]} size={18} />;
  } else if (isCompany) {
    icon = <LogoPlaceholder name={label} color={companyColors[label]} size={18} />;
  } else if (isCurrency) {
    icon = <FlagPlaceholder code={props.data.value} size={18} />;
  }

  return (
    <RSComponents.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: isCurrency ? 500 : 400 }}>
        {icon}
        <span style={{ fontSize: '13px' }}>{props.children}</span>
      </div>
    </RSComponents.SingleValue>
  );
};

const PRODUCT_TYPES = ['STL', 'LTL', 'FD', 'CA', 'SA', 'MMSA'];

const DropdownIndicator = () => (
  <div style={{ paddingRight: '12px', display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
    <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
      <path d="M0 0L4 5L8 0H0Z" />
    </svg>
  </div>
);

const CreateAccount = ({ onCancel, onSave }) => {
  const [selectedProduct, setSelectedProduct] = useState('STL');

  // Map parameter data to select options
  const companyOptions = COMPANY_DATA.map(c => ({ value: c.name, label: c.name }));
  const bankOptions = BANK_DATA.map(b => ({ value: b.name, label: b.name }));
  const branchOptions = BRANCH_DATA.map(o => ({ value: o.name, label: o.name }));
  const durationOptions = DURATION_DATA.map(d => ({ value: d.title, label: d.title }));
  const currencyOptions = CURRENCY_DATA.map(c => ({ value: c.code, label: c.code }));
  const benchmarkOptions = BENCHMARK_DATA.map(b => ({ value: b.name, label: b.name }));

  const [formData, setFormData] = useState({
    company: '',
    bank: '',
    branch: '',
    accountNumber: '',
    currency: 'LKR',
    value: '',
    startDate: '2026-02-23',
    duration: '',
    repaymentFrequency: '',
    chargeDate: '23',
    status: 'Draft',
    interestType: '',
    currentRate: '',
    supportingDocument: null,
    benchmark: '',
    margin: '',
    alerts: []
  });

  const handleSelectChange = (field) => (selectedOption) => {
    setFormData(prev => ({ ...prev, [field]: selectedOption ? selectedOption.value : '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAlert = () => {
    setFormData(prev => ({
      ...prev,
      alerts: [...prev.alerts, { email: '', days: '' }]
    }));
  };

  const handleRemoveAlert = (index) => {
    setFormData(prev => ({
      ...prev,
      alerts: prev.alerts.filter((_, i) => i !== index)
    }));
  };

  const handleAlertChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      alerts: prev.alerts.map((alert, i) => i === index ? { ...alert, [field]: value } : alert)
    }));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#8d6e63' : '#e5e7eb',
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#8d6e63' : '#d1d5db'
      },
      borderRadius: '4px',
      minHeight: '36px',
      height: '36px',
      fontSize: '13px',
      backgroundColor: 'white'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      display: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 12px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f9fafb' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? '#111827' : '#374151',
      fontSize: '13px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#f3f4f6'
      }
    })
  };

  return (
    <div className="page-content" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      {/* Header */}
      <div className="page-header" style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        paddingBottom: '16px'
      }}>
        <div>
          <div className="page-title">
            <h1>Create new account</h1>
          </div>
          <div className="page-subtitle">Select a product type and provide the relevant information</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            Save Account
          </button>
        </div>
      </div>

      <div style={{ padding: '12px 24px 32px 24px' }}>
        <div className="create-account-wrapper">
          {/* Left Column - Form */}
          <div className="create-account-form-col">
            {/* Product Type Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f3f4f6',
              padding: '4px',
              borderRadius: '4px',
              marginBottom: '24px',
              height: '36px',
              boxSizing: 'border-box'
            }}>
              {PRODUCT_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedProduct(type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 24px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: selectedProduct === type ? '#d97706' : '#4b5563',
                    backgroundColor: selectedProduct === type ? 'white' : 'transparent',
                    boxShadow: selectedProduct === type ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    height: '100%',
                    fontFamily: 'inherit'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Main Form Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>

              {/* Company Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Company <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  name="company"
                  options={companyOptions}
                  value={formData.company ? { value: formData.company, label: formData.company } : null}
                  onChange={handleSelectChange('company')}
                  styles={customStyles}
                  components={{ DropdownIndicator, Option: CustomOption, SingleValue: CustomSingleValue }}
                  placeholder="Select"
                />
              </div>

              {/* Bank Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Bank <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  name="bank"
                  options={bankOptions}
                  value={formData.bank ? { value: formData.bank, label: formData.bank } : null}
                  onChange={handleSelectChange('bank')}
                  styles={customStyles}
                  components={{ DropdownIndicator, Option: CustomOption, SingleValue: CustomSingleValue }}
                  placeholder="Select"
                />
              </div>

              {/* Branch Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Branch <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  options={branchOptions}
                  value={formData.branch ? { value: formData.branch, label: formData.branch } : null}
                  onChange={handleSelectChange('branch')}
                  placeholder="Select"
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                />
              </div>

              {/* Account Number Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Account Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Value Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Value <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '4px', height: '36px' }}>
                  <div style={{ width: '110px' }}>
                    <Select
                      name="currency"
                      options={currencyOptions}
                      value={formData.currency ? { value: formData.currency, label: formData.currency } : null}
                      onChange={handleSelectChange('currency')}
                      styles={{
                        ...customStyles,
                        control: (provided, state) => ({
                          ...customStyles.control(provided, state),
                          border: 'none',
                          backgroundColor: 'white',
                          borderRadius: '4px 0 0 4px',
                          minHeight: '34px',
                          height: '34px',
                          cursor: 'pointer'
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                          width: '120px'
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          paddingLeft: '12px',
                          paddingRight: '0'
                        })
                      }}
                      components={{ DropdownIndicator, Option: CustomOption, SingleValue: CustomSingleValue }}
                      placeholder=""
                    />
                  </div>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    style={{ flex: 1, padding: '0 12px', border: 'none', borderLeft: '1px solid #e5e7eb', outline: 'none', fontSize: '13px', width: '100%', borderRadius: '0 4px 4px 0' }}
                  />
                </div>
              </div>

              {/* Start Date Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Start Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', WebkitAppearance: 'none' }}
                    onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <Calendar size={14} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '11px', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Duration Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Duration <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  options={durationOptions}
                  value={formData.duration ? { value: formData.duration, label: formData.duration } : null}
                  onChange={handleSelectChange('duration')}
                  placeholder="Select"
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                />
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Select the duration of the account</p>
              </div>

              {/* Repayment Frequency Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Repayment Frequency <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  options={[{ value: 'Monthly', label: 'Monthly' }]}
                  value={formData.repaymentFrequency ? { value: formData.repaymentFrequency, label: formData.repaymentFrequency } : null}
                  onChange={handleSelectChange('repaymentFrequency')}
                  placeholder="Select"
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                />
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Frequency of repayment for loans</p>
              </div>

              {/* Charge Date Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Charge Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  options={[{ value: '23', label: '23' }]}
                  value={{ value: formData.chargeDate, label: formData.chargeDate }}
                  onChange={handleSelectChange('chargeDate')}
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                  placeholder="Select"
                />
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Day of the month for charging interest (1-31)</p>
              </div>

              {/* Status Box */}
              <div>
                <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Status <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <Select
                  options={[{ value: 'Draft', label: 'Draft' }, { value: 'Active', label: 'Active' }]}
                  value={formData.status ? { value: formData.status, label: formData.status } : null}
                  onChange={handleSelectChange('status')}
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                  placeholder="Select"
                />
              </div>
            </div>

            {/* Interest Section */}
            <div style={{ marginBottom: '28px', paddingTop: '20px' }}>
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 4px 0' }}>Interest</h2>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Select the initial interest details</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                  <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    Interest Type <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <Select
                    options={[{ value: 'Fixed', label: 'Fixed' }, { value: 'Floating', label: 'Floating' }]}
                    value={formData.interestType ? { value: formData.interestType, label: formData.interestType } : null}
                    onChange={handleSelectChange('interestType')}
                    placeholder="Select"
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                  />
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Type of interest calculation</p>
                </div>

                {formData.interestType === 'Fixed' && (
                  <>
                    <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                      <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Current Rate (%) <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="currentRate"
                        placeholder="e.g., 5.25"
                        value={formData.currentRate}
                        onChange={handleInputChange}
                        style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                        onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Interest rate as percentage (e.g., 5.25 for 5.25%)</p>
                    </div>

                    <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                      <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Supporting Document (PDF/Image) <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="file"
                          id="document-upload"
                          onChange={(e) => setFormData(prev => ({ ...prev, supportingDocument: e.target.files[0] }))}
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="document-upload"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            height: '40px',
                            padding: '8px 12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            fontSize: '13px',
                            color: formData.supportingDocument ? '#111827' : '#6b7280',
                            backgroundColor: '#f9fafb',
                            cursor: 'pointer',
                            boxSizing: 'border-box'
                          }}
                        >
                          {formData.supportingDocument ? formData.supportingDocument.name : 'Choose file No file chosen'}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {formData.interestType === 'Floating' && (
                  <>
                    <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                      <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Benchmark <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <Select
                        options={benchmarkOptions}
                        value={formData.benchmark ? { value: formData.benchmark, label: formData.benchmark } : null}
                        onChange={handleSelectChange('benchmark')}
                        placeholder="Select benchmark..."
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                      />
                      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Select the benchmark rate</p>
                    </div>

                    <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                      <label style={{ display: 'block', textTransform: 'none', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                        Margin (%) <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="margin"
                        placeholder="e.g., 1.50"
                        value={formData.margin}
                        onChange={handleInputChange}
                        style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                        onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Margin percentage (e.g., 1.50 for 1.50%)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Email Alerts Section */}
            <div style={{ marginBottom: '28px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 4px 0' }}>Email Alerts</h2>
                  <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Define who gets the email alert and how many days before maturity / completion</p>
                </div>
                <button
                  onClick={handleAddAlert}
                  style={{
                    backgroundColor: 'white',
                    color: '#4b5563',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  <Plus size={16} />
                  Add Alert
                </button>
              </div>

              {formData.alerts.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
                  <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '64px', border: '3px solid #9ca3af', borderRadius: '4px', position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', backgroundColor: 'white', padding: '2px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#9ca3af', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={14} color="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', margin: '0 0 4px 0' }}>No email alerts configured</p>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Click "Add Alert" to set up email notifications before account end date</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formData.alerts.map((alert, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '8px 0' }} />}
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                            Email Address <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g., alerts@company.co"
                            value={alert.email}
                            onChange={(e) => handleAlertChange(index, 'email', e.target.value)}
                            style={{ width: '100%', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white' }}
                            onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
                        </div>
                        <div style={{ width: 'calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                            Days Before End Date <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 30"
                            value={alert.days}
                            onChange={(e) => handleAlertChange(index, 'days', e.target.value)}
                            style={{ width: '100%', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', backgroundColor: 'white' }}
                            onFocus={(e) => e.target.style.borderColor = '#8d6e63'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveAlert(index)}
                          style={{
                            marginTop: '24px',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Summary */}
          <div className="create-account-summary-col">
            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '16px', borderRadius: '8px', position: 'sticky', top: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 10px 0' }}>Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Company</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.company || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Bank</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.bank || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Branch</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.branch || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Account No.</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.accountNumber || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Value</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.value ? `${formData.currency} ${formData.value}` : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Start Date</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.startDate || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Duration</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.duration || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Repayment Freq.</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.repaymentFrequency || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Charge Date</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.chargeDate ? `${formData.chargeDate}${formData.chargeDate === '1' ? 'st' : formData.chargeDate === '2' ? 'nd' : formData.chargeDate === '3' ? 'rd' : 'th'} day` : '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Status</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.status || '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>Interest Type</span>
                  <span style={{ fontSize: '11px', color: '#111827', textAlign: 'right', fontWeight: 500 }}>{formData.interestType || '-'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
