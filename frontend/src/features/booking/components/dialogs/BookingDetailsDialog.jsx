import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import BookingDetailCard from '../cards/BookingDetailCard';

const BookingDetailsDialog = ({ isOpen, onClose, booking, onEdit, onCancelBooking }) => {
  if (!isOpen || !booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reservation Inspection — ${booking.id}`} size="lg">
      <div className="space-y-4">
        <BookingDetailCard booking={booking} className="!border-0 !shadow-none !p-0" />

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Inspection
          </Button>
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={() => { onClose(); onEdit(booking); }}>
                Edit Terms
              </Button>
            )}
            {onCancelBooking && booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
              <Button variant="danger" size="sm" onClick={() => { onClose(); onCancelBooking(booking); }}>
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailsDialog;
