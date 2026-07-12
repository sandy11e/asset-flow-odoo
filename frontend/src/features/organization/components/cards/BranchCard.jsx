import React from 'react';
import { MapPin, Users, Box, Building } from 'lucide-react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';

const BranchCard = ({ branch, onView, onEdit, onDelete, className = '' }) => {
  if (!branch) return null;

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div className="p-5 flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4
                onClick={onView}
                className="text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600 transition-colors cursor-pointer"
              >
                {branch.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-300">
                  {branch.code}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {branch.city}, {branch.country}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <OrgStatusBadge status={branch.status} />
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

        <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate">{branch.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Users className="w-3.5 h-3.5 text-primary-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white font-semibold">{branch.employeeCount || 0}</strong> Staff</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Box className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white font-semibold">{branch.assetCount || 0}</strong> Assets</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BranchCard;
