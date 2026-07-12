import React from 'react';
import { Layers, Users, Box, DollarSign } from 'lucide-react';
import Card from '@/components/ui/Card';

const DepartmentStatisticsPanel = ({ departments = [], className = '' }) => {
  const totalDepts = departments.length;
  const activeDepts = departments.filter((d) => d.status === 'Active').length;
  const totalStaff = departments.reduce((acc, d) => acc + (d.employeeCount || 0), 0);
  const totalAssets = departments.reduce((acc, d) => acc + (d.assetCount || 0), 0);

  const stats = [
    {
      title: 'Total Departments',
      value: totalDepts,
      subtitle: `${activeDepts} active units`,
      icon: Layers,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    },
    {
      title: 'Department Headcount',
      value: totalStaff.toLocaleString(),
      subtitle: 'Assigned personnel',
      icon: Users,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    {
      title: 'Allocated Assets',
      value: totalAssets.toLocaleString(),
      subtitle: 'Hardware & equipment',
      icon: Box,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    },
    {
      title: 'Annual Budget Allocations',
      value: '$43.9M',
      subtitle: 'Total budget pool',
      icon: DollarSign,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
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

export default DepartmentStatisticsPanel;
