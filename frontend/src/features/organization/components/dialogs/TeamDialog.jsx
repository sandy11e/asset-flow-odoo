import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const TeamDialog = ({ isOpen, onClose, onSubmit, team = null }) => {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    code: team?.code || '',
    teamLead: team?.teamLead || '',
    projectFocus: team?.projectFocus || '',
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
    <Modal isOpen={isOpen} onClose={onClose} title={team ? `Edit Team — ${team.code}` : 'Register New Team Unit'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Team Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="Core Infrastructure Squad" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Team Code *" name="code" value={formData.code} onChange={handleChange} required placeholder="TM-CORE" />
          <Input label="Team Lead" name="teamLead" value={formData.teamLead} onChange={handleChange} placeholder="Alex Mercer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Focus</label>
          <textarea
            name="projectFocus"
            rows={2}
            value={formData.projectFocus}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>{team ? 'Update' : 'Create'} Team</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TeamDialog;
