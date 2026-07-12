import React from 'react';
import Table from '@/components/tables/Table';
import OrgStatusBadge from '../controls/OrgStatusBadge';
import ActionDropdown from '../controls/ActionDropdown';
import { Users } from 'lucide-react';

const EmployeeTable = ({
  employees = [],
  isLoading = false,
  onView,
  onEditRole,
  onToggleStatus,
  className = '',
}) => {
  const columns = [
    {
      header: 'Employee',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span
              onClick={(e) => { e.stopPropagation(); onView && onView(row); }}
              className="font-bold text-sm text-gray-900 dark:text-white truncate block hover:text-primary-600 cursor-pointer"
            >
              {row.name}
            </span>
            <span className="text-xs text-gray-400 block">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      render: (row) => <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{row.department?.name || 'Unassigned'}</span>,
    },
    {
      header: 'Role',
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 dark:bg-sidebar-bg text-gray-700 dark:text-gray-300">
          {row.role}
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
        <div className="flex justify-end gap-2">
           <button 
             onClick={() => onEditRole && onEditRole(row)}
             className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
           >
             Change Role
           </button>
           <button 
             onClick={() => onToggleStatus && onToggleStatus(row)}
             className={`text-xs font-semibold ${row.status === 'ACTIVE' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
           >
             {row.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
           </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table
        columns={columns}
        data={employees}
        isLoading={isLoading}
        keyField="id"
        emptyTitle="No Employees Found"
        emptyDescription="There are currently no employees matching your filter criteria."
        onRowClick={(row) => onView && onView(row)}
      />
    </div>
  );
};

export default EmployeeTable;
