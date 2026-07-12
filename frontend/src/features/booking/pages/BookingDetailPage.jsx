import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import BookingDetailCard from '../components/cards/BookingDetailCard';
import EditBookingDialog from '../components/dialogs/EditBookingDialog';
import CancelBookingDialog from '../components/dialogs/CancelBookingDialog';
import Button from '@/components/ui/Button';
import { ArrowLeft, Edit3, XCircle } from 'lucide-react';

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, isLoading, updateBooking, cancelBooking } = useBookingData();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Find matching booking
  const booking = bookings.find((b) => b.id === id) || bookings[0];

  if (isLoading) {
    return <div className="p-16 text-center text-gray-400 font-semibold">Loading reservation metadata...</div>;
  }

  if (!booking) {
    return (
      <div className="p-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Reservation Record Not Found</h3>
        <p className="text-xs text-gray-500">The reservation ID specified does not exist or has been purged.</p>
        <Button variant="secondary" size="sm" onClick={() => navigate('/booking/dashboard')} icon={ArrowLeft}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title={`Reservation Deep Inspection — ${booking.id}`}
        subtitle={`Viewing full terms, attendee roster, and status logs for "${booking.title}".`}
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: booking.id },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} icon={ArrowLeft}>
              Back
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setIsEditOpen(true)} icon={Edit3}>
              Edit Terms
            </Button>
            {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
              <Button variant="danger" size="sm" onClick={() => setIsCancelOpen(true)} icon={XCircle}>
                Cancel Reservation
              </Button>
            )}
          </div>
        }
      />

      <div className="max-w-4xl mx-auto">
        <BookingDetailCard booking={booking} />
      </div>

      <EditBookingDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        booking={booking}
        onSubmit={async (bkId, updates) => {
          await updateBooking(bkId, updates);
        }}
      />

      <CancelBookingDialog
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        booking={booking}
        onConfirm={async (bkId, reason) => {
          await cancelBooking(bkId, reason);
          navigate('/booking/dashboard');
        }}
      />
    </div>
  );
};

export default BookingDetailPage;
