import React from 'react';
import { Building2, Layers, Users, MapPin } from 'lucide-react';
import Card from '@/components/ui/Card';

const OrganizationStatisticsPanel = ({ organizations = [], className = '' }) => {
  const totalOrgs = organizations.length;
  const activeOrgs = organizations.filter((o) => o.status === 'Active').length;
  const totalEmployees = organizations.reduce((acc, o) => acc + (o.employeeCount || 0), 0);
  const totalDepts = organizations.reduce((acc, o) => acc + (o.departmentCount || 0), 0);
  const totalBranches = organizations.reduce((acc, o) => acc + (o.branchCount || 0), 0);

  const stats = [
    {
      title: 'Total Organizations',
      value: totalOrgs,
      subtitle: `${activeOrgs} active entities`,
      icon: Building2,
      color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
    },
    {
      title: 'Total Departments',
      value: totalDepts,
      subtitle: 'Across all registered orgs',
      icon: Layers,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    },
    {
      title: 'Global Headcount',
      value: totalEmployees.toLocaleString(),
      subtitle: 'Employee records',
      icon: Users,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    {
      title: 'Operating Branches',
      value: totalBranches,
      subtitle: 'Regional hubs & depots',
      icon: MapPin,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {stat.title}
              </span>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {stat.value}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {stat.subtitle}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default OrganizationStatisticsPanel;
