import React from 'react';
import Card from '@/components/ui/Card';
import StatusBadge from '../controls/StatusBadge';

const BookingStatusCard = ({ title, status, count, icon: Icon, className = '' }) => {
  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover flex items-center justify-between ${className}`}>
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-primary-500" />}
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h4>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{count || 0}</span>
          <StatusBadge status={status} />
        </div>
      </div>
    </Card>
  );
};

export default BookingStatusCard;
