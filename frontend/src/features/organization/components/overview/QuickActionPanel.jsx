import React from 'react';
import Card from '@/components/ui/Card';
import { Plus, Building2, Layers, MapPin, Users } from 'lucide-react';

const QuickActionPanel = ({ onNewOrg, onNewDept, onNewBranch, onNewTeam, className = '' }) => {
  const actions = [
    { title: 'New Organization', desc: 'Register holding entity', icon: Building2, onClick: onNewOrg, color: 'text-primary-600 bg-primary-50 dark:bg-primary-950 dark:text-primary-400' },
    { title: 'Add Department', desc: 'Create corporate department', icon: Layers, onClick: onNewDept, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400' },
    { title: 'Register Branch', desc: 'Add regional hub / depot', icon: MapPin, onClick: onNewBranch, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400' },
    { title: 'Create Work Team', desc: 'Assign operational squad', icon: Users, onClick: onNewTeam, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400' },
  ];

  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-3 ${className}`}>
      <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Plus className="w-4 h-4 text-primary-500" />
        <span>Quick Management Actions</span>
      </h4>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <button
              key={i}
              onClick={act.onClick}
              className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-500/50 bg-gray-50/50 dark:bg-sidebar-bg flex flex-col items-start gap-2 text-left transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.color}`}>
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{act.title}</p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{act.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActionPanel;
