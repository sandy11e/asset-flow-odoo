import React from 'react';
import SearchBar from '@/components/forms/SearchBar';

const BookingSearch = ({ value, onSearch, placeholder = 'Search bookings by title, ID or requester...', className = '' }) => {
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

export default BookingSearch;
