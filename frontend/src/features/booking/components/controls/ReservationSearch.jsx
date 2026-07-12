import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const ReservationSearch = ({ value, onSearch, placeholder = 'Search resource schedule or reservation ID...', className = '' }) => {
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

export default ReservationSearch;
