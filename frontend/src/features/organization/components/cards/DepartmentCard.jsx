import React from 'react';
import { Layers, Users, Box, UserCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';

const DepartmentCard = ({ department, onView, onEdit, onDelete, className = '' }) => {
  if (!department) return null;

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div className="p-5 flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4
                onClick={onView}
                className="text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600 transition-colors cursor-pointer"
              >
                {department.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-300">
                  {department.code}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {department.orgName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <OrgStatusBadge status={department.status} />
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[32px]">
          {department.description || 'No department description provided.'}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <UserCheck className="w-3.5 h-3.5 text-primary-500 shrink-0" />
            <span className="truncate">Head: <strong className="text-gray-900 dark:text-white">{department.headOfDepartment || 'N/A'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">{department.employeeCount || 0}</strong> Staff</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 col-span-2">
            <Box className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Assigned Assets: <strong className="text-gray-900 dark:text-white">{department.assetCount || 0} items</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DepartmentCard;
