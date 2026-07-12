import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { ArrowDownLeft, AlertCircle } from 'lucide-react';

const ReturnAssetDialog = ({ isOpen, onClose, onSubmit, allocation = null }) => {
  const [formData, setFormData] = useState({
    returnDate: new Date().toISOString().split('T')[0],
    condition: 'GOOD',
    notes: '',
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
    <Modal isOpen={isOpen} onClose={onClose} title="Return Asset" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md mb-4">
          <p className="text-gray-700 font-medium">Returning: {allocation.assetName}</p>
          <p className="text-gray-500 text-xs mt-1">Currently assigned to: {allocation.assignedTo}</p>
        </div>

        <Input
          type="date"
          label="Return Date *"
          value={formData.returnDate}
          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
          required
        />

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Check-in Condition *</label>
          <select
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="NEW">New / Pristine</option>
            <option value="GOOD">Good / Normal wear</option>
            <option value="FAIR">Fair</option>
            <option value="DAMAGED">Damaged</option>
            <option value="MISSING">Missing Parts</option>
          </select>
        </div>

        {['DAMAGED', 'MISSING'].includes(formData.condition) && (
          <div className="flex items-start gap-2 bg-amber-50 text-amber-800 p-2 rounded border border-amber-200">
             <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
             <p className="text-xs">Asset will be automatically flagged for maintenance or review.</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-in Notes</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Document any scratches, issues, or details about the return..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} icon={ArrowDownLeft}>
            Process Return
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReturnAssetDialog;
