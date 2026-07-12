import React from 'react';
import Card from '@/components/ui/Card';
import { Plus, Clock, Building } from 'lucide-react';

const QuickBookingCard = ({ resourceType, title, subtitle, icon: Icon, onQuickBook, className = '' }) => {
  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover hover:border-primary-500 transition-all flex items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
          {Icon ? <Icon className="w-5 h-5" /> : <Building className="w-5 h-5" />}
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {resourceType}
          </span>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{title}</h4>
          {subtitle && <p className="text-[11px] text-gray-400 truncate">{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={() => onQuickBook && onQuickBook(resourceType)}
        className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors shrink-0 cursor-pointer"
        title="Quick Book"
      >
        <Plus className="w-4 h-4" />
      </button>
    </Card>
  );
};

export default QuickBookingCard;
