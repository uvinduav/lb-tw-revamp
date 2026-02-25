import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Select from 'react-select';
import { 
  BANK_DATA, 
  COMPANY_DATA, 
  CURRENCY_DATA, 
  BENCHMARK_DATA 
} from '../constants/parameterData';

const CreateParameterPage = ({ title, parent, onCancel, onSave }) => {
  const getFieldsConfig = () => {
    switch (parent) {
      case 'Banks':
        return [
          { name: 'name', label: 'Bank Name', type: 'text', required: true },
          { name: 'code', label: 'Short Code', type: 'text', required: true },
          { name: 'swift', label: 'SWIFT / BIC Code', type: 'text', required: true },
          { name: 'country', label: 'Country', type: 'text' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Benchmarks':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'country', label: 'Country', type: 'text', required: true },
          { name: 'currency', label: 'Currency', type: 'select', options: CURRENCY_DATA.map(c => ({ value: c.code, label: c.code })) },
          { name: 'tenor', label: 'Tenor', type: 'text' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Branches':
        return [
          { name: 'name', label: 'Branch Name', type: 'text', required: true },
          { name: 'code', label: 'Short Code', type: 'text', required: true },
          { name: 'bank', label: 'Bank', type: 'select', options: BANK_DATA.map(b => ({ value: b.name, label: b.name })), required: true },
          { name: 'location', label: 'City', type: 'text', required: true },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Companies':
        return [
          { name: 'name', label: 'Company Name', type: 'text', required: true },
          { name: 'code', label: 'Short Code', type: 'text', required: true },
          { name: 'registration', label: 'Registration No', type: 'text', required: true },
          { name: 'city', label: 'City', type: 'text' }
        ];
      case 'Currencies':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'code', label: 'Currency Code', type: 'text', required: true },
          { name: 'symbol', label: 'Symbol', type: 'text', required: true },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Durations':
        return [
          { name: 'title', label: 'Duration Name', type: 'text', required: true },
          { name: 'days', label: 'Days', type: 'number', required: true },
          { name: 'type', label: 'Product Type', type: 'select', options: [{ value: 'FD', label: 'Fixed Deposit' }, { value: 'Loan', label: 'Loan' }] }
        ];
      case 'Interest Rates':
        return [
          { name: 'name', label: 'Rate Name', type: 'text', required: true },
          { name: 'rate', label: 'Rate %', type: 'number', required: true },
          { name: 'type', label: 'Type', type: 'select', options: [{ value: 'Fixed', label: 'Fixed' }, { value: 'Floating', label: 'Floating' }] },
          { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Exchange Rates':
        return [
          { name: 'base', label: 'Base Currency', type: 'select', options: CURRENCY_DATA.map(c => ({ value: c.code, label: c.code })), required: true },
          { name: 'quote', label: 'Quote Currency', type: 'select', options: CURRENCY_DATA.map(c => ({ value: c.code, label: c.code })), required: true },
          { name: 'buy', label: 'Buy Rate', type: 'number', required: true },
          { name: 'sell', label: 'Sell Rate', type: 'number', required: true },
          { name: 'mid', label: 'Mid Rate', type: 'number', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true }
        ];
      case 'Purpose Tags':
        return [
          { name: 'name', label: 'Tag Name', type: 'text', required: true },
          { name: 'code', label: 'Code', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Users':
        return [
          { name: 'username', label: 'Username', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'text', required: true },
          { name: 'role', label: 'Role', type: 'select', options: [{ value: 'Admin', label: 'Admin' }, { value: 'Viewer', label: 'Viewer' }, { value: 'Editor', label: 'Editor' }], required: true },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'User Groups':
        return [
          { name: 'name', label: 'Group Name', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'permissions', label: 'Permissions', type: 'text' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      case 'Thresholds':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'type', label: 'Type', type: 'select', options: [{ value: 'Value', label: 'Value' }, { value: 'Percentage', label: 'Percentage' }] },
          { name: 'value', label: 'Value', type: 'number', required: true },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }], defaultValue: 'Active' }
        ];
      default:
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text' }
        ];
    }
  };

  const fields = getFieldsConfig();
  
  const initialData = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || (field.type === 'date' ? 'yyyy-mm-dd' : '');
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : '' }));
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'var(--color-primary)' : '#e5e7eb',
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--color-primary)' : '#d1d5db'
      },
      borderRadius: '4px',
      minHeight: '36px',
      height: '36px',
      fontSize: '13px',
      backgroundColor: 'white'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({ ...provided, padding: '0 8px', color: '#9ca3af' }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    valueContainer: (provided) => ({ ...provided, padding: '0 12px' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f9fafb' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? '#111827' : '#374151',
      fontSize: '13px',
      cursor: 'pointer',
      '&:active': { backgroundColor: '#f3f4f6' }
    })
  };

  const DropdownIndicator = () => (
    <div style={{ paddingRight: '12px', display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
        <path d="M0 0L4 5L8 0H0Z" />
      </svg>
    </div>
  );

  return (
    <div className="page-content" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="page-header" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, paddingBottom: '16px', borderBottom: 'none' }}>
        <div>
          <div className="page-title"><h1>{title}</h1></div>
          <div className="page-subtitle">Provide details for the new entry in {parent}</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline" onClick={onCancel} style={{ height: '36px' }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(formData)} style={{ height: '36px', padding: '0 24px' }}>Save {parent.replace(/s$/, '')}</button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px 24px', maxWidth: '800px' }}>
          {fields.map(field => (
            <div key={field.name} style={{ gridColumn: field.fullWidth ? 'span 2' : 'auto' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              
              {field.type === 'select' ? (
                <Select
                  options={field.options}
                  value={field.options.find(opt => opt.value === formData[field.name])}
                  onChange={handleSelectChange(field.name)}
                  styles={customStyles}
                  components={{ DropdownIndicator }}
                  placeholder={`Select ${field.label.toLowerCase()}...`}
                />
              ) : field.type === 'date' ? (
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', color: formData[field.name] === 'yyyy-mm-dd' ? '#9ca3af' : 'inherit' }}
                  />
                  <Calendar size={14} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '11px', pointerEvents: 'none' }} />
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateParameterPage;
