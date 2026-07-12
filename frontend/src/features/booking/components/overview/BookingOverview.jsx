import React from 'react';
import BookingSummaryCard from '../cards/BookingSummaryCard';
import { Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const BookingOverview = ({ bookings = [], approvals = [] }) => {
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const pendingCount = approvals.filter((a) => a.status === 'Pending').length;
  const inProgressCount = bookings.filter((b) => b.status === 'In Progress').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <BookingSummaryCard
        title="Total Bookings"
        value={bookings.length}
        subtitle="All recorded reservations"
        icon={Calendar}
        color="text-blue-600 dark:text-blue-400"
        bgClass="bg-blue-50 dark:bg-blue-950/40"
      />
      <BookingSummaryCard
        title="Active / Confirmed"
        value={confirmedCount}
        subtitle="Current active slots"
        icon={CheckCircle2}
        color="text-emerald-600 dark:text-emerald-400"
        bgClass="bg-emerald-50 dark:bg-emerald-950/40"
      />
      <BookingSummaryCard
        title="Pending Approvals"
        value={pendingCount}
        subtitle="Awaiting manager sign-off"
        icon={AlertCircle}
        color="text-amber-600 dark:text-amber-400"
        bgClass="bg-amber-50 dark:bg-amber-950/40"
      />
      <BookingSummaryCard
        title="In-Progress Now"
        value={inProgressCount}
        subtitle="Currently occupied slots"
        icon={Clock}
        color="text-purple-600 dark:text-purple-400"
        bgClass="bg-purple-50 dark:bg-purple-950/40"
      />
    </div>
  );
};

export default BookingOverview;
