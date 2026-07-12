import React from 'react';
import Card from '@/components/ui/Card';
import { Building, CheckCircle2, XCircle } from 'lucide-react';

const ResourceAvailabilityCard = ({ resource, onReserve, className = '' }) => {
  if (!resource) return null;

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Building className="w-4 h-4 text-primary-500 shrink-0" />
          <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{resource.name}</span>
        </div>
        <span
          className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
            resource.isAvailable
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
          }`}
        >
          {resource.isAvailable ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {resource.isAvailable ? 'Open' : 'In Use'}
        </span>
      </div>

      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        Category: <strong className="text-gray-800 dark:text-gray-200">{resource.type}</strong> | Capacity: <strong className="text-gray-800 dark:text-gray-200">{resource.capacity}</strong>
      </p>

      {onReserve && resource.isAvailable && (
        <button
          onClick={() => onReserve(resource)}
          className="w-full py-1.5 bg-primary-50 dark:bg-primary-950 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          Reserve Slot
        </button>
      )}
    </Card>
  );
};

export default ResourceAvailabilityCard;
