import React from 'react';

const StatusChip = ({ status, size = 'sm', className = '' }) => {
  const chipMap = {
    Confirmed: 'bg-emerald-500 text-white',
    'Pending Approval': 'bg-amber-500 text-white',
    'In Progress': 'bg-blue-500 text-white',
    Completed: 'bg-purple-500 text-white',
    Cancelled: 'bg-gray-500 text-white',
    Rejected: 'bg-rose-500 text-white',
  };

  const bgClass = chipMap[status] || chipMap.Cancelled;
  const sizeClass = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-block font-semibold rounded-md uppercase tracking-wider ${bgClass} ${sizeClass} ${className}`}>
      {status}
    </span>
  );
};

export default StatusChip;
