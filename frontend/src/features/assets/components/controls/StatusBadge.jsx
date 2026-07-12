import React from 'react';
import { clsx } from 'clsx';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (statusText) => {
    switch (statusText?.toLowerCase()) {
      case 'active':
      case 'available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'maintenance':
      case 'repair':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'retired':
      case 'disposed':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'assigned':
      case 'in-use':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <span 
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(status)
      )}
    >
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
