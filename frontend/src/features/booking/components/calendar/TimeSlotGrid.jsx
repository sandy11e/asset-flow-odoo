import React from 'react';
import { Building, Clock } from 'lucide-react';

const TimeSlotGrid = ({ resources = [], onReserveSlot, className = '' }) => {
  const slots = ['09:00', '11:00', '13:00', '15:00', '17:00'];

  return (
    <div className={`bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xs ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-sidebar-bg flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-500" />
          <span>Multi-Resource Time Slot Matrix</span>
        </h3>
        <span className="text-xs text-gray-500">Select any open block to book</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-600 dark:text-gray-300 py-2.5">
            <div className="px-3 border-r border-gray-200 dark:border-gray-700">Resource Name</div>
            {slots.map((s) => (
              <div key={s} className="text-center">{s} - {String(Number(s.split(':')[0]) + 2).padStart(2, '0')}:00</div>
            ))}
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/80 text-xs">
            {resources.map((res) => (
              <div key={res.id} className="grid grid-cols-6 h-14 items-center">
                <div className="px-3 font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5 border-r border-gray-200 dark:border-gray-700 h-full">
                  <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                  <span className="truncate">{res.name}</span>
                </div>

                {slots.map((slot, idx) => {
                  const isBooked = !res.isAvailable && idx === 1; // Simulated block
                  return (
                    <div
                      key={`${res.id}-${slot}`}
                      onClick={() => !isBooked && onReserveSlot && onReserveSlot(res, slot)}
                      className={`h-full border-r border-gray-100 dark:border-gray-700/50 flex items-center justify-center font-semibold text-[11px] transition-colors ${
                        isBooked
                          ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 cursor-not-allowed'
                          : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 cursor-pointer'
                      }`}
                    >
                      {isBooked ? 'Booked' : 'Available'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotGrid;
