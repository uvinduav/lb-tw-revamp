import React from 'react';
import emptyBox from '../../assets/empty-box.png';

const Settings = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-[#888]">
        <img
          src={emptyBox}
          alt="No records"
          className="w-20 h-20 opacity-40"
        />
        <span className="text-sm font-medium">No records found</span>
      </div>
    </div>
  );
};

export default Settings;
