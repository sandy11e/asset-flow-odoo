import React from 'react';
import { Building2, Users, MapPin, DollarSign } from 'lucide-react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';

const OrganizationCard = ({ organization, onView, onEdit, onDelete, className = '' }) => {
  if (!organization) return null;

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover ${className}`}>
      <div className="p-5 flex flex-col h-full justify-between gap-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt={organization.name}
                className="w-11 h-11 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-11 h-11 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-base shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0">
              <h4
                onClick={onView}
                className="text-sm font-bold text-gray-900 dark:text-white truncate hover:text-primary-600 transition-colors cursor-pointer"
              >
                {organization.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-300">
                  {organization.code}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {organization.industry}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <OrgStatusBadge status={organization.status} />
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[32px]">
          {organization.description || 'No description provided.'}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Users className="w-3.5 h-3.5 text-primary-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white font-semibold">{organization.employeeCount || 0}</strong> Employees</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white font-semibold">{organization.branchCount || 0}</strong> Branches</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 col-span-2">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Total Asset Value: <strong className="text-gray-900 dark:text-white font-semibold">{organization.totalAssetValue || '$0'}</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;
