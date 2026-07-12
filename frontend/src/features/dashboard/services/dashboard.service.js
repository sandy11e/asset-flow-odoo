import api from '@/services/api';

export const dashboardService = {
  getSummary: async () => {
    return api.get('/dashboard');
  },

  getRecentActivity: async () => {
    return api.get('/activity');
  },
};
