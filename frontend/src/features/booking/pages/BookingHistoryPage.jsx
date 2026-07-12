import React, { useState } from 'react';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import BookingSearch from '../components/controls/BookingSearch';
import SortDropdown from '../components/controls/SortDropdown';
import FilterPlaceholder from '../components/controls/FilterPlaceholder';
import BookingHistoryTable from '../components/tables/BookingHistoryTable';
import BookingActivityTimeline from '../components/overview/BookingActivityTimeline';
import BookingDetailsDialog from '../components/dialogs/BookingDetailsDialog';
import Button from '@/components/ui/Button';
import { Download, List, Clock } from 'lucide-react';
import { filterBookings } from '../utils/bookingUtils';

const BookingHistoryPage = () => {
  const { bookings, isLoading } = useBookingData();

  const [viewMode, setViewMode] = useState('table'); // table | timeline
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('startTime-desc');

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  // Filter completed or archived or cancelled or all historical items
  const historyBookings = filterBookings(bookings, {
    query: searchQuery,
    status: statusFilter,
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title="Historical Booking & Reservation Logs"
        subtitle="Complete immutable audit history of completed meetings, dispatched vehicles, returned gear, and workspace logs."
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: 'Audit & History' },
        ]}
        actions={
          <Button variant="secondary" size="sm" icon={Download}>
            Export History CSV
          </Button>
        }
      />

      {/* Controls & Mode Switcher */}
      <div className="p-4 bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <BookingSearch
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Search log ID, title, resource, requester..."
          />
          <FilterPlaceholder onClick={() => setStatusFilter(statusFilter === 'Completed' ? '' : 'Completed')} />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />

          <div className="flex items-center bg-gray-100 dark:bg-sidebar-bg p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'timeline' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
              }`}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'timeline' ? (
        <BookingActivityTimeline bookings={historyBookings} />
      ) : (
        <BookingHistoryTable
          history={historyBookings}
          isLoading={isLoading}
          onView={(b) => { setSelectedBooking(b); setIsInspectOpen(true); }}
        />
      )}

      {/* Dialog */}
      <BookingDetailsDialog
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingHistoryPage;
