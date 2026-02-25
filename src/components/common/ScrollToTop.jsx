import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = ({ activePage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollContainer, setScrollContainer] = useState(null);

  // Helper to find the main scrollable element
  const findScrollTarget = () => {
    // Priority 1: Check standard class names used in the app
    const candidates = [
      document.querySelector('.dashboard-container[style*="overflow"]'), // Inline style
      document.querySelector('.dashboard-container'),
      document.querySelector('.dashboard-main-wrapper[style*="overflow"]'),
      document.querySelector('.dashboard-main-wrapper'),
      document.querySelector('.table-container'), // Fallback for tables
      // Generic fallback: first div in main-content that looks scrollable
      document.querySelector('.main-content > div') 
    ];

    for (const el of candidates) {
      if (el) {
        // Check if it's potentially scrollable
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        ) {
          return el;
        }
        
        // Also valid if it has specific classes known to scroll, even if currently not overflowing
        if (
             el.classList.contains('dashboard-container') || 
             el.classList.contains('dashboard-main-wrapper')
        ) {
             // For valid containers that might be empty or just started, we still valid them 
             // but we specifically check for scrollable behavior usually
             if (style.overflowY === 'auto' || style.overflowY === 'scroll') return el;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    // Give usage small delay for render to complete
    const timer = setTimeout(() => {
      // Reset state on page change
      setScrollContainer(null);
      setIsVisible(false);

      const target = findScrollTarget();
      if (target) {
        setScrollContainer(target);
        // Initial check in case we are already scrolled (e.g. history navigation)
        if (target.scrollTop > window.innerHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
      } else {
          // If no specific target found, retry shortly (sometimes content loads async)
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activePage]); // Re-run when page changes

  // Cleanup old listener if scrollContainer changes (handled by effect cleanup mostly)
  useEffect(() => {
      if(!scrollContainer) return;
      
      const toggleVisibility = () => {
          if (scrollContainer.scrollTop > window.innerHeight) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
      };
      
      scrollContainer.addEventListener('scroll', toggleVisibility);
      return () => scrollContainer.removeEventListener('scroll', toggleVisibility);
  }, [scrollContainer]);


  const scrollToTop = () => {
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        backgroundColor: 'var(--color-primary-action)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
      }}
      title="Scroll to top"
      onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.backgroundColor = 'var(--color-primary-action-hover)';
      }}
      onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.backgroundColor = 'var(--color-primary-action)';
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
