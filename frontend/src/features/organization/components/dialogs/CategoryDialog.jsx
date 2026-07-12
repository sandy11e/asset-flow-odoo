import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

const CategoryDialog = ({ isOpen, onClose, onSubmit, category = null }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
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
    <Modal isOpen={isOpen} onClose={onClose} title={category ? `Edit Category` : 'Create New Asset Category'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Category Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Electronics, Furniture" />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Details about this asset category..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>{category ? 'Update' : 'Create'} Category</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryDialog;
