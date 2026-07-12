import React from 'react';
import StatusBadge from '../controls/StatusBadge';
import SkeletonLoader from '../feedback/SkeletonLoader';
import EmptyState from '../feedback/EmptyState';
import { formatBookingTime, calculateDuration } from '../../utils/bookingUtils';
import { History, Building, User } from 'lucide-react';

const BookingHistoryTable = ({ history = [], isLoading = false, onView }) => {
  if (isLoading) return <SkeletonLoader count={4} />;
  if (!history || history.length === 0) {
    return <EmptyState title="No Booking History" description="There are no completed or archived booking logs available." />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-3">Log ID & Title</th>
            <th className="p-3">Resource & Type</th>
            <th className="p-3">User & Department</th>
            <th className="p-3">Time & Duration</th>
            <th className="p-3">Final Status</th>
            <th className="p-3 text-right">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
          {history.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50/80 dark:hover:bg-sidebar-hover transition-colors">
              <td className="p-3">
                <span className="text-[10px] text-gray-400 font-bold block">{log.id}</span>
                <span
                  onClick={() => onView && onView(log)}
                  className="font-bold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 truncate max-w-[170px] block"
                >
                  {log.title}
                </span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
                  <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                  <span>{log.resourceName}</span>
                </div>
                <span className="text-[10px] text-gray-400">{log.resourceType}</span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                  <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{log.requesterName}</span>
                </div>
                <span className="text-[10px] text-gray-400 pl-4.5 block">{log.department}</span>
              </td>
              <td className="p-3">
                <div className="font-medium text-gray-800 dark:text-gray-200">{formatBookingTime(log.startTime)}</div>
                <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                  Duration: {calculateDuration(log.startTime, log.endTime)}
                </div>
              </td>
              <td className="p-3">
                <StatusBadge status={log.status} />
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onView && onView(log)}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 cursor-pointer"
                >
                  View Log
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistoryTable;
