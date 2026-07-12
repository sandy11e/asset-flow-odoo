import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const OrganizationSearch = ({ value, onSearch, placeholder = 'Search organizations by name or code (e.g. AF-GT)...', className = '' }) => {
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

export default OrganizationSearch;
