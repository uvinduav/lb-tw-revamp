import React from 'react';
import SlidingPanel from '../common/SlidingPanel';

const AlertsPanel = ({ isOpen, onClose }) => {
  return (
    <SlidingPanel isOpen={isOpen} onClose={onClose} title="Alerts" width="400px">
      <div className="alerts-content">
        <div className="alert-categories">
          <span className="alert-category-pill critical">0 Critical</span>
          <span className="alert-category-pill warning">1 Warning</span>
          <span className="alert-category-pill anomaly">0 Anomaly</span>
        </div>

        <div className="alerts-list">
          <div className="alert-item warning-bg">
            <div className="alert-item-content">
              <span className="alert-message">Example alert</span>
            </div>
          </div>
        </div>
      </div>
    </SlidingPanel>
  );
};

export default AlertsPanel;
