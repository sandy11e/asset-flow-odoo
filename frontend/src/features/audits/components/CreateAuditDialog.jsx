import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';

const CreateAuditDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    auditor: 'Sarah Jenkins',
    type: 'Internal',
    dueDate: new Date().toISOString().split('T')[0],
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
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate New Audit" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Audit Title *"
          placeholder="e.g. Q4 Hardware Compliance"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Select
          label="Audit Type"
          options={[
            { value: 'Internal', label: 'Internal Audit' },
            { value: 'External', label: 'External / Regulatory' },
            { value: 'Security', label: 'Security Assessment' },
          ]}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
        <Input
          label="Lead Auditor *"
          value={formData.auditor}
          onChange={(e) => setFormData({ ...formData, auditor: e.target.value })}
          required
        />
        <Input
          type="date"
          label="Target Completion Date *"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Create Audit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAuditDialog;
