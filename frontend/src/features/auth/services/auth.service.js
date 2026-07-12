import api from '@/services/api';

export const authService = {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  signup: async (userData) => {
    return api.post('/auth/signup', userData);
  },

  forgotPassword: async (data) => {
    // Keep mock as backend doesn't have this yet
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Reset link sent if email exists' } });
      }, 1000);
    });
  },

  resetPassword: async (data) => {
    // Keep mock as backend doesn't have this yet
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Password reset successfully' } });
      }, 1000);
    });
  },

  logout: async () => {
    // We don't have a backend logout route yet, but we'll clear the token in AuthContext
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Logged out' } });
      }, 500);
    });
  },

  getCurrentUser: async () => {
    return api.get('/profile');
  },
};
