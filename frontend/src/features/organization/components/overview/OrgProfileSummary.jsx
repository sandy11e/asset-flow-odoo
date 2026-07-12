import React from 'react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { ShieldCheck, Building2, Layers } from 'lucide-react';

const OrgProfileSummary = ({ className = '' }) => {
  return (
    <Card className={`p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-hover flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3.5 min-w-0">
        <Avatar name="Priya Sharma" size="md" className="ring-2 ring-primary-500/20 shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">Priya Sharma</h4>
            <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 text-[10px] font-semibold flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3 h-3" /> Global Org Admin
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            Oversight of 4 Organizations & 16 Departments across North America and Europe.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0 border-l border-gray-100 dark:border-gray-700 pl-4">
        <div className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-primary-500" />
          <span>4 Orgs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-purple-500" />
          <span>16 Depts</span>
        </div>
      </div>
    </Card>
  );
};

export default OrgProfileSummary;
