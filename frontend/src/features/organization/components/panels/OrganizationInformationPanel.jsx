import React from 'react';
import { Building2, Mail, Phone, MapPin, FileText, Calendar, DollarSign, Globe } from 'lucide-react';
import Card from '@/components/ui/Card';
import OrgStatusBadge from '../controls/OrgStatusBadge';

const OrganizationInformationPanel = ({ organization, className = '' }) => {
  if (!organization) return null;

  return (
    <Card className={`p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-5">
        <div className="flex items-center gap-4 min-w-0">
          {organization.logoUrl ? (
            <img
              src={organization.logoUrl}
              alt={organization.name}
              className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xl shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {organization.name}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs font-semibold shrink-0">
                {organization.code}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {organization.industry}
            </p>
          </div>
        </div>
        <OrgStatusBadge status={organization.status} className="w-fit" />
      </div>

      {/* Description */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
          Corporate Overview
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {organization.description || 'No corporate description recorded for this organization.'}
        </p>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <FileText className="w-3.5 h-3.5" /> Tax Identification
          </span>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{organization.taxId || 'Not registered'}</p>
        </div>

        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <MapPin className="w-3.5 h-3.5" /> Headquarters
          </span>
          <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{organization.headquarters || 'N/A'}</p>
        </div>

        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <DollarSign className="w-3.5 h-3.5" /> Total Asset Portfolio Value
          </span>
          <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">{organization.totalAssetValue || '$0'}</p>
        </div>

        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Mail className="w-3.5 h-3.5" /> Contact Email
          </span>
          <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{organization.contactEmail || 'No email'}</p>
        </div>

        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Phone className="w-3.5 h-3.5" /> Phone Support
          </span>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{organization.contactPhone || 'No phone'}</p>
        </div>

        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3.5 h-3.5" /> Registration Date
          </span>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">
            {organization.createdAt ? new Date(organization.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationInformationPanel;
