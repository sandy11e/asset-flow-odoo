import React from 'react';
import Card from '@/components/ui/Card';
import { TrendingUp, Users, Building, ShieldCheck } from 'lucide-react';

const QuickStatistics = ({ organizations = [], departments = [], branches = [], className = '' }) => {
  const totalOrgs = organizations.length;
  const totalDepts = departments.length;
  const totalBranches = branches.length;
  const totalStaff = organizations.reduce((sum, o) => sum + (o.employeeCount || 0), 0);

  const stats = [
    { label: 'Active Orgs Ratio', value: `${totalOrgs > 0 ? Math.round((organizations.filter(o => o.status === 'Active').length / totalOrgs) * 100) : 0}%`, icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Avg Staff / Org', value: totalOrgs > 0 ? Math.round(totalStaff / totalOrgs) : 0, icon: Users, color: 'text-primary-500' },
    { label: 'Total Hubs & Depots', value: totalBranches, icon: Building, color: 'text-amber-500' },
    { label: 'Department Density', value: totalOrgs > 0 ? (totalDepts / totalOrgs).toFixed(1) : '0', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}>
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <Card key={i} className="p-4 flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{s.label}</p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{s.value}</h4>
            </div>
            <Icon className={`w-6 h-6 ${s.color}`} />
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStatistics;
