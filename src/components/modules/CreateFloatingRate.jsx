import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Select from 'react-select';
import { BENCHMARK_DATA } from '../../constants/parameterData';

const CreateFloatingRate = ({ onCancel, onSave }) => {
  const benchmarkOptions = BENCHMARK_DATA.map(b => ({ value: b.name, label: b.name }));
  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const [formData, setFormData] = useState({
    benchmark: '',
    rate: '',
    effectiveFrom: 'yyyy-mm-dd',
    status: 'Active'
  });

  const handleSelectChange = (field) => (selectedOption) => {
    setFormData(prev => ({ ...prev, [field]: selectedOption ? selectedOption.value : '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0 8px',
      color: '#9ca3af'
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

  const DropdownIndicator = () => (
    <div style={{ paddingRight: '12px', display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor">
        <path d="M0 0L4 5L8 0H0Z" />
      </svg>
    </div>
  );

  return (
    <div className="page-content" style={{ backgroundColor: 'white', minHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      {/* Header */}
      <div className="page-header" style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        paddingBottom: '16px',
        borderBottom: 'none'
      }}>
        <div>
          <div className="page-title">
            <h1>Add New Rate</h1>
          </div>
          <div className="page-subtitle">Provide information for the new floating rate</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline" onClick={onCancel} style={{ height: '36px' }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave} style={{ height: '36px', padding: '0 24px' }}>
            Save Floating Rate
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px 24px', maxWidth: '800px' }}>
          {/* Benchmark */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
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
          </div>

          {/* Rate (%) */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Rate (%) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Effective From */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Effective From <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                name="effectiveFrom"
                value={formData.effectiveFrom}
                onChange={handleInputChange}
                style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', WebkitAppearance: 'none', color: formData.effectiveFrom === 'yyyy-mm-dd' ? '#9ca3af' : 'inherit' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <Calendar size={14} color="#6b7280" style={{ position: 'absolute', right: '12px', top: '11px', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Status */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Status <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <Select
              options={statusOptions}
              value={formData.status ? { value: formData.status, label: formData.status } : null}
              onChange={handleSelectChange('status')}
              styles={customStyles}
              components={{ DropdownIndicator }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFloatingRate;
