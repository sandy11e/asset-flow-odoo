/**
 * Formats ISO date string to readable date and time string
 * @param {string} isoString
 * @returns {string}
 */
export const formatBookingTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculates duration in hours between two ISO strings
 * @param {string} start
 * @param {string} end
 * @returns {string} e.g. "2.5 hrs"
 */
export const calculateDuration = (start, end) => {
  if (!start || !end) return '0 hrs';
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const diffHours = (endTime - startTime) / (1000 * 60 * 60);
  return `${diffHours.toFixed(1)} hrs`;
};

/**
 * Filters booking array by query, status, category, and priority
 */
export const filterBookings = (bookings = [], { query = '', status = '', resourceType = '', priority = '' }) => {
  return bookings.filter((item) => {
    const matchesQuery =
      !query ||
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.resourceName?.toLowerCase().includes(query.toLowerCase()) ||
      item.requesterName?.toLowerCase().includes(query.toLowerCase()) ||
      item.id?.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = !status || item.status === status;
    const matchesType = !resourceType || item.resourceType === resourceType;
    const matchesPriority = !priority || item.priority === priority;

    return matchesQuery && matchesStatus && matchesType && matchesPriority;
  });
};

/**
 * Checks if a proposed time range overlaps with any existing booked slots
 */
export const checkTimeConflict = (newStart, newEnd, existingBookings = []) => {
  const start = new Date(newStart).getTime();
  const end = new Date(newEnd).getTime();

  return existingBookings.some((b) => {
    if (b.status === 'Cancelled' || b.status === 'Rejected') return false;
    const bStart = new Date(b.startTime).getTime();
    const bEnd = new Date(b.endTime).getTime();
    return start < bEnd && end > bStart;
  });
};
