import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const SlidingPanel = ({ isOpen, onClose, title, children, width = '400px' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`panel-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`sliding-panel ${isOpen ? 'open' : ''}`}
        style={{ width: width }}
      >
        <div className="panel-header">
          <h2 className="panel-title">{title}</h2>
          <button className="panel-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="panel-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default SlidingPanel;
