import React from 'react';
import Table from '@/components/tables/Table';
import StatusBadge from '../controls/StatusBadge';
import ActionDropdown from '@/features/organization/components/controls/ActionDropdown';
import SkeletonLoader from '../feedback/SkeletonLoader';
import EmptyState from '../feedback/EmptyState';
import { formatBookingTime, calculateDuration } from '../../utils/bookingUtils';
import { Calendar, Building, Users } from 'lucide-react';

const BookingTable = ({
  bookings = [],
  isLoading = false,
  onView,
  onEdit,
  onCancel,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
}) => {
  if (isLoading) {
    return <SkeletonLoader count={5} />;
  }

  if (!bookings || bookings.length === 0) {
    return <EmptyState title="No Bookings Recorded" description="No reservation entries match the current directory filter." />;
  }

  const allSelected = bookings.length > 0 && selectedIds.length === bookings.length;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <th className="p-3 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
            </th>
            <th className="p-3">ID & Title</th>
            <th className="p-3">Resource & Type</th>
            <th className="p-3">Requester</th>
            <th className="p-3">Start & Duration</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
          {bookings.map((booking) => {
            const isSelected = selectedIds.includes(booking.id);
            return (
              <tr
                key={booking.id}
                className={`hover:bg-gray-50/80 dark:hover:bg-sidebar-hover transition-colors ${
                  isSelected ? 'bg-primary-50/40 dark:bg-primary-950/20' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectRow && onSelectRow(booking.id)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                </td>
                <td className="p-3 font-semibold text-gray-900 dark:text-white">
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">{booking.id}</span>
                  <span
                    onClick={() => onView && onView(booking)}
                    className="cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 font-bold block truncate max-w-[180px]"
                  >
                    {booking.title}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
                    <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                    <span className="truncate max-w-[150px]">{booking.resourceName}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{booking.resourceType}</span>
                </td>
                <td className="p-3">
                  <div className="font-semibold text-gray-900 dark:text-white">{booking.requesterName}</div>
                  <div className="text-[10px] text-gray-400">{booking.department}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{formatBookingTime(booking.startTime)}</span>
                  </div>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                    Duration: {calculateDuration(booking.startTime, booking.endTime)}
                  </div>
                </td>
                <td className="p-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="p-3 text-right">
                  <ActionDropdown
                    onView={() => onView && onView(booking)}
                    onEdit={() => onEdit && onEdit(booking)}
                    onDelete={
                      onCancel && booking.status !== 'Cancelled'
                        ? () => onCancel(booking)
                        : undefined
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
