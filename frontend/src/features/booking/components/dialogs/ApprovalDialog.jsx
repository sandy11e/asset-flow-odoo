import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

const ApprovalDialog = ({ isOpen, onClose, approval, onConfirm }) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !approval) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirm(approval.id, comments);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to approve request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Authorize Reservation Request" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Authorizing reservation allocation:</p>
            <p className="text-gray-600 dark:text-gray-300 font-semibold mt-1">
              "{approval.bookingTitle}" — <span className="text-primary-600">{approval.resourceName}</span>
            </p>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Manager Authorization Remarks (Optional)
          </label>
          <textarea
            rows="3"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="e.g. Approved with condition that cleanroom protocol is observed..."
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} className="!bg-emerald-600 hover:!bg-emerald-700">
            Confirm Authorization
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApprovalDialog;
