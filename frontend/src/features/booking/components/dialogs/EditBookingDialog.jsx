import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Button from '@/components/ui/Button';
import { BOOKING_STATUS_OPTIONS, BOOKING_PRIORITY_OPTIONS } from '../../constants/bookingConstants';

const EditBookingDialog = ({ isOpen, onClose, booking, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        title: booking.title || '',
        resourceName: booking.resourceName || '',
        status: booking.status || 'Confirmed',
        priority: booking.priority || 'Medium',
        attendees: booking.attendees || 1,
        location: booking.location || '',
        notes: booking.notes || '',
      });
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(booking.id, formData);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to update reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Reservation — ${booking.id}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Input
          label="Reservation Title *"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Reservation Status"
            options={BOOKING_STATUS_OPTIONS.filter((o) => o.value !== '')}
            value={formData.status || 'Confirmed'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
          <Select
            label="Priority Level"
            options={BOOKING_PRIORITY_OPTIONS.filter((o) => o.value !== '')}
            value={formData.priority || 'Medium'}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Assigned Resource Name"
            value={formData.resourceName || ''}
            onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
          />
          <Input
            type="number"
            label="Expected Attendees"
            value={formData.attendees || 1}
            onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
          />
        </div>

        <Input
          label="Location details / Hub"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />

        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Special Notes & Instructions
          </label>
          <textarea
            rows="3"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBookingDialog;
