/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} title
 * @property {string} resourceId
 * @property {string} resourceName
 * @property {string} resourceType - 'Meeting Room' | 'Vehicle' | 'Equipment' | 'Workspace' | 'Lab'
 * @property {string} requesterName
 * @property {string} requesterEmail
 * @property {string} department
 * @property {string} startTime - ISO String
 * @property {string} endTime - ISO String
 * @property {string} status - 'Confirmed' | 'Pending Approval' | 'In Progress' | 'Completed' | 'Cancelled' | 'Rejected'
 * @property {string} priority - 'High' | 'Medium' | 'Low' | 'Urgent'
 * @property {number} attendees
 * @property {string} location
 * @property {string} notes
 * @property {string} createdAt
 */

/**
 * @typedef {Object} ResourceAvailability
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} capacity
 * @property {string} location
 * @property {boolean} isAvailable
 * @property {string} nextAvailableSlot
 * @property {Array<{start: string, end: string, title: string}>} bookedSlots
 */

/**
 * @typedef {Object} BookingApprovalRequest
 * @property {string} id
 * @property {string} bookingId
 * @property {string} bookingTitle
 * @property {string} resourceName
 * @property {string} requesterName
 * @property {string} department
 * @property {string} requestedDate
 * @property {string} status - 'Pending' | 'Approved' | 'Rejected'
 * @property {string} approverName
 * @property {string} comments
 */
