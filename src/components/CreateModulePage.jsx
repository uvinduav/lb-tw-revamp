import React from 'react';
import emptyBox from '../assets/empty-box.png';

const CreateModulePage = ({ title }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-text-main m-0">{title}</h1>
          </div>
        </div>
      </div>

      <div className="bg-white flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <img
            src={emptyBox}
            alt="Empty State"
            style={{ width: '80px', height: '80px', opacity: 0.4 }}
          />
          <span>Configuration options will appear here</span>
        </div>
      </div>
    </div>
  );
};

export default CreateModulePage;
