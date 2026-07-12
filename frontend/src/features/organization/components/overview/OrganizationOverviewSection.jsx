import React from 'react';
import { Building2, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import OrganizationCard from '../cards/OrganizationCard';

const OrganizationOverviewSection = ({ organizations = [], onNewOrg, onViewOrg }) => {
  const navigate = useNavigate();
  const recentOrgs = organizations.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Registered Organizations</h3>
          <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 text-xs font-semibold">
            {organizations.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/organization/list')} icon={ArrowRight}>
            View All ({organizations.length})
          </Button>
          <Button variant="primary" size="sm" onClick={onNewOrg} icon={Plus}>
            New Organization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentOrgs.map((org) => (
          <OrganizationCard
            key={org.id}
            organization={org}
            onView={() => onViewOrg && onViewOrg(org)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationOverviewSection;
