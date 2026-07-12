import React from 'react';
import Card from '@/components/ui/Card';
import StatusBadge from '../controls/StatusBadge';
import { Clock } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';

const RecentBookings = ({ bookings = [], onView }) => {
  const recent = bookings.slice(0, 4);

  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Clock className="w-4 h-4 text-purple-500" />
        <span>Recently Submitted Requests</span>
      </h4>

      <div className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
        {recent.map((item) => (
          <div
            key={item.id}
            onClick={() => onView && onView(item)}
            className="py-2.5 flex items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-sidebar-bg/50 cursor-pointer transition-colors"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-gray-400 block">{item.id}</span>
              <h5 className="font-bold text-gray-900 dark:text-white truncate">{item.title}</h5>
              <p className="text-gray-500 text-[11px] truncate">{item.resourceName}</p>
            </div>
            <div className="text-right shrink-0 space-y-1">
              <StatusBadge status={item.status} />
              <span className="text-[10px] text-gray-400 block">{formatBookingTime(item.createdAt || item.startTime)}</span>
            </div>
          </div>
        ))}
        {recent.length === 0 && <p className="text-xs text-gray-400 italic py-3 text-center">No recent records.</p>}
      </div>
    </Card>
  );
};

export default RecentBookings;
