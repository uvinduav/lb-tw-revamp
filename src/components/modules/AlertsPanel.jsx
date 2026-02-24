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

  const alertBgColors = {
    critical: 'bg-red-50 border-l-4 border-l-red-500',
    warning: 'bg-orange-50 border-l-4 border-l-orange-400',
    anomaly: 'bg-yellow-50 border-l-4 border-l-yellow-400',
  };

  return (
    <SlidingPanel isOpen={isOpen} onClose={onClose} title="Alerts" width="400px">
      <div className="-m-6">
        <div className="border-b border-border px-4 pt-2">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-2 text-[13px] font-medium border-none cursor-pointer transition-all duration-200 rounded-t ${activeTab === tab.id ? 'text-primary-action bg-bg-subtle border-b-2 border-b-primary-action' : 'text-text-secondary bg-transparent hover:text-text-main'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="text-text-tertiary ml-1">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="py-2">
          {filteredAlerts.map(alert => (
            <div key={alert.id} className={`mx-3 mb-2 rounded-md px-4 py-3 ${alertBgColors[alert.type] || 'bg-gray-50 border-l-4 border-l-gray-300'}`}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] text-text-main leading-snug">{alert.message}</span>
                <button
                  className="shrink-0 bg-transparent border-none cursor-pointer text-gray-400 p-0.5 rounded hover:bg-black/5 hover:text-gray-600 transition-all duration-150"
                  onClick={() => onDismiss && onDismiss(alert.id)}
                  title="Dismiss alert"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-emerald-400 mb-3">
                <CheckCircle2 size={48} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-text-main mb-1">All caught up!</p>
              <p className="text-xs text-text-secondary">No {activeTab !== 'all' ? activeTab : ''} alerts to review at this time.</p>
            </div>
          )}
        </div>
      </div>
    </SlidingPanel>
  );
};

export default AlertsPanel;
