import React from 'react';
import Card from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

const ResourceUtilizationPlaceholder = ({ resources = [], className = '' }) => {
  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary-500" />
          <span>Resource Utilization Analytics</span>
        </h4>
        <span className="text-xs text-gray-400">Monthly Average</span>
      </div>

      <div className="space-y-2.5 text-xs">
        {resources.slice(0, 4).map((r, i) => {
          const util = 45 + (i * 14) % 45;
          return (
            <div key={r.id}>
              <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <span className="truncate max-w-[200px]">{r.name}</span>
                <span className="font-bold text-primary-600">{util}% Occupied</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    util > 75 ? 'bg-rose-500' : util > 55 ? 'bg-amber-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${util}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ResourceUtilizationPlaceholder;
