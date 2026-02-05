import React from 'react';
import ModulePage from '../ModulePage';

const WorkingCalendar = () => {
  return (
    <ModulePage 
      title="Working Calendar"
      columns={['Date', 'Day Type', 'Holiday Name', 'Location']}
      data={[]}
      filterFields={['Date', 'Day Type', 'Location']}
      dataMap={{ 
          'Date': 'date', 
          'Day Type': 'type', 
          'Holiday Name': 'holidayName',
          'Location': 'location'
      }}
    />
  );
};

export default WorkingCalendar;
