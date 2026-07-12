import React from 'react';
import Card from '@/components/ui/Card';
import { Building, Users, Truck, Wrench, Laptop, ShieldCheck } from 'lucide-react';

const ReservationOverview = ({ resources = [] }) => {
  const categories = [
    { label: 'Meeting Rooms', type: 'Meeting Room', icon: Building, color: 'text-blue-500' },
    { label: 'Vehicles / Fleet', type: 'Vehicle', icon: Truck, color: 'text-emerald-500' },
    { label: 'Equipment & Gear', type: 'Equipment', icon: Wrench, color: 'text-amber-500' },
    { label: 'Workspaces / Pods', type: 'Workspace', icon: Laptop, color: 'text-purple-500' },
    { label: 'Specialized Labs', type: 'Lab', icon: ShieldCheck, color: 'text-rose-500' },
  ];

  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Resource Category Distribution</h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const count = resources.filter((r) => r.type === cat.type).length;
          const Icon = cat.icon;
          return (
            <div key={cat.type} className="p-3 rounded-xl bg-gray-50 dark:bg-sidebar-bg border border-gray-100 dark:border-gray-700/80 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-sidebar-hover shadow-2xs shrink-0 ${cat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-lg font-bold text-gray-900 dark:text-white block">{count}</span>
                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 truncate block">{cat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ReservationOverview;
