import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useOrganizationData } from '../hooks/useOrganizationData';

import BranchSearch from '../components/controls/BranchSearch';
import OrgPagination from '../components/controls/OrgPagination';
import BranchTable from '../components/tables/BranchTable';
import BranchDialog from '../components/dialogs/BranchDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';

const BranchesList = () => {
  const { branches, isLoading, refresh } = useOrganizationData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deletingBranch, setDeletingBranch] = useState(null);

  const itemsPerPage = 8;

  const filteredBranches = useMemo(() => {
    return branches.filter((b) =>
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [branches, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredBranches.length / itemsPerPage));
  const paginatedBranches = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBranches.slice(start, start + itemsPerPage);
  }, [filteredBranches, currentPage]);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization Management', href: '/organization' },
    { name: 'Branch Facilities Directory' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Branch & Hub Facilities"
        subtitle="Regional offices, logistics hubs, storage depots, and geographical operational centers."
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="primary" size="sm" onClick={() => { setEditingBranch(null); setIsDialogOpen(true); }} icon={Plus}>
            Register New Branch Facility
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
          <BranchSearch value={searchQuery} onSearch={setSearchQuery} />
        </div>

        <div className="bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
          <BranchTable
            branches={paginatedBranches}
            isLoading={isLoading}
            onView={(branch) => { setEditingBranch(branch); setIsDialogOpen(true); }}
            onEdit={(branch) => { setEditingBranch(branch); setIsDialogOpen(true); }}
            onDelete={(branch) => setDeletingBranch(branch)}
          />
          <OrgPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredBranches.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </motion.div>

      <BranchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        branch={editingBranch}
        onSubmit={async () => refresh()}
      />

      <DeleteConfirmationDialog
        isOpen={Boolean(deletingBranch)}
        onClose={() => setDeletingBranch(null)}
        onConfirm={async () => refresh()}
        entityName="Branch Facility"
        itemName={deletingBranch?.name}
      />
    </MainContentWrapper>
  );
};

export default BranchesList;
