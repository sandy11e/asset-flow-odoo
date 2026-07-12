import React from 'react';
import { Calendar, Clock, Building, CheckCircle2, XCircle } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';
import SkeletonLoader from '../feedback/SkeletonLoader';
import EmptyState from '../feedback/EmptyState';

const CalendarScheduleTable = ({ resources = [], isLoading = false, onSelectResource }) => {
  if (isLoading) return <SkeletonLoader count={4} />;
  if (!resources || resources.length === 0) {
    return <EmptyState title="No Schedule Data" description="No resource schedules available in the selected calendar directory." />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-3">Resource Name & Type</th>
            <th className="p-3">Capacity & Location</th>
            <th className="p-3">Current Availability</th>
            <th className="p-3">Next Open Slot</th>
            <th className="p-3">Active Booked Slots</th>
            <th className="p-3 text-right">Schedule Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
          {resources.map((res) => (
            <tr key={res.id} className="hover:bg-gray-50/80 dark:hover:bg-sidebar-hover transition-colors">
              <td className="p-3">
                <span className="font-bold text-gray-900 dark:text-white block truncate max-w-[170px]">{res.name}</span>
                <span className="text-[10px] font-semibold text-primary-600 dark:text-primary-400">{res.type}</span>
              </td>
              <td className="p-3">
                <div className="font-medium text-gray-800 dark:text-gray-200">{res.capacity}</div>
                <div className="text-[10px] text-gray-400 truncate max-w-[150px]">{res.location}</div>
              </td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    res.isAvailable
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}
                >
                  {res.isAvailable ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {res.isAvailable ? 'Available' : 'Booked'}
                </span>
              </td>
              <td className="p-3">
                <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {res.nextAvailableSlot || 'Now'}
                </span>
              </td>
              <td className="p-3">
                {res.bookedSlots && res.bookedSlots.length > 0 ? (
                  <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[11px]">
                    {res.bookedSlots.length} Active Slot(s)
                  </span>
                ) : (
                  <span className="text-gray-400 italic">None</span>
                )}
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onSelectResource && onSelectResource(res)}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 cursor-pointer"
                >
                  View Schedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarScheduleTable;
