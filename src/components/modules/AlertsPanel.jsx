import React, { useState } from 'react';
import SlidingPanel from '../common/SlidingPanel';

const AlertsPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All', count: 1 },
    { id: 'critical', label: 'Critical', count: 0 },
    { id: 'warning', label: 'Warning', count: 1 },
    { id: 'anomaly', label: 'Anomaly', count: 0 },
  ];

  return (
    <SlidingPanel isOpen={isOpen} onClose={onClose} title="Alerts" width="400px">
      <div className="alerts-content">
        <div className="panel-tabs-wrapper">
          <div className="panel-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`panel-tab-item ${tab.id} ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="tab-count">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="alerts-list">
          {(activeTab === 'all' || activeTab === 'warning') && (
            <div className="alert-item warning-bg">
              <div className="alert-item-content">
                <span className="alert-message">Example alert</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SlidingPanel>
  );
};

export default AlertsPanel;
