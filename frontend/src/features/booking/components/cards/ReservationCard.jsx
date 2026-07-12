import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Building, User } from 'lucide-react';
import StatusChip from '../controls/StatusChip';
import { formatBookingTime } from '../../utils/bookingUtils';

const ReservationCard = ({ reservation, onSelect, className = '' }) => {
  if (!reservation) return null;

  return (
    <Card
      onClick={() => onSelect && onSelect(reservation)}
      className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover hover:shadow-md transition-all cursor-pointer space-y-2.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400">
          {reservation.resourceType}
        </span>
        <StatusChip status={reservation.status} size="xs" />
      </div>

      <h5 className="text-sm font-bold text-gray-900 dark:text-white truncate">
        {reservation.title}
      </h5>

      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate">{reservation.resourceName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>{formatBookingTime(reservation.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-emerald-500" />
          <span className="truncate">{reservation.requesterName} ({reservation.department})</span>
        </div>
      </div>
    </Card>
  );
};

export default ReservationCard;
