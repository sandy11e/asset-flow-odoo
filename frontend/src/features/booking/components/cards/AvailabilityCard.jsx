import React from 'react';
import Card from '@/components/ui/Card';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const AvailabilityCard = ({ resource, onBook, className = '' }) => {
  if (!resource) return null;

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {resource.type}
          </span>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{resource.name}</h4>
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            resource.isAvailable
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
          }`}
        >
          {resource.isAvailable ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {resource.isAvailable ? 'Available Now' : 'In Use / Booked'}
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-sidebar-bg text-xs space-y-1 text-gray-600 dark:text-gray-300">
        <p>Capacity / Spec: <strong className="text-gray-900 dark:text-white">{resource.capacity || 'Standard'}</strong></p>
        <p>Location: <strong className="text-gray-900 dark:text-white">{resource.location || 'N/A'}</strong></p>
        <p className="flex items-center gap-1 text-gray-500 pt-0.5 border-t border-gray-200/60 dark:border-gray-700/60">
          <Clock className="w-3 h-3 text-amber-500" />
          <span>Next Open: <strong className="text-gray-800 dark:text-gray-200">{resource.nextAvailableSlot || 'Now'}</strong></span>
        </p>
      </div>

      {onBook && resource.isAvailable && (
        <button
          onClick={() => onBook(resource)}
          className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          Reserve This Resource
        </button>
      )}
    </Card>
  );
};

export default AvailabilityCard;
