import React from 'react';

const StatusChip = ({ status }) => {
  const getStatusStyles = (statusText) => {
    switch (statusText?.toLowerCase()) {
      case 'assigned':
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending transfer':
      case 'pending approval':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'returned':
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'in transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border shadow-sm ${getStatusStyles(status)}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

export default StatusChip;
