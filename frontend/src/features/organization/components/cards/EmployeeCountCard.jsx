import React from 'react';
import { Users } from 'lucide-react';
import Card from '@/components/ui/Card';

const EmployeeCountCard = ({ totalEmployees = 0, activeCount = 0, className = '' }) => {
  return (
    <Card className={`p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Total Headcount
        </span>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
          {totalEmployees.toLocaleString()}
        </h3>
        {activeCount > 0 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            ● {activeCount} assigned to active entities
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
        <Users className="w-6 h-6" />
      </div>
    </Card>
  );
};

export default EmployeeCountCard;
