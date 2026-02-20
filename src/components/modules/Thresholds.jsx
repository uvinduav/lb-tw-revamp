import React from 'react';
import ModulePage from '../ModulePage';

const Thresholds = () => {
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
        />
    );
};

export default Thresholds;
