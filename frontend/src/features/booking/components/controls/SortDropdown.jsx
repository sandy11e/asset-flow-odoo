import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { BOOKING_SORT_OPTIONS } from '../../constants/bookingConstants';

const SortDropdown = ({ sortBy, onSortChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="text-xs bg-gray-50 dark:bg-sidebar-bg border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1.5 font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
      >
        {BOOKING_SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
