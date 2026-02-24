import React from 'react';
import ModulePage from '../ModulePage';

const Thresholds = ({ onNavigate }) => {
    return (
        <ModulePage
            title="Thresholds"
            columns={['Name', 'Type', 'Value', 'Status']}
            data={[]}
            filterFields={['Name', 'Type', 'Status']}
            dataMap={{
                'Name': 'name',
                'Type': 'type',
                'Value': 'value',
                'Status': 'status'
            }}
            onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Thresholds' })}
            createButtonText="Add New Threshold"
            onRowClick={(row) => onNavigate && onNavigate('Parameter Item Details', { ...row, parent: 'Thresholds' })}
        />
    );
};

export default Thresholds;
