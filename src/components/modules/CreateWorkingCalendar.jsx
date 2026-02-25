import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Select from 'react-select';

const CreateWorkingCalendar = ({ onCancel, onSave }) => {
  const statusOptions = [
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Draft', label: 'Draft' }
  ];

  const [formData, setFormData] = useState({
    lastWorkingDay: 'yyyy-mm-dd',
    status: 'Approved',
    notes: ''
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
            <h1>Add New Calendar</h1>
          </div>
          <div className="page-subtitle">Configure the working calendar entry</div>
        </div>
        <div className="actions-row">
          <button className="btn btn-outline" onClick={onCancel} style={{ height: '36px' }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave} style={{ height: '36px', padding: '0 24px' }}>
            Save Calendar
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px 24px', maxWidth: '800px' }}>
          {/* Last Working Day */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Last Working Day <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                name="lastWorkingDay"
                value={formData.lastWorkingDay}
                onChange={handleInputChange}
                style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none', WebkitAppearance: 'none', color: formData.lastWorkingDay === 'yyyy-mm-dd' ? '#9ca3af' : 'inherit' }}
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
              value={statusOptions.find(o => o.value === formData.status)}
              onChange={handleSelectChange('status')}
              styles={customStyles}
              components={{ DropdownIndicator }}
            />
          </div>

          {/* Notes (Optional) */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              Notes (Optional)
            </label>
            <input
              type="text"
              name="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={handleInputChange}
              style={{ width: '100%', boxSizing: 'border-box', height: '36px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkingCalendar;
