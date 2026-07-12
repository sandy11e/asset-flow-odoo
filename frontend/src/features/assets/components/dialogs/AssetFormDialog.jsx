import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const AssetFormDialog = ({ isOpen, onClose, onSubmit, asset = null, categories = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    assetTag: `AF-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generated
    serialNumber: '',
    acquisitionDate: '',
    acquisitionCost: '',
    condition: 'NEW',
    location: '',
    isBookable: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || '',
        categoryId: asset.categoryId || '',
        assetTag: asset.assetTag || `AF-${Math.floor(1000 + Math.random() * 9000)}`,
        serialNumber: asset.serialNumber || '',
        acquisitionDate: asset.acquisitionDate ? asset.acquisitionDate.split('T')[0] : '',
        acquisitionCost: asset.acquisitionCost || '',
        condition: asset.condition || 'NEW',
        location: asset.location || '',
        isBookable: Boolean(asset.isBookable),
      });
    } else {
      setFormData({
        name: '',
        categoryId: '',
        assetTag: `AF-${Math.floor(1000 + Math.random() * 9000)}`,
        serialNumber: '',
        acquisitionDate: new Date().toISOString().split('T')[0],
        acquisitionCost: '',
        condition: 'NEW',
        location: '',
        isBookable: false,
      });
    }
  }, [asset, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
    <Modal isOpen={isOpen} onClose={onClose} title={asset ? 'Edit Asset' : 'Register New Asset'} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Asset Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="MacBook Pro M2" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
              {/* Fallbacks if DB empty */}
              <option value="cat-electronics">Electronics</option>
              <option value="cat-furniture">Furniture</option>
              <option value="cat-vehicles">Vehicles</option>
            </select>
          </div>
          
          <Input label="Asset Tag (Auto-generated)" name="assetTag" value={formData.assetTag} onChange={handleChange} readOnly className="bg-gray-50 dark:bg-gray-800" />
          <Input label="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="C02XX..." />
          
          <Input label="Acquisition Date" type="date" name="acquisitionDate" value={formData.acquisitionDate} onChange={handleChange} />
          <Input label="Acquisition Cost" type="number" step="0.01" name="acquisitionCost" value={formData.acquisitionCost} onChange={handleChange} placeholder="1999.99" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="NEW">New</option>
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair</option>
              <option value="POOR">Poor</option>
              <option value="DAMAGED">Damaged</option>
            </select>
          </div>
          
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="HQ - Floor 2" />
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="isBookable"
            name="isBookable"
            checked={formData.isBookable}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
          />
          <label htmlFor="isBookable" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Shared / Bookable Resource
          </label>
          <span className="text-xs text-gray-400 ml-1">(Allow employees to book this item via calendar)</span>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>{asset ? 'Update' : 'Register'} Asset</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AssetFormDialog;
