export const dashboardService = {
  getSummary: async () => {
    // MOCK RESPONSE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalAssets: 1245,
            availableAssets: 830,
            allocatedAssets: 350,
            maintenanceAssets: 65,
          },
        });
      }, 500);
    });
  },

  getRecentActivity: async () => {
    // MOCK RESPONSE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, action: 'Asset Allocated', user: 'Priya S.', item: 'Laptop AF-0114', time: '10 mins ago' },
            { id: 2, action: 'Maintenance Requested', user: 'Raj K.', item: 'Projector RM-2', time: '1 hour ago' },
            { id: 3, action: 'Asset Returned', user: 'Amit B.', item: 'Monitor AF-0092', time: '2 hours ago' },
          ],
        });
      }, 500);
    });
  },
};
