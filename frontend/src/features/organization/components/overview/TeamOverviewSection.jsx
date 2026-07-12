import React from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import TeamCard from '../cards/TeamCard';

const TeamOverviewSection = ({ teams = [], onNewTeam, onViewTeam }) => {
  const navigate = useNavigate();
  const recentTeams = teams.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Active Operational Teams</h3>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs font-semibold">
            {teams.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/organization/teams')} icon={ArrowRight}>
            View All ({teams.length})
          </Button>
          <Button variant="primary" size="sm" onClick={onNewTeam} icon={Plus}>
            New Team
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onView={() => onViewTeam && onViewTeam(team)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamOverviewSection;
