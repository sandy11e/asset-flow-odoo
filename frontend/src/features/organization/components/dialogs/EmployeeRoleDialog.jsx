import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const EmployeeRoleDialog = ({ isOpen, onClose, onSubmit, employee = null }) => {
  const [role, setRole] = useState(employee?.role || 'EMPLOYEE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(role);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Role: ${employee?.name}`} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select System Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          >
            <option value="EMPLOYEE">Employee (Basic Access)</option>
            <option value="DEPARTMENT_HEAD">Department Head</option>
            <option value="ASSET_MANAGER">Asset Manager</option>
            <option value="ADMIN">System Administrator</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>Update Role</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeRoleDialog;
