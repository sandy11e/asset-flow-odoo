export const BOOKING_STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Confirmed', value: 'Confirmed' },
  { label: 'Pending Approval', value: 'Pending Approval' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Rejected', value: 'Rejected' },
];

export const RESOURCE_TYPE_OPTIONS = [
  { label: 'All Categories', value: '' },
  { label: 'Meeting Room', value: 'Meeting Room' },
  { label: 'Vehicle', value: 'Vehicle' },
  { label: 'Equipment', value: 'Equipment' },
  { label: 'Workspace', value: 'Workspace' },
  { label: 'Lab', value: 'Lab' },
];

export const BOOKING_PRIORITY_OPTIONS = [
  { label: 'All Priorities', value: '' },
  { label: 'Urgent', value: 'Urgent' },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

export const BOOKING_SORT_OPTIONS = [
  { label: 'Start Time: Earliest First', value: 'startTime-asc' },
  { label: 'Start Time: Latest First', value: 'startTime-desc' },
  { label: 'Priority: High to Low', value: 'priority-desc' },
  { label: 'Resource Name (A-Z)', value: 'resourceName-asc' },
  { label: 'Recently Created', value: 'createdAt-desc' },
];

export const CALENDAR_VIEW_OPTIONS = [
  { label: 'Month View', value: 'month' },
  { label: 'Week View', value: 'week' },
  { label: 'Day View', value: 'day' },
  { label: 'Time Slot Grid', value: 'grid' },
];
