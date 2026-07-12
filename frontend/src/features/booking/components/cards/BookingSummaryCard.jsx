import React from 'react';
import Card from '@/components/ui/Card';

const BookingSummaryCard = ({ title, value, subtitle, icon: Icon, color = 'text-primary-500', bgClass = 'bg-primary-50 dark:bg-primary-950/40', className = '' }) => {
  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover flex items-center justify-between ${className}`}>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bgClass} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </Card>
  );
};

export default BookingSummaryCard;
