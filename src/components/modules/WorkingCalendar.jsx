import React from 'react';
import ModulePage from '../ModulePage';

const CALENDAR_DATA = [
  { id: 1,  date: '2026-01-31', displayDate: 'January 31, 2026',   type: 'Month End', status: 'Approved' },
  { id: 2,  date: '2025-12-31', displayDate: 'December 31, 2025',  type: 'Month End', status: 'Approved' },
  { id: 3,  date: '2025-11-28', displayDate: 'November 28, 2025',  type: 'Month End', status: 'Approved' },
  { id: 4,  date: '2025-10-31', displayDate: 'October 31, 2025',   type: 'Month End', status: 'Approved' },
  { id: 5,  date: '2025-09-30', displayDate: 'September 30, 2025', type: 'Month End', status: 'Approved' },
  { id: 6,  date: '2025-08-29', displayDate: 'August 29, 2025',    type: 'Month End', status: 'Approved' },
  { id: 7,  date: '2025-07-31', displayDate: 'July 31, 2025',      type: 'Month End', status: 'Approved' },
  { id: 8,  date: '2025-06-30', displayDate: 'June 30, 2025',      type: 'Month End', status: 'Approved' },
  { id: 9,  date: '2025-05-30', displayDate: 'May 30, 2025',       type: 'Month End', status: 'Approved' },
  { id: 10, date: '2025-04-30', displayDate: 'April 30, 2025',     type: 'Month End', status: 'Approved' },
  { id: 11, date: '2025-03-31', displayDate: 'March 31, 2025',     type: 'Month End', status: 'Approved' },
  { id: 12, date: '2025-02-28', displayDate: 'February 28, 2025',  type: 'Month End', status: 'Approved' },
];

const WorkingCalendar = ({ onNavigate }) => {
  return (
    <ModulePage
      title="Working Calendar"
      columns={['Date', 'Day Type', 'Status']}
      data={CALENDAR_DATA}
      filterFields={['Date', 'Day Type', 'Status']}
      dataMap={{
        'Date':     'displayDate',
        'Day Type': 'type',
        'Status':   'status',
      }}
      onCreate={(title) => onNavigate && onNavigate('Create Page', { title, parent: 'Working Calendar' })}
      createButtonText="Add New Calendar"
      onRowClick={(row) => onNavigate && onNavigate('Working Calendar Item Details', row)}
    />
  );
};

export default WorkingCalendar;
