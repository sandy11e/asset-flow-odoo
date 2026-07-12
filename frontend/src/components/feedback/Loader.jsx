import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', className = '', text }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-blue-600 ${sizes[size]}`} />
      {text && (
        <p className="mt-2 text-sm font-medium text-gray-500">{text}</p>
      )}
    </div>
  );
};

export default Loader;
