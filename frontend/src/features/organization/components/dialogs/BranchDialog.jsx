import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const BranchDialog = ({ isOpen, onClose, onSubmit, branch = null }) => {
  const [formData, setFormData] = useState({
    name: branch?.name || '',
    code: branch?.code || '',
    address: branch?.address || '',
    city: branch?.city || '',
    country: branch?.country || 'United States',
    managerName: branch?.managerName || '',
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
    <Modal isOpen={isOpen} onClose={onClose} title={branch ? `Edit Branch — ${branch.code}` : 'Register New Branch Facility'} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Branch Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="Silicon Valley Hub" />
          <Input label="Branch Code *" name="code" value={formData.code} onChange={handleChange} required placeholder="BR-SFO-01" />
        </div>
        <Input label="Street Address *" name="address" value={formData.address} onChange={handleChange} required placeholder="450 Townsend St" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="City *" name="city" value={formData.city} onChange={handleChange} required placeholder="San Francisco" />
          <Input label="Country *" name="country" value={formData.country} onChange={handleChange} required placeholder="United States" />
        </div>
        <Input label="Facility Manager Name" name="managerName" value={formData.managerName} onChange={handleChange} placeholder="Sarah Jenkins" />
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>{branch ? 'Update' : 'Register'} Branch</Button>
        </div>
      </form>
    </Modal>
  );
};

export default BranchDialog;
