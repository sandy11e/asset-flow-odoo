import React from 'react';

const MainContentWrapper = ({ children, className = '', maxWidth = 'full' }) => {
  const maxWidthClasses = {
    full: 'w-full',
    container: 'max-w-7xl mx-auto w-full',
    narrow: 'max-w-5xl mx-auto w-full',
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50/70 flex flex-col">
      <div className={`p-4 sm:p-6 lg:p-8 flex-1 flex flex-col ${maxWidthClasses[maxWidth] || maxWidthClasses.full} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default MainContentWrapper;
