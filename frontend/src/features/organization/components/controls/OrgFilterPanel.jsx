import React from 'react';
import { Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ORG_STATUS_OPTIONS, INDUSTRY_OPTIONS } from '../../constants/orgConstants';

const OrgFilterPanel = ({
  statusFilter,
  onStatusChange,
  industryFilter,
  onIndustryChange,
  onReset,
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-sidebar-hover p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <Filter className="w-4 h-4 text-primary-600" />
          <span>Filter Organizations</span>
        </div>
        {(statusFilter || industryFilter) && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-rose-600">
            Reset Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status select */}
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-bg px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {ORG_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Industry select */}
        {onIndustryChange && (
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1.5">
              Industry
            </label>
            <select
              value={industryFilter || ''}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-bg px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">All Industries</option>
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgFilterPanel;
