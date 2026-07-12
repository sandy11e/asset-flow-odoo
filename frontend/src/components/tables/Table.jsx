import React from 'react';
import SkeletonLoader from '@/components/feedback/SkeletonLoader';
import EmptyState from '@/components/feedback/EmptyState';

const Table = ({ columns, data, keyField = 'id', onRowClick, isLoading, emptyTitle, emptyDescription }) => {
  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-sidebar-hover rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden p-6 transition-colors">
        <SkeletonLoader type="card" count={1} className="h-48 dark:bg-gray-700" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-sidebar-hover rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
        <EmptyState
          title={emptyTitle || 'No records found'}
          description={emptyDescription || 'There are no items to display right now.'}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-sidebar-hover rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
      <div className="overflow-x-auto min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-sidebar-bg">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-sidebar-hover divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row) => (
              <tr 
                key={row[keyField]} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-sidebar-bg/60 transition-colors' : 'hover:bg-gray-50/50 dark:hover:bg-sidebar-bg/30 transition-colors'}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${col.cellClassName || ''}`}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
