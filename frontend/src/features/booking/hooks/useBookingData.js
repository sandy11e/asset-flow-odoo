import { useState, useEffect, useCallback } from 'react';
import { bookingService } from '../services/booking.service';
import { calendarService } from '../services/calendar.service';

export const useBookingData = () => {
  const [bookings, setBookings] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [bookingsRes, approvalsRes, resourcesRes] = await Promise.all([
        bookingService.getBookings(),
        bookingService.getPendingApprovals(),
        calendarService.getResourcesAvailability(),
      ]);
      setBookings(bookingsRes);
      setApprovals(approvalsRes);
      setResources(resourcesRes);
    } catch (err) {
      setError(err.message || 'Failed to load booking and reservation data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createBooking = async (data) => {
    const res = await bookingService.createBooking(data);
    await fetchData();
    return res;
  };

  const updateBooking = async (id, updates) => {
    const res = await bookingService.updateBooking(id, updates);
    await fetchData();
    return res;
  };

  const cancelBooking = async (id, reason) => {
    const res = await bookingService.cancelBooking(id, reason);
    await fetchData();
    return res;
  };

  const approveRequest = async (id, comments) => {
    const res = await bookingService.approveRequest(id, comments);
    await fetchData();
    return res;
  };

  const rejectRequest = async (id, reason) => {
    const res = await bookingService.rejectRequest(id, reason);
    await fetchData();
    return res;
  };

  return {
    bookings,
    approvals,
    resources,
    isLoading,
    error,
    refresh: fetchData,
    createBooking,
    updateBooking,
    cancelBooking,
    approveRequest,
    rejectRequest,
  };
};
