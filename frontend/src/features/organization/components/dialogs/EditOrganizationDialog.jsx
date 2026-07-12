import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';
import { INDUSTRY_OPTIONS, ORG_STATUS_OPTIONS } from '../../constants/orgConstants';

const EditOrganizationDialog = ({ isOpen, onClose, organization, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    industry: '',
    status: 'Active',
    taxId: '',
    headquarters: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || '',
        code: organization.code || '',
        industry: organization.industry || INDUSTRY_OPTIONS[0],
        status: organization.status || 'Active',
        taxId: organization.taxId || '',
        headquarters: organization.headquarters || '',
        contactEmail: organization.contactEmail || '',
        contactPhone: organization.contactPhone || '',
        description: organization.description || '',
      });
    }
  }, [organization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(organization.id, formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!organization) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Organization — ${organization.code}`} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Organization Name *" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Entity Code *" name="code" value={formData.code} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry Sector</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
            >
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
            >
              {ORG_STATUS_OPTIONS.filter((o) => o.value !== '').map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <Input label="Headquarters Address" name="headquarters" value={formData.headquarters} onChange={handleChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Contact Email" type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
          <Input label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrganizationDialog;
