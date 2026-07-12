import React, { useState } from 'react';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import BookingSearch from '../components/controls/BookingSearch';
import SortDropdown from '../components/controls/SortDropdown';
import FilterPlaceholder from '../components/controls/FilterPlaceholder';
import BookingCard from '../components/cards/BookingCard';
import BookingTable from '../components/tables/BookingTable';
import CalendarScheduleTable from '../components/tables/CalendarScheduleTable';
import CreateBookingDialog from '../components/dialogs/CreateBookingDialog';
import BookingDetailsDialog from '../components/dialogs/BookingDetailsDialog';
import EditBookingDialog from '../components/dialogs/EditBookingDialog';
import CancelBookingDialog from '../components/dialogs/CancelBookingDialog';
import Button from '@/components/ui/Button';
import { Plus, Grid, List, Calendar } from 'lucide-react';
import { filterBookings } from '../utils/bookingUtils';

const EquipmentBookingPage = () => {
  const {
    bookings,
    resources,
    isLoading,
    createBooking,
    updateBooking,
    cancelBooking,
  } = useBookingData();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('startTime-asc');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Filter strictly for Equipment
  const equipmentBookings = filterBookings(bookings, {
    query: searchQuery,
    status: statusFilter,
    resourceType: 'Equipment',
  });

  const equipmentResources = resources.filter((r) => r.type === 'Equipment');

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title="Shared Equipment & Tool Checkout"
        subtitle="Reserve industrial drones, diagnostic thermal cameras, calibration instruments, and specialized R&D equipment."
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: 'Equipment & Gear' },
        ]}
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} icon={Plus}>
            Reserve Equipment
          </Button>
        }
      />

      {/* Controls & Mode Switcher */}
      <div className="p-4 bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <BookingSearch
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Search equipment items, models, requesters..."
          />
          <FilterPlaceholder onClick={() => setStatusFilter(statusFilter === 'Confirmed' ? '' : 'Confirmed')} />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />

          <div className="flex items-center bg-gray-100 dark:bg-sidebar-bg p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('availability')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'availability' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Display */}
      {viewMode === 'availability' ? (
        <CalendarScheduleTable resources={equipmentResources} isLoading={isLoading} />
      ) : viewMode === 'table' ? (
        <BookingTable
          bookings={equipmentBookings}
          isLoading={isLoading}
          onView={(b) => { setSelectedBooking(b); setIsInspectOpen(true); }}
          onEdit={(b) => { setSelectedBooking(b); setIsEditOpen(true); }}
          onCancel={(b) => { setSelectedBooking(b); setIsCancelOpen(true); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipmentBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onView={(bk) => { setSelectedBooking(bk); setIsInspectOpen(true); }}
              onEdit={(bk) => { setSelectedBooking(bk); setIsEditOpen(true); }}
              onCancel={(bk) => { setSelectedBooking(bk); setIsCancelOpen(true); }}
            />
          ))}
          {equipmentBookings.length === 0 && !isLoading && (
            <div className="col-span-full p-12 text-center text-gray-400 bg-white dark:bg-sidebar-hover rounded-xl border border-gray-200 dark:border-gray-700">
              No equipment reservations found matching your current filter.
            </div>
          )}
        </div>
      )}

      {/* Dialogs */}
      <CreateBookingDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        initialResourceType="Equipment"
        onSubmit={createBooking}
      />

      <BookingDetailsDialog
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        booking={selectedBooking}
        onEdit={(b) => { setIsInspectOpen(false); setSelectedBooking(b); setIsEditOpen(true); }}
        onCancelBooking={(b) => { setIsInspectOpen(false); setSelectedBooking(b); setIsCancelOpen(true); }}
      />

      <EditBookingDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        booking={selectedBooking}
        onSubmit={updateBooking}
      />

      <CancelBookingDialog
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        booking={selectedBooking}
        onConfirm={cancelBooking}
      />
    </div>
  );
};

export default EquipmentBookingPage;
