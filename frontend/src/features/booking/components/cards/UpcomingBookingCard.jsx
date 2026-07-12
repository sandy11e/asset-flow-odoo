import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatBookingTime, calculateDuration } from '../../utils/bookingUtils';

const UpcomingBookingCard = ({ booking, onView, className = '' }) => {
  if (!booking) return null;

  return (
    <Card
      onClick={() => onView && onView(booking)}
      className={`p-3.5 border border-primary-500/30 bg-primary-50/30 dark:bg-primary-950/20 hover:border-primary-500 transition-all cursor-pointer space-y-2 ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-bold text-primary-600 dark:text-primary-400">
        <span>IMMINENT APPOINTMENT</span>
        <span>{booking.resourceType}</span>
      </div>
      <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">{booking.title}</h5>
      <div className="flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-blue-500" />
          {formatBookingTime(booking.startTime)}
        </span>
        <span className="flex items-center gap-1 font-semibold">
          <Clock className="w-3 h-3 text-purple-500" />
          {calculateDuration(booking.startTime, booking.endTime)}
        </span>
      </div>
    </Card>
  );
};

export default UpcomingBookingCard;
