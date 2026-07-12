import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const DepartmentSearch = ({ value, onSearch, placeholder = 'Search departments by name or code...', className = '' }) => {
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

export default DepartmentSearch;
