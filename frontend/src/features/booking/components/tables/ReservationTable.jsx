import React from 'react';
import StatusBadge from '../controls/StatusBadge';
import ActionDropdown from '@/features/organization/components/controls/ActionDropdown';
import SkeletonLoader from '../feedback/SkeletonLoader';
import EmptyState from '../feedback/EmptyState';
import { formatBookingTime } from '../../utils/bookingUtils';
import { Building, Calendar, User } from 'lucide-react';

const ReservationTable = ({ reservations = [], isLoading = false, onView, onEdit, onCancel }) => {
  if (isLoading) return <SkeletonLoader count={4} />;
  if (!reservations || reservations.length === 0) {
    return <EmptyState title="No Active Reservations" description="There are currently no active reservations listed for this resource." />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-sidebar-bg text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="p-3">Reservation Title</th>
            <th className="p-3">Resource & Category</th>
            <th className="p-3">Schedule Window</th>
            <th className="p-3">Assigned User</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-xs">
          {reservations.map((res) => (
            <tr key={res.id} className="hover:bg-gray-50/80 dark:hover:bg-sidebar-hover transition-colors">
              <td className="p-3 font-bold text-gray-900 dark:text-white truncate max-w-[180px]">
                {res.title}
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1.5 font-semibold text-gray-800 dark:text-gray-200">
                  <Building className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                  <span>{res.resourceName}</span>
                </div>
                <span className="text-[10px] text-gray-400">{res.resourceType}</span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
                  <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{formatBookingTime(res.startTime)}</span>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-1 text-gray-800 dark:text-gray-200 font-medium">
                  <User className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{res.requesterName}</span>
                </div>
              </td>
              <td className="p-3">
                <StatusBadge status={res.status} />
              </td>
              <td className="p-3 text-right">
                <ActionDropdown
                  onView={() => onView && onView(res)}
                  onEdit={() => onEdit && onEdit(res)}
                  onDelete={onCancel ? () => onCancel(res) : undefined}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
