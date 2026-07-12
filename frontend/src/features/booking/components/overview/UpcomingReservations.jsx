import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Clock, Building } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';

const UpcomingReservations = ({ bookings = [], onView, className = '' }) => {
  const upcoming = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').slice(0, 4);

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary-500" />
        <span>Upcoming Confirmed Appointments</span>
      </h4>

      <div className="space-y-2.5">
        {upcoming.map((item) => (
          <div
            key={item.id}
            onClick={() => onView && onView(item)}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-sidebar-bg border border-gray-100 dark:border-gray-700/80 hover:border-primary-500/40 transition-all cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3 h-3 text-primary-500 shrink-0" />
                <span className="truncate">{item.resourceName}</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 block">
                {formatBookingTime(item.startTime)}
              </span>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 block">
                {item.status}
              </span>
            </div>
          </div>
        ))}
        {upcoming.length === 0 && (
          <p className="text-xs text-gray-400 italic py-3 text-center">No immediate upcoming appointments.</p>
        )}
      </div>
    </Card>
  );
};

export default UpcomingReservations;
