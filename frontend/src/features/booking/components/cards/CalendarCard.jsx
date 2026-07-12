import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Clock } from 'lucide-react';
import { formatBookingTime } from '../../utils/bookingUtils';

const CalendarCard = ({ slot, onSelect, className = '' }) => {
  if (!slot) return null;

  return (
    <Card
      onClick={() => onSelect && onSelect(slot)}
      className={`p-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover hover:border-primary-500 transition-all cursor-pointer space-y-2 ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatBookingTime(slot.start || slot.startTime)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-purple-500" />
          <span>Slot Active</span>
        </div>
      </div>
      <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
        {slot.title || slot.bookingTitle || 'Reserved Slot'}
      </h5>
    </Card>
  );
};

export default CalendarCard;
