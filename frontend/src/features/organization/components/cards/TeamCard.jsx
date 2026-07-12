import React from 'react';
import { Users, Box, UserCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';

const TeamCard = ({ team, onView, onEdit, onDelete, className = '' }) => {
  if (!team) return null;

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div className="p-5 flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4
                onClick={onView}
                className="text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600 transition-colors cursor-pointer"
              >
                {team.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-300">
                  {team.code}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {team.deptName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <OrgStatusBadge status={team.status} />
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[32px]">
          {team.projectFocus || 'No team project focus assigned yet.'}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <UserCheck className="w-3.5 h-3.5 text-primary-500 shrink-0" />
            <span className="truncate">Lead: <strong className="text-gray-900 dark:text-white">{team.teamLead || 'Unassigned'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Box className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">{team.assignedAssetCount || 0}</strong> Assets</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;
