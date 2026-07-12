import React, { useState } from 'react';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import { RESOURCE_TYPE_OPTIONS, BOOKING_PRIORITY_OPTIONS } from '../../constants/bookingConstants';

const BookingForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    resourceName: initialValues.resourceName || '',
    resourceType: initialValues.resourceType || 'Meeting Room',
    priority: initialValues.priority || 'Medium',
    attendees: initialValues.attendees || 4,
    location: initialValues.location || '',
    notes: initialValues.notes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
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
          label="Resource Name *"
          value={formData.resourceName}
          onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
          required
        />
        <Select
          label="Priority *"
          options={BOOKING_PRIORITY_OPTIONS.filter((o) => o.value !== '')}
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          type="number"
          label="Attendees"
          value={formData.attendees}
          onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
        />
        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Notes / Instructions</label>
        <textarea
          rows="3"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Submit Booking
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
