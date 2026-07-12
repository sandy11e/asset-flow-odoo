import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Synchronizing calendar & reservation slots...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-3 ${className}`}>
      <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
};

export default LoadingState;
