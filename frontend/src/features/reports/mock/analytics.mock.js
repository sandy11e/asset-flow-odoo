export const assetStatusData = {
  labels: ['Active', 'In Maintenance', 'Retired', 'Available', 'Assigned'],
  datasets: [
    {
      label: 'Asset Status Distribution',
      data: [150, 25, 10, 45, 120],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)', // Emerald (Active)
        'rgba(245, 158, 11, 0.8)', // Amber (Maintenance)
        'rgba(100, 116, 139, 0.8)', // Slate (Retired)
        'rgba(59, 130, 246, 0.8)', // Blue (Available)
        'rgba(99, 102, 241, 0.8)',  // Indigo (Assigned)
      ],
      borderWidth: 0,
    },
  ],
};

export const maintenanceCostTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Maintenance Cost ($)',
      data: [1200, 1900, 1500, 2200, 1800, 2500],
      backgroundColor: 'rgba(99, 102, 241, 0.8)', // Indigo
      borderRadius: 4,
    },
  ],
};

export const topKPIs = [
  { id: 1, title: 'Total Asset Value', value: '$1.2M', trend: '+5.2%', isPositive: true },
  { id: 2, title: 'Active Work Orders', value: '24', trend: '-12%', isPositive: true },
  { id: 3, title: 'Compliance Rate', value: '98.5%', trend: '+0.5%', isPositive: true },
  { id: 4, title: 'Avg Repair Time', value: '2.4 Days', trend: '+1.1%', isPositive: false },
];
