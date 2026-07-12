import React from 'react';
import Card from '@/components/ui/Card';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';

const BookingTimeline = ({ bookings = [], className = '' }) => {
  const recent = bookings.slice(0, 4);

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Clock className="w-4 h-4 text-purple-500" />
        <span>Reservation Activity Feed</span>
      </h4>

      <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
        {recent.map((item, idx) => (
          <div key={item.id || idx} className="relative">
            <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-primary-500 ring-2 ring-white dark:ring-sidebar-hover" />
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
              <span className="text-[10px] text-gray-400">{formatBookingTime(item.startTime)}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {item.resourceName} ({item.resourceType}) — <strong className="text-gray-700 dark:text-gray-300">{item.status}</strong>
            </p>
          </div>
        ))}
        {recent.length === 0 && (
          <p className="text-xs text-gray-400 italic">No recent reservation timeline items.</p>
        )}
      </div>
    </Card>
  );
};

export default BookingTimeline;
