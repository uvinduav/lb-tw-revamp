import React, { useState } from 'react';
import SlidingPanel from '../common/SlidingPanel';
import { X, CheckCircle2 } from 'lucide-react';

const AlertsPanel = ({ isOpen, onClose, alerts = [], onDismiss }) => {
  const [activeTab, setActiveTab] = useState('all');

  const counts = {
    all: alerts.length,
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    anomaly: alerts.filter(a => a.type === 'anomaly').length,
  };

  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'critical', label: 'Critical', count: counts.critical },
    { id: 'warning', label: 'Warning', count: counts.warning },
    { id: 'anomaly', label: 'Anomaly', count: counts.anomaly },
  ];

  const filteredAlerts = activeTab === 'all'
    ? alerts
    : alerts.filter(a => a.type === activeTab);

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
          {filteredAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type}-bg`}>
              <div className="alert-item-content">
                <span className="alert-message">{alert.message}</span>
                <button
                  className="dismiss-alert-btn"
                  onClick={() => onDismiss && onDismiss(alert.id)}
                  title="Dismiss alert"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="no-alerts-empty-state">
              <div className="empty-state-icon">
                <CheckCircle2 size={48} strokeWidth={1.5} />
              </div>
              <p className="empty-state-title">All caught up!</p>
              <p className="empty-state-desc">No {activeTab !== 'all' ? activeTab : ''} alerts to review at this time.</p>
            </div>
          )}
        </div>
      </div>
    </SlidingPanel>
  );
};

export default AlertsPanel;
