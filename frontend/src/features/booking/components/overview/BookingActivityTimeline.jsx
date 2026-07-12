import React from 'react';
import BookingTimeline from '../cards/BookingTimeline';

const BookingActivityTimeline = ({ bookings = [], className = '' }) => {
  return <BookingTimeline bookings={bookings} className={className} />;
};

export default BookingActivityTimeline;
