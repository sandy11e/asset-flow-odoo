import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { XCircle } from 'lucide-react';

const RejectDialog = ({ isOpen, onClose, approval, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !approval) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please specify a rejection reason for the requester.');
      return;
    }
    setIsSubmitting(true);
    try {
      await onConfirm(approval.id, reason);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to reject request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Decline Reservation Request" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Declining reservation allocation:</p>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mt-1">
              "{approval.bookingTitle}" — <span className="text-rose-600">{approval.resourceName}</span>
            </p>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Reason for Rejection * (Required)
          </label>
          <textarea
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Resource reserved for VIP executive delegation or maintenance schedule overlap..."
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="danger" size="sm" isLoading={isSubmitting}>
            Confirm Rejection
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RejectDialog;
