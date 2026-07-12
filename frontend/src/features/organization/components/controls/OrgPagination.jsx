import React from 'react';
import Pagination from '@/components/tables/Pagination';

const OrgPagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage = 10, className = '' }) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      className={`rounded-b-xl ${className}`}
    />
  );
};

export default OrgPagination;
