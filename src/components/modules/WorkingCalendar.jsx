import React from 'react';
import ModulePage from '../ModulePage';

const WorkingCalendar = ({ onNavigate }) => {
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
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Working Calendar' })}
      createButtonText="Add New Calendar"
    />
  );
};

export default WorkingCalendar;
