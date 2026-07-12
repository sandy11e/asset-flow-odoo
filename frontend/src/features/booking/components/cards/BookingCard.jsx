import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Clock, MapPin, Users, Building, AlertCircle } from 'lucide-react';
import StatusBadge from '../controls/StatusBadge';
import { formatBookingTime, calculateDuration } from '../../utils/bookingUtils';

const BookingCard = ({ booking, onView, onEdit, onCancel, className = '' }) => {
  if (!booking) return null;

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover hover:border-primary-500/50 transition-all shadow-2xs space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
            {booking.id} • {booking.resourceType}
          </span>
          <h4
            onClick={() => onView && onView(booking)}
            className="text-sm font-bold text-gray-900 dark:text-white truncate cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-0.5"
          >
            {booking.title}
          </h4>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-sidebar-bg space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
          <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
          <span className="truncate">{booking.resourceName}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
            <span>{formatBookingTime(booking.startTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-500 shrink-0" />
            <span>{calculateDuration(booking.startTime, booking.endTime)}</span>
          </div>
        </div>
        {booking.location && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">
            <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">{booking.location}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-500">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span>{booking.attendees || 1} people</span>
          </div>
          {booking.priority === 'Urgent' && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
              <AlertCircle className="w-2.5 h-2.5" /> Urgent
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onEdit && (
            <button
              onClick={() => onEdit(booking)}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 cursor-pointer"
            >
              Edit
            </button>
          )}
          {onCancel && booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
            <button
              onClick={() => onCancel(booking)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 cursor-pointer pl-2 border-l border-gray-200 dark:border-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
