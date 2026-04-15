import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin border-t-teal-600"></div>
      </div>
    </div>
  );
};

export default Loader;