import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

const CancelBookingDialog = ({ isOpen, onClose, booking, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirm(booking.id, reason);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to cancel reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Reservation Request" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">You are about to cancel this booking:</p>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mt-1">"{booking.title}" ({booking.resourceName})</p>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Reason for Cancellation (Optional)
          </label>
          <textarea
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Meeting rescheduled or equipment no longer required..."
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Keep Reservation
          </Button>
          <Button type="submit" variant="danger" size="sm" isLoading={isSubmitting}>
            Confirm Cancellation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CancelBookingDialog;
