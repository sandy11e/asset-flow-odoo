import React from 'react';
import BasePagination from '@/components/ui/Pagination';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, className = '' }) => {
  return (
    <div className={`p-4 bg-gray-50/50 dark:bg-sidebar-bg border-t border-gray-100 dark:border-gray-700 flex items-center justify-between ${className}`}>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Showing <strong className="text-gray-800 dark:text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems || 0)}</strong> to{' '}
        <strong className="text-gray-800 dark:text-white">{Math.min(currentPage * itemsPerPage, totalItems || 0)}</strong> of{' '}
        <strong className="text-gray-800 dark:text-white">{totalItems || 0}</strong> bookings
      </span>
      <BasePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default Pagination;
