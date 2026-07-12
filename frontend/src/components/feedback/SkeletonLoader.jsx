import React from 'react';

const SkeletonLoader = ({ type = 'text', count = 1, className = '' }) => {
  const types = {
    text: 'h-4 w-full rounded',
    title: 'h-6 w-3/4 rounded',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-lg'
  };

  const selectedClass = types[type] || types.text;

  return (
    <div className="animate-pulse flex flex-col gap-2 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-gray-200 ${selectedClass} ${className}`} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
