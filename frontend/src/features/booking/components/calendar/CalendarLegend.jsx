import React from 'react';

const CalendarLegend = ({ className = '' }) => {
  const items = [
    { label: 'Confirmed / Active', color: 'bg-emerald-500' },
    { label: 'Pending Approval', color: 'bg-amber-500' },
    { label: 'In Progress / Using', color: 'bg-blue-500' },
    { label: 'Completed', color: 'bg-purple-500' },
    { label: 'Cancelled / Rejected', color: 'bg-rose-500' },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-sidebar-bg rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">Color Legend:</span>
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${it.color}`} />
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarLegend;
