export const notificationMockData = [
  {
    id: 'NOTIF-101',
    type: 'approval', // approval, alert, task, system
    title: 'Asset Transfer Request',
    message: 'John Doe has requested a transfer for MacBook Pro 16".',
    timestamp: '10 mins ago',
    isUnread: true,
    priority: 'high',
    link: '/allocations/transfers'
  },
  {
    id: 'NOTIF-102',
    type: 'alert',
    title: 'Maintenance Overdue',
    message: 'Preventive maintenance for HVAC System is 2 days overdue.',
    timestamp: '2 hours ago',
    isUnread: true,
    priority: 'critical',
    link: '/maintenance/requests'
  },
  {
    id: 'NOTIF-103',
    type: 'task',
    title: 'New Work Order Assigned',
    message: 'You have been assigned to Work Order #WO-304.',
    timestamp: 'Yesterday',
    isUnread: false,
    priority: 'medium',
    link: '/maintenance/work-orders'
  },
  {
    id: 'NOTIF-104',
    type: 'system',
    title: 'System Update Scheduled',
    message: 'AssetFlow will undergo maintenance on Sunday at 2:00 AM EST.',
    timestamp: '2 days ago',
    isUnread: false,
    priority: 'low',
    link: null
  }
];
