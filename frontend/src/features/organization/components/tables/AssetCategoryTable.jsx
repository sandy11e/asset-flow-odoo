import React from 'react';
import Table from '@/components/tables/Table';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';
import { Tags } from 'lucide-react';

const AssetCategoryTable = ({
  categories = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  className = '',
}) => {
  const columns = [
    {
      header: 'Category',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Tags className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span
              onClick={(e) => { e.stopPropagation(); onView && onView(row); }}
              className="font-bold text-sm text-gray-900 dark:text-white truncate block hover:text-primary-600 cursor-pointer"
            >
              {row.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Description',
      render: (row) => (
        <span className="text-xs text-gray-500 truncate max-w-xs block">
          {row.description || 'No description'}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <OrgStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      headerClassName: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <ActionDropdown
          onView={() => onView && onView(row)}
          onEdit={() => onEdit && onEdit(row)}
          onDelete={() => onDelete && onDelete(row)}
        />
      ),
    },
  ];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table
        columns={columns}
        data={categories}
        isLoading={isLoading}
        keyField="id"
        emptyTitle="No Categories Found"
        emptyDescription="There are currently no asset categories defined."
        onRowClick={(row) => onView && onView(row)}
      />
    </div>
  );
};

export default AssetCategoryTable;
