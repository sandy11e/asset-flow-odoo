import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const CreateBookingDialog = ({ isOpen, onClose, onSubmit, initialResourceType = 'Meeting Room' }) => {
  const [formData, setFormData] = useState({
    title: '',
    resourceName: '',
    resourceType: initialResourceType || 'Meeting Room',
    requesterName: 'Sarah Jenkins',
    requesterEmail: 's.jenkins@assetflow.com',
    department: 'Executive Office',
    startDate: new Date().toISOString().split('T')[0],
    startTimeStr: '09:00',
    endDate: new Date().toISOString().split('T')[0],
    endTimeStr: '11:00',
    priority: 'Medium',
    attendees: 4,
    location: 'HQ Campus',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Booking title is required.';
    if (!formData.resourceName.trim()) newErrors.resourceName = 'Resource name or ID is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) newErrors.endDate = 'End date is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const startTime = new Date(`${formData.startDate}T${formData.startTimeStr}:00.000Z`).toISOString();
      const endTime = new Date(`${formData.endDate}T${formData.endTimeStr}:00.000Z`).toISOString();

      await onSubmit({
        ...formData,
        startTime,
        endTime,
      });
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create booking request.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve New Resource / Slot" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {errors.submit && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 font-semibold">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Reservation Title *"
            placeholder="e.g. Q3 Board Meeting or Site Audit"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
          />
          <Select
            label="Resource Category *"
            options={RESOURCE_TYPE_OPTIONS.filter((o) => o.value !== '')}
            value={formData.resourceType}
            onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Specific Resource Name / Room / Vehicle *"
            placeholder="e.g. Executive Conference Room A or Ford Transit Van"
            value={formData.resourceName}
            onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
            error={errors.resourceName}
          />
          <Select
            label="Priority Level"
            options={BOOKING_PRIORITY_OPTIONS.filter((o) => o.value !== '')}
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-sidebar-bg border border-gray-200 dark:border-gray-700">
          <Input
            type="date"
            label="Start Date *"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            error={errors.startDate}
          />
          <Input
            type="time"
            label="Start Time *"
            value={formData.startTimeStr}
            onChange={(e) => setFormData({ ...formData, startTimeStr: e.target.value })}
          />
          <Input
            type="date"
            label="End Date *"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            error={errors.endDate}
          />
          <Input
            type="time"
            label="End Time *"
            value={formData.endTimeStr}
            onChange={(e) => setFormData({ ...formData, endTimeStr: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Requester Name"
            value={formData.requesterName}
            onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
          />
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <Input
            type="number"
            label="Expected Attendees / Pax"
            value={formData.attendees}
            onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
          />
        </div>

        <Input
          label="Location details / Hub"
          placeholder="e.g. HQ Floor 4 — Room 402"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />

        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Special Instructions / Equipment Setup Notes
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Provide required equipment specs, catering requests, or vehicle destination..."
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Discard
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Confirm Reservation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBookingDialog;
