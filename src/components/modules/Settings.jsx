import React from 'react';
import ModulePage from '../ModulePage';

const Settings = () => {
  return (
    <ModulePage
      title="Settings"
      columns={['Setting Group', 'Key', 'Value', 'Last Modified']}
      data={[]}
      filterFields={['Setting Group', 'Key']}
      dataMap={{
        'Setting Group': 'group',
        'Key': 'key',
        'Value': 'value',
        'Last Modified': 'lastModified'
      }}
      showColumnCustomization={false}
    />
  );
};

export default Settings;
