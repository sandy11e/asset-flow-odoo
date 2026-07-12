import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  value = '', 
  className = '',
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs, onSearch]);

  // Sync prop value changes
  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
