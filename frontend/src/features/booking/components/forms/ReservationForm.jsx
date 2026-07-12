import React, { useState } from 'react';
import Input from '@/components/forms/Input';
import Button from '@/components/ui/Button';

const ReservationForm = ({ onSubmit, onCancel, initialResource = {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    startTimeStr: '09:00',
    endDate: new Date().toISOString().split('T')[0],
    endTimeStr: '17:00',
    requesterName: 'Sarah Jenkins',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const startTime = `${formData.startDate}T${formData.startTimeStr}:00.000Z`;
      const endTime = `${formData.endDate}T${formData.endTimeStr}:00.000Z`;
      await onSubmit({
        ...formData,
        resourceId: initialResource.id,
        resourceName: initialResource.name,
        resourceType: initialResource.type,
        startTime,
        endTime,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <Input
        label="Reservation Purpose / Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="date"
          label="Start Date *"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
        <Input
          type="time"
          label="Start Time *"
          value={formData.startTimeStr}
          onChange={(e) => setFormData({ ...formData, startTimeStr: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="date"
          label="End Date *"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        />
        <Input
          type="time"
          label="End Time *"
          value={formData.endTimeStr}
          onChange={(e) => setFormData({ ...formData, endTimeStr: e.target.value })}
        />
      </div>

      <Input
        label="Requester Name"
        value={formData.requesterName}
        onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
      />

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
          Confirm Reservation Slot
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
