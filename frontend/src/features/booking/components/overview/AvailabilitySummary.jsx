import React from 'react';
import Card from '@/components/ui/Card';
import { CheckCircle2, XCircle } from 'lucide-react';

const AvailabilitySummary = ({ resources = [], className = '' }) => {
  const available = resources.filter((r) => r.isAvailable);
  const occupied = resources.filter((r) => !r.isAvailable);

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Real-Time Resource Status</h4>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>Open ({available.length})</span>
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">Ready for immediate booking</p>
        </div>

        <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60">
          <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
            <XCircle className="w-4 h-4" />
            <span>In Use ({occupied.length})</span>
          </div>
          <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1">Currently booked by staff</p>
        </div>
      </div>
    </Card>
  );
};

export default AvailabilitySummary;
