import React from 'react';
import { MapPin, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import BranchCard from '../cards/BranchCard';

const BranchOverviewSection = ({ branches = [], onNewBranch, onViewBranch }) => {
  const navigate = useNavigate();
  const recentBranches = branches.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Operating Branches & Depots</h3>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 text-xs font-semibold">
            {branches.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/organization/branches')} icon={ArrowRight}>
            View All ({branches.length})
          </Button>
          <Button variant="primary" size="sm" onClick={onNewBranch} icon={Plus}>
            New Branch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentBranches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            onView={() => onViewBranch && onViewBranch(branch)}
          />
        ))}
      </div>
    </div>
  );
};

export default BranchOverviewSection;
