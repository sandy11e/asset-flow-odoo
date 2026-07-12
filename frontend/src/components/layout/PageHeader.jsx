import React from 'react';
import Breadcrumb from '@/components/navigation/Breadcrumb';

const PageHeader = ({ title, subtitle, breadcrumbs = [], actions }) => {
  return (
    <div className="mb-6 pb-5 border-b border-gray-200/80 bg-transparent shrink-0">
      {/* Breadcrumb Area */}
      {breadcrumbs.length > 0 && (
        <div className="mb-2.5">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      {/* Title & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Optional Action Slot */}
        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
