import React from 'react';
import Card from '@/components/ui/Card';
import { PlusCircle, CalendarPlus, Truck, Laptop } from 'lucide-react';

const QuickActionsPanel = ({ onQuickReserve, className = '' }) => {
  const actions = [
    { label: 'Book Meeting Room', type: 'Meeting Room', icon: CalendarPlus, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Reserve Vehicle', type: 'Vehicle', icon: Truck, color: 'bg-emerald-600 hover:bg-emerald-700' },
    { label: 'Request Equipment / Pod', type: 'Workspace', icon: Laptop, color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <Card className={`p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-primary-500" />
        <span>Quick Reservation Shortcuts</span>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.type}
              onClick={() => onQuickReserve && onQuickReserve(act.type)}
              className={`p-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${act.color}`}
            >
              <Icon className="w-4 h-4" />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActionsPanel;
