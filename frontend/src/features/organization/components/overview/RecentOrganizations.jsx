import React from 'react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import { Building2 } from 'lucide-react';

const RecentOrganizations = ({ organizations = [], onView, className = '' }) => {
  const recent = organizations.slice(0, 4);

  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-4 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Building2 className="w-4 h-4 text-primary-500" />
        <span>Recently Registered Entities</span>
      </h4>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {recent.map((org) => (
          <div
            key={org.id}
            onClick={() => onView && onView(org)}
            className="py-3 flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-sidebar-bg/60 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs shrink-0">
                {org.code.split('-')[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{org.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{org.industry}</p>
              </div>
            </div>
            <OrgStatusBadge status={org.status} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentOrganizations;
