import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const CalendarOverview = ({ resources = [] }) => {
  const total = resources.length;
  const available = resources.filter((r) => r.isAvailable).length;
  const booked = total - available;

  return (
    <Card className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary-500" />
          <span>Real-Time Schedule Overview</span>
        </h4>
        <span className="text-xs font-semibold text-gray-500">{available} of {total} Available</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
          <span className="text-lg font-bold text-emerald-900 dark:text-emerald-200 block">{available}</span>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase">Open Slots</span>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800/60">
          <Clock className="w-4 h-4 text-rose-600 mx-auto mb-1" />
          <span className="text-lg font-bold text-rose-900 dark:text-rose-200 block">{booked}</span>
          <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-400 uppercase">Occupied Now</span>
        </div>

        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60">
          <AlertCircle className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <span className="text-lg font-bold text-blue-900 dark:text-blue-200 block">100%</span>
          <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 uppercase">Uptime Index</span>
        </div>
      </div>
    </Card>
  );
};

export default CalendarOverview;
