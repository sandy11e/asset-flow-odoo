import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus, Filter } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useOrganizationData } from '../hooks/useOrganizationData';

// Controls & Tables
import OrganizationSearch from '../components/controls/OrganizationSearch';
import OrgFilterPanel from '../components/controls/OrgFilterPanel';
import SortDropdown from '../components/controls/SortDropdown';
import OrgPagination from '../components/controls/OrgPagination';
import BulkActionToolbar from '../components/controls/BulkActionToolbar';
import OrganizationTable from '../components/tables/OrganizationTable';

// Dialogs & Panels
import CreateOrganizationDialog from '../components/dialogs/CreateOrganizationDialog';
import EditOrganizationDialog from '../components/dialogs/EditOrganizationDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';
import OrganizationInformationPanel from '../components/panels/OrganizationInformationPanel';

const OrganizationsList = () => {
  const { organizations, isLoading, refresh } = useOrganizationData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedOrgForDetails, setSelectedOrgForDetails] = useState(null);

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [deletingOrg, setDeletingOrg] = useState(null);

  const itemsPerPage = 8;

  // Filter and Sort
  const filteredOrgs = useMemo(() => {
    return organizations
      .filter((org) => {
        const matchesSearch =
          !searchQuery ||
          org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          org.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !statusFilter || org.status === statusFilter;
        const matchesIndustry = !industryFilter || org.industry === industryFilter;
        return matchesSearch && matchesStatus && matchesIndustry;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'employeeCount-desc') return (b.employeeCount || 0) - (a.employeeCount || 0);
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [organizations, searchQuery, statusFilter, industryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredOrgs.length / itemsPerPage));
  const paginatedOrgs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrgs.slice(start, start + itemsPerPage);
  }, [filteredOrgs, currentPage]);

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedOrgs.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization Management', href: '/organization' },
    { name: 'Registered Organizations Directory' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Organizations Directory"
        subtitle="Full administrative directory of holding entities, corporate branches, and registered tax jurisdictions."
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} icon={Plus}>
            Register New Organization
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4 mt-4"
      >
        {selectedOrgForDetails && (
          <div className="space-y-2 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Inspection Details
              </span>
              <button
                onClick={() => setSelectedOrgForDetails(null)}
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
              >
                Close Inspection
              </button>
            </div>
            <OrganizationInformationPanel organization={selectedOrgForDetails} />
          </div>
        )}

        <BulkActionToolbar
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          onDeleteSelected={() => alert(`Bulk delete triggered for ${selectedIds.length} organizations.`)}
        />

        {/* Toolbar */}
        <div className="bg-white dark:bg-sidebar-hover p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <OrganizationSearch
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder="Search by organization name or code..."
            />
            <div className="flex items-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                icon={Filter}
                className={showFilters || statusFilter || industryFilter ? 'border-primary-500 text-primary-600' : ''}
              >
                Filter {statusFilter || industryFilter ? '●' : ''}
              </Button>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          {showFilters && (
            <OrgFilterPanel
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              industryFilter={industryFilter}
              onIndustryChange={setIndustryFilter}
              onReset={() => {
                setStatusFilter('');
                setIndustryFilter('');
              }}
            />
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
          <OrganizationTable
            organizations={paginatedOrgs}
            isLoading={isLoading}
            onView={(org) => setSelectedOrgForDetails(org)}
            onEdit={(org) => setEditingOrg(org)}
            onDelete={(org) => setDeletingOrg(org)}
            selectedIds={selectedIds}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
          />
          <OrgPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredOrgs.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </motion.div>

      {/* Dialogs */}
      <CreateOrganizationDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={async () => refresh()}
      />
      <EditOrganizationDialog
        isOpen={Boolean(editingOrg)}
        onClose={() => setEditingOrg(null)}
        organization={editingOrg}
        onSubmit={async () => refresh()}
      />
      <DeleteConfirmationDialog
        isOpen={Boolean(deletingOrg)}
        onClose={() => setDeletingOrg(null)}
        onConfirm={async () => refresh()}
        entityName="Organization"
        itemName={deletingOrg?.name}
      />
    </MainContentWrapper>
  );
};

export default OrganizationsList;
