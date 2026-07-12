import React from 'react';
import { CalendarOff } from 'lucide-react';
import Button from '@/components/ui/Button';

const EmptyState = ({
  title = 'No Reservations Found',
  description = 'There are no bookings matching your current filter criteria or selected date range.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-3 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-500">
        <CalendarOff className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
