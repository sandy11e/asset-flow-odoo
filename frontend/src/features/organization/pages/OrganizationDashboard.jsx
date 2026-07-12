import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Tags, Users, RefreshCw, Plus } from 'lucide-react';
import MainContentWrapper from '@/components/layout/MainContentWrapper';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useOrganizationData } from '../hooks/useOrganizationData';
import { organizationService } from '../services/organization.service';

import DepartmentTable from '../components/tables/DepartmentTable';
import AssetCategoryTable from '../components/tables/AssetCategoryTable';
import EmployeeTable from '../components/tables/EmployeeTable';

import DepartmentDialog from '../components/dialogs/DepartmentDialog';
import CategoryDialog from '../components/dialogs/CategoryDialog';
import EmployeeRoleDialog from '../components/dialogs/EmployeeRoleDialog';

const OrganizationDashboard = () => {
  const {
    departments,
    categories,
    employees,
    isLoading,
    refresh,
  } = useOrganizationData();

  const [activeTab, setActiveTab] = useState('depts'); // 'depts', 'categories', 'employees'
  
  // Dialog States
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [isEmpDialogOpen, setIsEmpDialogOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  const breadcrumbs = [
    { name: 'ERP Portal', href: '/dashboard' },
    { name: 'Organization Setup', href: '/organization' },
    { name: 'Admin Management' },
  ];

  const handleRoleUpdate = async (newRole) => {
    if (editingEmp) {
      await organizationService.updateEmployeeRole(editingEmp.id, newRole);
      refresh();
    }
  };

  const handleToggleStatus = async (emp) => {
    const newStatus = emp.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await organizationService.updateEmployeeStatus(emp.id, newStatus);
    refresh();
  };

  return (
    <MainContentWrapper>
      <PageHeader
        title="Organization Setup"
        subtitle="Manage master data: Departments, Asset Categories, and Employee Roles."
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={refresh} icon={RefreshCw} isLoading={isLoading}>
              Refresh Sync
            </Button>
            {activeTab === 'depts' && (
              <Button variant="primary" size="sm" onClick={() => { setEditingDept(null); setIsDeptDialogOpen(true); }} icon={Plus}>
                New Department
              </Button>
            )}
            {activeTab === 'categories' && (
              <Button variant="primary" size="sm" onClick={() => { setEditingCat(null); setIsCatDialogOpen(true); }} icon={Plus}>
                New Category
              </Button>
            )}
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-6 mt-4"
      >
        {/* Tabs Filter Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('depts')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'depts'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Departments ({departments?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Tags className="w-4 h-4" />
              <span>Asset Categories ({categories?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'employees'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-sidebar-hover'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Employee Directory ({employees?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs overflow-hidden p-4">
          {activeTab === 'depts' && (
             <DepartmentTable
               departments={departments}
               isLoading={isLoading}
               onView={(dept) => { setEditingDept(dept); setIsDeptDialogOpen(true); }}
               onEdit={(dept) => { setEditingDept(dept); setIsDeptDialogOpen(true); }}
             />
          )}
          {activeTab === 'categories' && (
             <AssetCategoryTable
               categories={categories}
               isLoading={isLoading}
               onView={(cat) => { setEditingCat(cat); setIsCatDialogOpen(true); }}
               onEdit={(cat) => { setEditingCat(cat); setIsCatDialogOpen(true); }}
             />
          )}
          {activeTab === 'employees' && (
             <EmployeeTable
               employees={employees}
               isLoading={isLoading}
               onEditRole={(emp) => { setEditingEmp(emp); setIsEmpDialogOpen(true); }}
               onToggleStatus={handleToggleStatus}
             />
          )}
        </div>
      </motion.div>

      {/* Dialogs */}
      <DepartmentDialog
        isOpen={isDeptDialogOpen}
        onClose={() => setIsDeptDialogOpen(false)}
        department={editingDept}
        onSubmit={async (data) => {
          if (editingDept) {
            await organizationService.updateDepartment(editingDept.id, data);
          } else {
            await organizationService.createDepartment(data);
          }
          refresh();
        }}
      />
      
      <CategoryDialog 
        isOpen={isCatDialogOpen} 
        onClose={() => setIsCatDialogOpen(false)} 
        category={editingCat}
        onSubmit={async (data) => {
          if (editingCat) {
            await organizationService.updateCategory(editingCat.id, data);
          } else {
            await organizationService.createCategory(data);
          }
          refresh();
        }}
      />

      <EmployeeRoleDialog
        isOpen={isEmpDialogOpen}
        onClose={() => setIsEmpDialogOpen(false)}
        employee={editingEmp}
        onSubmit={handleRoleUpdate}
      />

    </MainContentWrapper>
  );
};

export default OrganizationDashboard;
