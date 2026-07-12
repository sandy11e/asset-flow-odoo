import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers, MapPin, Users, RefreshCw } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import DashboardContainer from '@/components/layout/DashboardContainer';
import { useOrganizationData } from '../hooks/useOrganizationData';

// Panels & Overview Components
import OrganizationStatisticsPanel from '../components/panels/OrganizationStatisticsPanel';
import OrganizationInformationPanel from '../components/panels/OrganizationInformationPanel';
import OrganizationOverviewSection from '../components/overview/OrganizationOverviewSection';
import DepartmentOverviewSection from '../components/overview/DepartmentOverviewSection';
import BranchOverviewSection from '../components/overview/BranchOverviewSection';
import TeamOverviewSection from '../components/overview/TeamOverviewSection';
import QuickStatistics from '../components/overview/QuickStatistics';
import QuickActionPanel from '../components/overview/QuickActionPanel';
import RecentOrganizations from '../components/overview/RecentOrganizations';
import RecentDepartments from '../components/overview/RecentDepartments';
import OrganizationTimeline from '../components/overview/OrganizationTimeline';
import OrgProfileSummary from '../components/overview/OrgProfileSummary';

// Dialogs
import CreateOrganizationDialog from '../components/dialogs/CreateOrganizationDialog';
import EditOrganizationDialog from '../components/dialogs/EditOrganizationDialog';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';
import DepartmentDialog from '../components/dialogs/DepartmentDialog';
import BranchDialog from '../components/dialogs/BranchDialog';
import TeamDialog from '../components/dialogs/TeamDialog';

const OrganizationDashboard = () => {
  const {
    organizations,
    departments,
    branches,
    teams,
    isLoading,
    refresh,
  } = useOrganizationData();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'orgs', 'depts', 'branches', 'teams'
  const [selectedOrgForDetails, setSelectedOrgForDetails] = useState(null);

  // Dialog States
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [deletingOrg, setDeletingOrg] = useState(null);
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization & Departments', href: '/organization' },
    { name: 'Module Oversight Dashboard' },
  ];

  return (
    <MainContentWrapper>
      <PageHeader
        title="Organization & Department Management"
        subtitle="Manage holding entities, corporate departments, regional branch facilities, and operational teams across the enterprise."
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={refresh} icon={RefreshCw} isLoading={isLoading}>
              Refresh Sync
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsCreateOrgOpen(true)} icon={Building2}>
              Register Organization
            </Button>
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-6 mt-4"
      >
        {/* Profile Summary Strip */}
        <OrgProfileSummary />

        {/* Global Statistics Panel */}
        <OrganizationStatisticsPanel organizations={organizations} />

        {/* Quick Statistics Overview */}
        <QuickStatistics organizations={organizations} departments={departments} branches={branches} />

        {/* Selected Org Detailed View (if clicked) */}
        {selectedOrgForDetails && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Detailed Entity Inspection
              </span>
              <button
                onClick={() => setSelectedOrgForDetails(null)}
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
              >
                Close Inspection Panel
              </button>
            </div>
            <OrganizationInformationPanel organization={selectedOrgForDetails} />
          </div>
        )}

        {/* Tabs Filter Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              All Overview ({organizations.length + departments.length + branches.length + teams.length})
            </button>
            <button
              onClick={() => setActiveTab('orgs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'orgs'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Orgs ({organizations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('depts')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'depts'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Departments ({departments.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'branches'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Branches ({branches.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'teams'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Teams ({teams.length})</span>
            </button>
          </div>
        </div>

        {/* Main Split Grid */}
        <DashboardContainer.Split
          leftCol={
            <div className="space-y-8">
              {(activeTab === 'all' || activeTab === 'orgs') && (
                <OrganizationOverviewSection
                  organizations={organizations}
                  onNewOrg={() => setIsCreateOrgOpen(true)}
                  onViewOrg={(org) => setSelectedOrgForDetails(org)}
                />
              )}
              {(activeTab === 'all' || activeTab === 'depts') && (
                <DepartmentOverviewSection
                  departments={departments}
                  onNewDept={() => { setEditingDept(null); setIsDeptDialogOpen(true); }}
                  onViewDept={(dept) => { setEditingDept(dept); setIsDeptDialogOpen(true); }}
                />
              )}
              {(activeTab === 'all' || activeTab === 'branches') && (
                <BranchOverviewSection
                  branches={branches}
                  onNewBranch={() => { setEditingBranch(null); setIsBranchDialogOpen(true); }}
                  onViewBranch={(branch) => { setEditingBranch(branch); setIsBranchDialogOpen(true); }}
                />
              )}
              {(activeTab === 'all' || activeTab === 'teams') && (
                <TeamOverviewSection
                  teams={teams}
                  onNewTeam={() => { setEditingTeam(null); setIsTeamDialogOpen(true); }}
                  onViewTeam={(team) => { setEditingTeam(team); setIsTeamDialogOpen(true); }}
                />
              )}
            </div>
          }
          rightCol={
            <div className="space-y-6">
              <QuickActionPanel
                onNewOrg={() => setIsCreateOrgOpen(true)}
                onNewDept={() => { setEditingDept(null); setIsDeptDialogOpen(true); }}
                onNewBranch={() => { setEditingBranch(null); setIsBranchDialogOpen(true); }}
                onNewTeam={() => { setEditingTeam(null); setIsTeamDialogOpen(true); }}
              />
              <RecentOrganizations
                organizations={organizations}
                onView={(org) => setSelectedOrgForDetails(org)}
              />
              <RecentDepartments
                departments={departments}
                onView={(dept) => { setEditingDept(dept); setIsDeptDialogOpen(true); }}
              />
              <OrganizationTimeline />
            </div>
          }
        />
      </motion.div>

      {/* Dialogs */}
      <CreateOrganizationDialog
        isOpen={isCreateOrgOpen}
        onClose={() => setIsCreateOrgOpen(false)}
        onSubmit={async (newOrg) => {
          refresh();
        }}
      />

      <EditOrganizationDialog
        isOpen={Boolean(editingOrg)}
        onClose={() => setEditingOrg(null)}
        organization={editingOrg}
        onSubmit={async () => {
          refresh();
        }}
      />

      <DeleteConfirmationDialog
        isOpen={Boolean(deletingOrg)}
        onClose={() => setDeletingOrg(null)}
        onConfirm={async () => {
          refresh();
        }}
        entityName="Organization"
        itemName={deletingOrg?.name}
      />

      <DepartmentDialog
        isOpen={isDeptDialogOpen}
        onClose={() => setIsDeptDialogOpen(false)}
        department={editingDept}
        onSubmit={async () => {
          refresh();
        }}
      />

      <BranchDialog
        isOpen={isBranchDialogOpen}
        onClose={() => setIsBranchDialogOpen(false)}
        branch={editingBranch}
        onSubmit={async () => {
          refresh();
        }}
      />

      <TeamDialog
        isOpen={isTeamDialogOpen}
        onClose={() => setIsTeamDialogOpen(false)}
        team={editingTeam}
        onSubmit={async () => {
          refresh();
        }}
      />
    </MainContentWrapper>
  );
};

export default OrganizationDashboard;
