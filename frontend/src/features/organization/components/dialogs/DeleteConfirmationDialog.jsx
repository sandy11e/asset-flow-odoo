import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, entityName = 'Organization', itemName = '' }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${entityName}`} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-100 dark:border-rose-900">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-sm text-rose-900 dark:text-rose-200">
            <p className="font-semibold">Warning: This action cannot be undone.</p>
            <p className="mt-1 text-xs text-rose-700 dark:text-rose-300">
              Are you sure you want to permanently delete <strong className="font-bold">{itemName || 'this entity'}</strong>? All assigned departments and branches may be unlinked.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} isLoading={isDeleting} icon={Trash2}>
            Confirm Deletion
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationDialog;
