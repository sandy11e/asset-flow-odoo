import React, { useState } from 'react';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import BookingOverview from '../components/overview/BookingOverview';
import QuickActionsPanel from '../components/overview/QuickActionsPanel';
import UpcomingReservations from '../components/overview/UpcomingReservations';
import RecentBookings from '../components/overview/RecentBookings';
import PendingApprovals from '../components/overview/PendingApprovals';
import AvailabilitySummary from '../components/overview/AvailabilitySummary';
import CreateBookingDialog from '../components/dialogs/CreateBookingDialog';
import BookingDetailsDialog from '../components/dialogs/BookingDetailsDialog';
import EditBookingDialog from '../components/dialogs/EditBookingDialog';
import CancelBookingDialog from '../components/dialogs/CancelBookingDialog';
import Button from '@/components/ui/Button';
import { Plus, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingDashboardPage = () => {
  const {
    bookings,
    approvals,
    resources,
    isLoading,
    refresh,
    createBooking,
    updateBooking,
    cancelBooking,
    approveRequest,
    rejectRequest,
  } = useBookingData();

  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [quickType, setQuickType] = useState('Meeting Room');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const handleQuickReserve = (type) => {
    setQuickType(type);
    setIsCreateOpen(true);
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsInspectOpen(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsEditOpen(true);
  };

  const handleCancelBookingPrompt = (booking) => {
    setSelectedBooking(booking);
    setIsCancelOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title="Booking & Reservation Control Center"
        subtitle="Centralized enterprise scheduling for meeting rooms, fleet vehicles, equipment, workspaces, and labs."
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: 'Control Center' },
        ]}
        actions={
          <div className="flex items-center gap-2.5">
            <Button variant="ghost" size="sm" onClick={refresh} icon={RotateCcw}>
              Sync Hub
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/booking/calendar')} icon={CalendarIcon}>
              Full Calendar Matrix
            </Button>
            <Button variant="primary" size="sm" onClick={() => handleQuickReserve('Meeting Room')} icon={Plus}>
              New Reservation
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <div className="p-12 text-center text-gray-500 font-semibold">Synchronizing reservation datasets...</div>
      ) : (
        <>
          <BookingOverview bookings={bookings} approvals={approvals} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <QuickActionsPanel onQuickReserve={handleQuickReserve} />
              <UpcomingReservations bookings={bookings} onView={handleViewBooking} />
              <RecentBookings bookings={bookings} onView={handleViewBooking} />
            </div>

            <div className="space-y-6">
              <PendingApprovals
                approvals={approvals}
                onApprove={async (req) => {
                  await approveRequest(req.id, 'Approved via dashboard');
                }}
                onReject={async (req) => {
                  await rejectRequest(req.id, 'Declined via dashboard');
                }}
              />
              <AvailabilitySummary resources={resources} />
            </div>
          </div>
        </>
      )}

      {/* Dialogs */}
      <CreateBookingDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        initialResourceType={quickType}
        onSubmit={async (data) => {
          await createBooking(data);
        }}
      />

      <BookingDetailsDialog
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        booking={selectedBooking}
        onEdit={handleEditBooking}
        onCancelBooking={handleCancelBookingPrompt}
      />

      <EditBookingDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        booking={selectedBooking}
        onSubmit={async (id, updates) => {
          await updateBooking(id, updates);
        }}
      />

      <CancelBookingDialog
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        booking={selectedBooking}
        onConfirm={async (id, reason) => {
          await cancelBooking(id, reason);
        }}
      />
    </div>
  );
};

export default BookingDashboardPage;
