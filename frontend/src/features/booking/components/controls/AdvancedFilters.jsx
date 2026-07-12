import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/forms/Select';
import { BOOKING_STATUS_OPTIONS, RESOURCE_TYPE_OPTIONS, BOOKING_PRIORITY_OPTIONS } from '../../constants/bookingConstants';

const AdvancedFilters = ({
  statusFilter,
  onStatusChange,
  resourceTypeFilter,
  onResourceTypeChange,
  priorityFilter,
  onPriorityChange,
  onReset,
  className = '',
}) => {
  return (
    <div className={`p-4 bg-gray-50 dark:bg-sidebar-bg rounded-xl border border-gray-200 dark:border-gray-700 space-y-3 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-primary-500" />
          <span>Advanced Reservation Filters</span>
        </div>
        <Button variant="ghost" size="xs" onClick={onReset} icon={RotateCcw}>
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Select
          label="Booking Status"
          options={BOOKING_STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        />
        <Select
          label="Resource Category"
          options={RESOURCE_TYPE_OPTIONS}
          value={resourceTypeFilter}
          onChange={(e) => onResourceTypeChange(e.target.value)}
        />
        <Select
          label="Priority Level"
          options={BOOKING_PRIORITY_OPTIONS}
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdvancedFilters;
