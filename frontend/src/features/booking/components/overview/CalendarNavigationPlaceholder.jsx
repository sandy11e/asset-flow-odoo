import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';

const CalendarNavigationPlaceholder = ({ currentLabel = 'July 2026', onPrev, onNext, onToday, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-3 p-2.5 bg-gray-50 dark:bg-sidebar-bg rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary-500" />
        <span className="text-xs font-bold text-gray-900 dark:text-white">{currentLabel}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <Button variant="secondary" size="xs" onClick={onPrev} icon={ChevronLeft} />
        <Button variant="ghost" size="xs" onClick={onToday}>
          Today
        </Button>
        <Button variant="secondary" size="xs" onClick={onNext} icon={ChevronRight} />
      </div>
    </div>
  );
};

export default CalendarNavigationPlaceholder;
