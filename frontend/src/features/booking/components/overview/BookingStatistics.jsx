import React from 'react';
import Card from '@/components/ui/Card';

const BookingStatistics = ({ bookings = [] }) => {
  const total = bookings.length || 1;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const pending = bookings.filter((b) => b.status === 'Pending Approval').length;
  const inProgress = bookings.filter((b) => b.status === 'In Progress').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;

  const getPercent = (count) => Math.round((count / total) * 100);

  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Reservation Status Breakdown</h4>
      
      <div className="space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <span>Confirmed / Active Reservations</span>
            <span>{confirmed} ({getPercent(confirmed)}%)</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${getPercent(confirmed)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <span>Pending Authorization Requests</span>
            <span>{pending} ({getPercent(pending)}%)</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${getPercent(pending)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <span>In-Progress Sessions</span>
            <span>{inProgress} ({getPercent(inProgress)}%)</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${getPercent(inProgress)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <span>Completed & Archived</span>
            <span>{completed} ({getPercent(completed)}%)</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${getPercent(completed)}%` }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingStatistics;
