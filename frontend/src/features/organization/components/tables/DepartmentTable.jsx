import React from 'react';
import Table from '@/components/tables/Table';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';
import { Layers } from 'lucide-react';

const DepartmentTable = ({
  departments = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  className = '',
}) => {
  const columns = [
    {
      header: 'Department',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span
              onClick={(e) => { e.stopPropagation(); onView && onView(row); }}
              className="font-bold text-sm text-gray-900 dark:text-white truncate block hover:text-primary-600 cursor-pointer"
            >
              {row.name}
            </span>
            <span className="text-xs text-gray-400 block">{row.orgName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Code',
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 dark:bg-sidebar-bg text-gray-700 dark:text-gray-300">
          {row.code}
        </span>
      ),
    },
    {
      header: 'Head of Dept',
      render: (row) => <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{row.headOfDepartment}</span>,
    },
    {
      header: 'Staff Count',
      render: (row) => <span className="text-xs font-semibold text-gray-900 dark:text-white">{row.employeeCount}</span>,
    },
    {
      header: 'Allocated Budget',
      render: (row) => <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{row.budgetAllocated}</span>,
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
        data={departments}
        isLoading={isLoading}
        keyField="id"
        emptyTitle="No Departments Found"
        emptyDescription="There are currently no departments matching your filter criteria."
        onRowClick={(row) => onView && onView(row)}
      />
    </div>
  );
};

export default DepartmentTable;
