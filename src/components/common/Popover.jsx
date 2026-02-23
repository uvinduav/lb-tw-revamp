import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Popover = ({ isOpen, onClose, children, className = '', topOffset = 8, rightOffset = 0, anchorEl }) => {
  const popoverRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  React.useLayoutEffect(() => {
    if (isOpen && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + topOffset,
        left: rect.right + window.scrollX - (popoverRef.current?.offsetWidth || 280) + rightOffset, // Align right edge
      });
    }
  }, [isOpen, anchorEl, topOffset, rightOffset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside popover AND outside the anchor element
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        (!anchorEl || !anchorEl.contains(event.target))
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', onClose); // Close on resize to update position
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', onClose);
    };
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      ref={popoverRef}
      className={`absolute bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.1)] border border-border z-[1000] min-w-[280px] overflow-hidden animate-fade-in ${className}`}
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default Popover;
