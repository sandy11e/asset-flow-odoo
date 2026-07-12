import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { ArrowRightLeft } from 'lucide-react';

const TransferAssetDialog = ({ isOpen, onClose, onSubmit, allocation = null }) => {
  const [formData, setFormData] = useState({
    transferTo: '',
    department: 'IT',
    reason: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !allocation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ ...formData, allocationId: allocation.id });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Asset Transfer" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-4 text-blue-900">
          <p className="font-semibold text-sm">Transferring Asset: {allocation.assetName || allocation.name}</p>
          <p className="text-xs mt-1 text-blue-800">Currently assigned to: {allocation.assignedTo}</p>
        </div>

        <Input
          label="Transfer To (Employee Name) *"
          placeholder="e.g. Jane Smith"
          value={formData.transferTo}
          onChange={(e) => setFormData({ ...formData, transferTo: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Transfer</label>
          <textarea
            name="reason"
            rows={2}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="e.g. Employee reassigned to new project..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>

        <Input
          type="date"
          label="Transfer Date *"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} icon={ArrowRightLeft}>
            Submit Transfer Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransferAssetDialog;
