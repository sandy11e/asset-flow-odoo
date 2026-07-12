import React, { useState } from 'react';
import { useBookingData } from '../hooks/useBookingData';
import PageHeader from '../components/controls/PageHeader';
import MonthlyCalendarView from '../components/calendar/MonthlyCalendarView';
import WeeklyCalendarView from '../components/calendar/WeeklyCalendarView';
import DailyCalendarView from '../components/calendar/DailyCalendarView';
import TimeSlotGrid from '../components/calendar/TimeSlotGrid';
import CalendarLegend from '../components/calendar/CalendarLegend';
import CreateBookingDialog from '../components/dialogs/CreateBookingDialog';
import BookingDetailsDialog from '../components/dialogs/BookingDetailsDialog';
import EditBookingDialog from '../components/dialogs/EditBookingDialog';
import CancelBookingDialog from '../components/dialogs/CancelBookingDialog';
import Button from '@/components/ui/Button';
import { Plus, Calendar as CalendarIcon, Grid, Clock, Layers } from 'lucide-react';
import { RESOURCE_TYPE_OPTIONS } from '../constants/bookingConstants';

const BookingCalendarPage = () => {
  const {
    bookings,
    resources,
    isLoading,
    createBooking,
    updateBooking,
    cancelBooking,
  } = useBookingData();

  const [calendarMode, setCalendarMode] = useState('monthly'); // monthly | weekly | daily | matrix
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const filteredBookings = selectedCategory === 'All'
    ? bookings
    : bookings.filter((b) => b.resourceType === selectedCategory);

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((r) => r.type === selectedCategory);

  const handleSlotClick = (_slotStr) => {
    setIsCreateOpen(true);
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsInspectOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <PageHeader
        title="Master Schedule & Calendar Matrix"
        subtitle="Visual occupancy grid across all meeting rooms, vehicles, equipment items, and workspace pods."
        breadcrumbs={[
          { label: 'AssetFlow ERP', path: '/' },
          { label: 'Reservations Hub', path: '/booking/dashboard' },
          { label: 'Master Calendar' },
        ]}
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} icon={Plus}>
            New Schedule Request
          </Button>
        }
      />

      {/* Mode Switcher & Filter Bar */}
      <div className="p-4 bg-white dark:bg-sidebar-hover rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-sidebar-bg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Resources
          </button>
          {RESOURCE_TYPE_OPTIONS.filter((o) => o.value !== '').map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedCategory(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === opt.value
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-sidebar-bg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-gray-100 dark:bg-sidebar-bg p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0">
          <button
            onClick={() => setCalendarMode('monthly')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              calendarMode === 'monthly' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Monthly</span>
          </button>
          <button
            onClick={() => setCalendarMode('weekly')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              calendarMode === 'weekly' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Weekly</span>
          </button>
          <button
            onClick={() => setCalendarMode('daily')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              calendarMode === 'daily' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setCalendarMode('matrix')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              calendarMode === 'matrix' ? 'bg-white dark:bg-sidebar-hover shadow-xs text-primary-600' : 'text-gray-500'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Matrix Grid</span>
          </button>
        </div>
      </div>

      {/* Main Calendar View Display */}
      {isLoading ? (
        <div className="p-16 text-center text-gray-400 font-semibold">Loading calendar datasets...</div>
      ) : (
        <>
          {calendarMode === 'monthly' && (
            <MonthlyCalendarView
              bookings={filteredBookings}
              onSlotClick={handleSlotClick}
              onBookingClick={handleBookingClick}
            />
          )}
          {calendarMode === 'weekly' && (
            <WeeklyCalendarView
              bookings={filteredBookings}
              onSlotClick={handleSlotClick}
              onBookingClick={handleBookingClick}
            />
          )}
          {calendarMode === 'daily' && (
            <DailyCalendarView
              bookings={filteredBookings}
              onSlotClick={handleSlotClick}
              onBookingClick={handleBookingClick}
            />
          )}
          {calendarMode === 'matrix' && (
            <TimeSlotGrid
              resources={filteredResources}
              onReserveSlot={() => {
                setIsCreateOpen(true);
              }}
            />
          )}
          <CalendarLegend />
        </>
      )}

      {/* Dialogs */}
      <CreateBookingDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        initialResourceType={selectedCategory === 'All' ? 'Meeting Room' : selectedCategory}
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

export default BookingCalendarPage;
