import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const DepartmentDialog = ({ isOpen, onClose, onSubmit, department = null }) => {
  const [formData, setFormData] = useState({
    name: department?.name || '',
    code: department?.code || '',
    headOfDepartment: department?.headOfDepartment || '',
    budgetAllocated: department?.budgetAllocated || '$100,000',
    location: department?.location || 'Headquarters',
    description: department?.description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={department ? `Edit Department — ${department.code}` : 'Create New Department'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Department Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Information Technology" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Department Code *" name="code" value={formData.code} onChange={handleChange} required placeholder="DEPT-IT" />
          <Input label="Budget Allocated" name="budgetAllocated" value={formData.budgetAllocated} onChange={handleChange} placeholder="$500,000" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Head of Department" name="headOfDepartment" value={formData.headOfDepartment} onChange={handleChange} placeholder="Full Name" />
          <Input label="Office / Floor Location" name="location" value={formData.location} onChange={handleChange} placeholder="Floor 4" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={2}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>{department ? 'Update' : 'Create'} Department</Button>
        </div>
      </form>
    </Modal>
  );
};

export default DepartmentDialog;
