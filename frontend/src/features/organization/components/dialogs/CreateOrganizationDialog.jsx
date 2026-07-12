import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';
import { Building2, Save } from 'lucide-react';
import { INDUSTRY_OPTIONS } from '../../constants/orgConstants';

const CreateOrganizationDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    industry: INDUSTRY_OPTIONS[0],
    taxId: '',
    headquarters: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Organization name is required';
    if (!formData.code.trim()) errs.code = 'Organization code is required';
    if (!formData.headquarters.trim()) errs.headquarters = 'Headquarters location is required';
    if (!formData.contactEmail.trim()) errs.contactEmail = 'Contact email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Organization" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Organization Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. AssetFlow Technologies"
            error={errors.name}
            icon={Building2}
          />
          <Input
            label="Entity Code *"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. AF-TECH"
            error={errors.code}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Industry Sector *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20"
            >
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <Input
            label="Tax ID / Registration Number"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            placeholder="e.g. US-123456789"
          />
        </div>

        <Input
          label="Headquarters Address *"
          name="headquarters"
          value={formData.headquarters}
          onChange={handleChange}
          placeholder="e.g. San Francisco, CA, USA"
          error={errors.headquarters}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Primary Contact Email *"
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="hq@company.com"
            error={errors.contactEmail}
          />
          <Input
            label="Contact Phone Number"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="+1 (555) 000-1234"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Corporate Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a brief summary of the entity's core business and asset requirements..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-sidebar-hover text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Save}>
            Register Organization
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrganizationDialog;
