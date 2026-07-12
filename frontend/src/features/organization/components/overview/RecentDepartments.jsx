import React from 'react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import { Layers } from 'lucide-react';

const RecentDepartments = ({ departments = [], onView, className = '' }) => {
  const recent = departments.slice(0, 4);

  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-4 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Layers className="w-4 h-4 text-purple-500" />
        <span>Recently Added Departments</span>
      </h4>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {recent.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onView && onView(dept)}
            className="py-3 flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-sidebar-bg/60 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                {dept.code.replace('DEPT-', '')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{dept.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{dept.orgName}</p>
              </div>
            </div>
            <OrgStatusBadge status={dept.status} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentDepartments;
