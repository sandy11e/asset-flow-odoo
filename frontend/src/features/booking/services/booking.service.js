import { mockBookings } from '../mock/booking.mock';
import { mockBookingApprovals } from '../mock/approval.mock';

let bookingsState = [...mockBookings];
let approvalsState = [...mockBookingApprovals];

export const bookingService = {
  async getBookings() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...bookingsState]), 250);
    });
  },

  async getBookingById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = bookingsState.find((b) => b.id === id);
        if (found) resolve({ ...found });
        else reject(new Error('Booking not found'));
      }, 200);
    });
  },

  async createBooking(bookingData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: `BKG-2026-${String(bookingsState.length + 1).padStart(3, '0')}`,
          status: bookingData.priority === 'Urgent' ? 'Pending Approval' : 'Confirmed',
          createdAt: new Date().toISOString(),
          attendees: Number(bookingData.attendees || 1),
          ...bookingData,
        };
        bookingsState = [newBooking, ...bookingsState];

        if (newBooking.status === 'Pending Approval') {
          approvalsState = [
            {
              id: `APP-2026-${String(approvalsState.length + 101)}`,
              bookingId: newBooking.id,
              bookingTitle: newBooking.title,
              resourceName: newBooking.resourceName || 'Assigned Resource',
              requesterName: newBooking.requesterName || 'Current User',
              department: newBooking.department || 'General',
              requestedDate: newBooking.startTime ? newBooking.startTime.split('T')[0] : '2026-07-20',
              status: 'Pending',
              priority: newBooking.priority || 'Medium',
              comments: newBooking.notes || 'Submitted via booking portal.',
            },
            ...approvalsState,
          ];
        }
        resolve({ ...newBooking });
      }, 300);
    });
  },

  async updateBooking(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = bookingsState.findIndex((b) => b.id === id);
        if (idx === -1) return reject(new Error('Booking not found'));
        bookingsState[idx] = { ...bookingsState[idx], ...updates };
        resolve({ ...bookingsState[idx] });
      }, 250);
    });
  },

  async cancelBooking(id, reason = '') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = bookingsState.findIndex((b) => b.id === id);
        if (idx === -1) return reject(new Error('Booking not found'));
        bookingsState[idx] = {
          ...bookingsState[idx],
          status: 'Cancelled',
          notes: bookingsState[idx].notes + (reason ? ` [Cancelled: ${reason}]` : ''),
        };
        resolve({ ...bookingsState[idx] });
      }, 250);
    });
  },

  async getPendingApprovals() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...approvalsState]), 200);
    });
  },

  async approveRequest(approvalId, comments = '') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = approvalsState.findIndex((a) => a.id === approvalId);
        if (idx === -1) return reject(new Error('Approval request not found'));
        approvalsState[idx] = { ...approvalsState[idx], status: 'Approved', comments: comments || 'Approved by Manager' };

        const bIdx = bookingsState.findIndex((b) => b.id === approvalsState[idx].bookingId);
        if (bIdx !== -1) {
          bookingsState[bIdx] = { ...bookingsState[bIdx], status: 'Confirmed' };
        }
        resolve({ ...approvalsState[idx] });
      }, 300);
    });
  },

  async rejectRequest(approvalId, reason = '') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = approvalsState.findIndex((a) => a.id === approvalId);
        if (idx === -1) return reject(new Error('Approval request not found'));
        approvalsState[idx] = { ...approvalsState[idx], status: 'Rejected', comments: reason || 'Rejected by Manager' };

        const bIdx = bookingsState.findIndex((b) => b.id === approvalsState[idx].bookingId);
        if (bIdx !== -1) {
          bookingsState[bIdx] = { ...bookingsState[bIdx], status: 'Rejected' };
        }
        resolve({ ...approvalsState[idx] });
      }, 300);
    });
  },
};
