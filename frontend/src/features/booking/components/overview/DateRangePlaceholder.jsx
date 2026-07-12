import React from 'react';
import { Calendar } from 'lucide-react';

const DateRangePlaceholder = ({ startDate = '2026-07-01', endDate = '2026-07-31', onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 bg-gray-50 dark:bg-sidebar-bg border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg text-xs ${className}`}>
      <Calendar className="w-4 h-4 text-primary-500" />
      <span className="font-semibold text-gray-700 dark:text-gray-300">Schedule Window:</span>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onChange && onChange(e.target.value, endDate)}
        className="bg-transparent text-gray-900 dark:text-white font-medium focus:outline-none cursor-pointer"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onChange && onChange(startDate, e.target.value)}
        className="bg-transparent text-gray-900 dark:text-white font-medium focus:outline-none cursor-pointer"
      />
    </div>
  );
};

export default DateRangePlaceholder;
