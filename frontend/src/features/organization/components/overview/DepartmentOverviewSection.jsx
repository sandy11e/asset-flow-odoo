import React from 'react';
import { Layers, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import DepartmentCard from '../cards/DepartmentCard';

const DepartmentOverviewSection = ({ departments = [], onNewDept, onViewDept }) => {
  const navigate = useNavigate();
  const recentDepts = departments.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Active Departments</h3>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-xs font-semibold">
            {departments.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/organization/departments')} icon={ArrowRight}>
            View All ({departments.length})
          </Button>
          <Button variant="primary" size="sm" onClick={onNewDept} icon={Plus}>
            New Department
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentDepts.map((dept) => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            onView={() => onViewDept && onViewDept(dept)}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentOverviewSection;
