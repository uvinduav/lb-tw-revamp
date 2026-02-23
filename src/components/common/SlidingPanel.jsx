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
        className={`fixed top-0 left-0 w-full h-full bg-black/30 z-[1000] transition-[opacity,visibility] duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed top-0 h-full bg-white z-[1001] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-[right] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'right-0' : '-right-full'}`}
        style={{ width: width }}
      >
        <div className="flex items-center justify-between h-[44px] px-6 border-b border-border">
          <h2 className="text-base font-semibold text-text-main m-0">{title}</h2>
          <button className="bg-transparent border-none cursor-pointer text-gray-400 p-1 rounded transition-all duration-200 flex items-center justify-center hover:bg-gray-100 hover:text-gray-900" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default SlidingPanel;
