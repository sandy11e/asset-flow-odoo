import React from 'react';

const OrgStatusBadge = ({ status, className = '' }) => {
  const statusMap = {
    Active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 ring-1 ring-emerald-500/20',
    'Pending Approval': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 ring-1 ring-amber-500/20',
    'Under Review': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 ring-1 ring-purple-500/20',
    Maintenance: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 ring-1 ring-blue-500/20',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-gray-500/20',
  };

  const badgeClass = statusMap[status] || statusMap.Inactive;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize transition-colors ${badgeClass} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status || 'Unknown'}
    </span>
  );
};

export default OrgStatusBadge;
