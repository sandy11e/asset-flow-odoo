import React from 'react';
import Table from '@/components/tables/Table';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';
import { Building2 } from 'lucide-react';

const OrganizationTable = ({
  organizations = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  className = '',
}) => {
  const allSelected = organizations.length > 0 && selectedIds.length === organizations.length;

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => onSelectRow && onSelectRow(row.id)}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
        />
      ),
      headerClassName: 'w-12 text-center',
      cellClassName: 'w-12 text-center',
    },
    {
      header: 'Organization',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.logoUrl ? (
            <img src={row.logoUrl} alt={row.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700" />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <span
              onClick={(e) => { e.stopPropagation(); onView && onView(row); }}
              className="font-bold text-sm text-gray-900 dark:text-white truncate block hover:text-primary-600 cursor-pointer"
            >
              {row.name}
            </span>
            <span className="text-xs text-gray-400 block">{row.industry}</span>
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
      header: 'Headquarters',
      render: (row) => <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[180px] block">{row.headquarters}</span>,
    },
    {
      header: 'Employees',
      render: (row) => <span className="text-xs font-semibold text-gray-900 dark:text-white">{row.employeeCount?.toLocaleString()}</span>,
    },
    {
      header: 'Asset Value',
      render: (row) => <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{row.totalAssetValue}</span>,
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
        data={organizations}
        isLoading={isLoading}
        keyField="id"
        emptyTitle="No Organizations Found"
        emptyDescription="No organizations match your current search query or filter criteria."
        onRowClick={(row) => onView && onView(row)}
      />
    </div>
  );
};

export default OrganizationTable;
