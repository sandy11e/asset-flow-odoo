import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import { AlertCircle, ArrowRightLeft } from 'lucide-react';

const CreateAllocationDialog = ({ isOpen, onClose, onSubmit, assets = [], onTransferRequest }) => {
  const [formData, setFormData] = useState({
    assetId: '',
    assignedTo: '',
    department: 'IT',
    startDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    if (formData.assetId) {
      const asset = assets.find(a => a.id === formData.assetId || a.assetTag === formData.assetId);
      setSelectedAsset(asset || null);
    } else {
      setSelectedAsset(null);
    }
  }, [formData.assetId, assets]);

  if (!isOpen) return null;

  const isAllocated = selectedAsset && selectedAsset.status === 'Allocated';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAllocated) return; // Prevent double allocation
    
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
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        
        {/* Asset Selection (Mock dropdown for simplicity, usually autocomplete) */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Select Asset *</label>
          <select
            value={formData.assetId}
            onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
            required
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="" disabled>Choose an asset...</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.assetTag} - {asset.name} ({asset.status})
              </option>
            ))}
          </select>
        </div>

        {isAllocated && (
          <div className="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-md flex flex-col gap-2">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertCircle className="w-5 h-5" />
              <p className="font-semibold text-sm">Conflict: Asset is already taken.</p>
            </div>
            <p className="text-xs text-rose-700 ml-7">
              This asset is currently held by <span className="font-bold">{selectedAsset.assignedTo || 'another user'}</span>. 
              You cannot allocate it, but you can request a transfer.
            </p>
            <div className="ml-7 mt-2">
              <Button 
                type="button" 
                variant="primary" 
                size="sm" 
                icon={ArrowRightLeft}
                onClick={() => onTransferRequest(selectedAsset)}
                className="!bg-rose-600 hover:!bg-rose-700 !text-white"
              >
                Request Transfer
              </Button>
            </div>
          </div>
        )}

        <Input
          label="Assign To (Employee Name) *"
          placeholder="e.g. John Doe"
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          required
          disabled={isAllocated}
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
          disabled={isAllocated}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date *"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
            disabled={isAllocated}
          />
          <Input
            type="date"
            label="Expected Return Date"
            value={formData.expectedReturnDate}
            onChange={(e) => setFormData({ ...formData, expectedReturnDate: e.target.value })}
            disabled={isAllocated}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} disabled={isAllocated || !formData.assetId}>
            Confirm Allocation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAllocationDialog;
