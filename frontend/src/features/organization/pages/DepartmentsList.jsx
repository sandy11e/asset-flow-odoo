import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Plus } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useOrganizationData } from '../hooks/useOrganizationData';

import DepartmentSearch from '../components/controls/DepartmentSearch';
import OrgPagination from '../components/controls/OrgPagination';
import DepartmentTable from '../components/tables/DepartmentTable';
import DepartmentDialog from '../components/dialogs/DepartmentDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';

const DepartmentsList = () => {
  const { departments, isLoading, refresh } = useOrganizationData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deletingDept, setDeletingDept] = useState(null);

  const itemsPerPage = 8;

  const filteredDepts = useMemo(() => {
    return departments.filter((d) =>
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.orgName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredDepts.length / itemsPerPage));
  const paginatedDepts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDepts.slice(start, start + itemsPerPage);
  }, [filteredDepts, currentPage]);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization Management', href: '/organization' },
    { name: 'Corporate Departments Directory' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Departments Directory"
        subtitle="Oversight of operational departments, cost centers, budget allocations, and assigned personnel across all organizations."
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="primary" size="sm" onClick={() => { setEditingDept(null); setIsDialogOpen(true); }} icon={Plus}>
            Create New Department
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4 mt-4"
      >
        <div className="bg-white dark:bg-sidebar-hover p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xs flex items-center justify-between gap-4">
          <DepartmentSearch value={searchQuery} onSearch={setSearchQuery} />
        </div>

        <div className="bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
          <DepartmentTable
            departments={paginatedDepts}
            isLoading={isLoading}
            onView={(dept) => { setEditingDept(dept); setIsDialogOpen(true); }}
            onEdit={(dept) => { setEditingDept(dept); setIsDialogOpen(true); }}
            onDelete={(dept) => setDeletingDept(dept)}
          />
          <OrgPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredDepts.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </motion.div>

      <DepartmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        department={editingDept}
        onSubmit={async () => refresh()}
      />

      <DeleteConfirmationDialog
        isOpen={Boolean(deletingDept)}
        onClose={() => setDeletingDept(null)}
        onConfirm={async () => refresh()}
        entityName="Department"
        itemName={deletingDept?.name}
      />
    </MainContentWrapper>
  );
};

export default DepartmentsList;
