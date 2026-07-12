import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';

const TeamSummaryCard = ({ count = 0, totalMembers = 0, className = '' }) => {
  const navigate = useNavigate();

  return (
    <Card className={`p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Work Teams
          </span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
            {count}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          {totalMembers} Total Members
        </span>
        <button
          onClick={() => navigate('/organization/teams')}
          className="flex items-center gap-1 font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};

export default TeamSummaryCard;
