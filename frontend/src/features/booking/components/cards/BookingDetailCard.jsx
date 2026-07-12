import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Clock, MapPin, Users, Building, FileText, Mail } from 'lucide-react';
import StatusBadge from '../controls/StatusBadge';
import { formatBookingTime, calculateDuration } from '../../utils/bookingUtils';

const BookingDetailCard = ({ booking, className = '' }) => {
  if (!booking) return null;

  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{booking.id}</span>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{booking.title}</h3>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Building className="w-4 h-4 text-primary-500 shrink-0" />
            <span>Resource: <strong className="text-gray-900 dark:text-white">{booking.resourceName}</strong> ({booking.resourceType})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Start Time: <strong className="text-gray-900 dark:text-white">{formatBookingTime(booking.startTime)}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 text-purple-500 shrink-0" />
            <span>End Time: <strong className="text-gray-900 dark:text-white">{formatBookingTime(booking.endTime)}</strong> ({calculateDuration(booking.startTime, booking.endTime)})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Location: <strong className="text-gray-900 dark:text-white">{booking.location || 'N/A'}</strong></span>
          </div>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-3 md:pt-0 md:pl-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Requester: <strong className="text-gray-900 dark:text-white">{booking.requesterName}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Email: <strong className="text-gray-900 dark:text-white">{booking.requesterEmail || 'N/A'}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span className="w-4 h-4 text-center font-bold text-[10px] bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">D</span>
            <span>Department: <strong className="text-gray-900 dark:text-white">{booking.department || 'General'}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span className="w-4 h-4 text-center font-bold text-[10px] bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">#</span>
            <span>Attendees Count: <strong className="text-gray-900 dark:text-white">{booking.attendees || 1} people</strong></span>
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-gray-700 dark:text-gray-300 block mb-0.5">Special Instructions & Notes:</span>
            <p className="text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-sidebar-bg p-2 rounded-lg border border-gray-200 dark:border-gray-700">
              "{booking.notes}"
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BookingDetailCard;
