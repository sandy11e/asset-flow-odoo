import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const BranchSearch = ({ value, onSearch, placeholder = 'Search branches by city, code or name...', className = '' }) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      <SearchBar
        value={value}
        onSearch={onSearch}
        placeholder={placeholder}
        debounceMs={300}
      />
    </div>
  );
};

export default BranchSearch;
