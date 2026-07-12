import React from 'react';

const SkeletonLoader = ({ count = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-2/3" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
