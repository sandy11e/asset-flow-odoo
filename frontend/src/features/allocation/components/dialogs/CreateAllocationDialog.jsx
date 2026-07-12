import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';

const CreateAllocationDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    assetName: '',
    assignedTo: '',
    department: 'IT',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Asset Allocation" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Asset ID or Name *"
          placeholder="Search for asset..."
          value={formData.assetName}
          onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
          required
        />
        <Input
          label="Assign To (Employee Name) *"
          placeholder="e.g. John Doe"
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          required
        />
        <Select
          label="Department"
          options={[
            { value: 'IT', label: 'Information Technology' },
            { value: 'HR', label: 'Human Resources' },
            { value: 'Finance', label: 'Finance' },
            { value: 'Operations', label: 'Operations' },
          ]}
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
        <Input
          type="date"
          label="Allocation Start Date *"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Confirm Allocation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAllocationDialog;
