import React, { useState } from 'react';
import Button from '@/components/ui/Button';

const ApprovalForm = ({ onSubmit, onCancel, isReject = false }) => {
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(comments);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {isReject ? 'Rejection Reason (Required) *' : 'Manager Authorization Comments (Optional)'}
        </label>
        <textarea
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required={isReject}
          placeholder={isReject ? 'Provide reason for declining booking request...' : 'Add remarks or special conditions...'}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-sidebar-bg p-2.5 text-xs text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant={isReject ? 'danger' : 'primary'} size="sm" isLoading={isSubmitting}>
          {isReject ? 'Confirm Rejection' : 'Confirm Authorization'}
        </Button>
      </div>
    </form>
  );
};

export default ApprovalForm;
