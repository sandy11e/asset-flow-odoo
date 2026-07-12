import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const GlobalOrgSearch = ({ value, onSearch, placeholder = 'Global search organizations, departments, branches...', className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <SearchBar
        value={value}
        onSearch={onSearch}
        placeholder={placeholder}
        debounceMs={300}
      />
    </div>
  );
};

export default GlobalOrgSearch;
