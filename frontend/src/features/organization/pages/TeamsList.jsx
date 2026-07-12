import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useOrganizationData } from '../hooks/useOrganizationData';

import SearchBar from '@/components/forms/SearchBar';
import OrgPagination from '../components/controls/OrgPagination';
import TeamTable from '../components/tables/TeamTable';
import TeamDialog from '../components/dialogs/TeamDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';

const TeamsList = () => {
  const { teams, isLoading, refresh } = useOrganizationData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [deletingTeam, setDeletingTeam] = useState(null);

  const itemsPerPage = 8;

  const filteredTeams = useMemo(() => {
    return teams.filter((t) =>
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.deptName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teams, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTeams.length / itemsPerPage));
  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTeams.slice(start, start + itemsPerPage);
  }, [filteredTeams, currentPage]);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization Management', href: '/organization' },
    { name: 'Work Teams Directory' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Work Teams & Operational Squads"
        subtitle="Oversight of task forces, project teams, engineering squads, and assigned asset groups."
        breadcrumbs={breadcrumbs}
        actions={
          <Button variant="primary" size="sm" onClick={() => { setEditingTeam(null); setIsDialogOpen(true); }} icon={Plus}>
            Register New Team
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
          <div className="w-full max-w-md">
            <SearchBar
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder="Search teams by name, code or department..."
              debounceMs={300}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden">
          <TeamTable
            teams={paginatedTeams}
            isLoading={isLoading}
            onView={(team) => { setEditingTeam(team); setIsDialogOpen(true); }}
            onEdit={(team) => { setEditingTeam(team); setIsDialogOpen(true); }}
            onDelete={(team) => setDeletingTeam(team)}
          />
          <OrgPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTeams.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </motion.div>

      <TeamDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        team={editingTeam}
        onSubmit={async () => refresh()}
      />

      <DeleteConfirmationDialog
        isOpen={Boolean(deletingTeam)}
        onClose={() => setDeletingTeam(null)}
        onConfirm={async () => refresh()}
        entityName="Operational Team"
        itemName={deletingTeam?.name}
      />
    </MainContentWrapper>
  );
};

export default TeamsList;
