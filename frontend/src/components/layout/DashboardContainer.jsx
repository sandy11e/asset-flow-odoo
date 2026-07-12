import React from 'react';

const DashboardContainer = ({ children, className = '' }) => {
  return (
    <div className={`space-y-6 sm:space-y-8 w-full ${className}`}>
      {children}
    </div>
  );
};

// Sub-component: KPI Metrics Grid
DashboardContainer.MetricsGrid = ({ children, columns = 4, className = '' }) => {
  const gridColumns = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridColumns[columns] || gridColumns[4]} gap-4 sm:gap-6 ${className}`}>
      {children}
    </div>
  );
};

// Sub-component: Two-Column Widget Layout (e.g., Charts + Activity)
DashboardContainer.SplitSection = ({ left, right, leftCols = 8, rightCols = 4, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      <div className={`lg:col-span-${leftCols} flex flex-col`}>
        {left}
      </div>
      <div className={`lg:col-span-${rightCols} flex flex-col`}>
        {right}
      </div>
    </div>
  );
};

// Sub-component: Full Width Section
DashboardContainer.Section = ({ title, subtitle, actions, children, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default DashboardContainer;
