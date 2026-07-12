import React from 'react';
import { Search } from 'lucide-react';

const SearchPlaceholder = ({ placeholder = 'Search reservations & slots...', onFocus, className = '' }) => {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        readOnly
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-xs font-medium text-gray-500 cursor-pointer focus:outline-none"
      />
    </div>
  );
};

export default SearchPlaceholder;
