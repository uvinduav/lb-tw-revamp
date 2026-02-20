import React from 'react';
import ModulePage from '../ModulePage';

const Alerts = () => {
    return (
        <ModulePage
            title="Alerts"
            columns={['Alert', 'Severity', 'Time', 'Status']}
            data={[]}
            filterFields={['Alert', 'Severity', 'Status']}
            dataMap={{
                'Alert': 'alert',
                'Severity': 'severity',
                'Time': 'time',
                'Status': 'status'
            }}
        />
    );
};

export default Alerts;
