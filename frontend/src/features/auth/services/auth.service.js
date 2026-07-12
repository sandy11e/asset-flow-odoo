import api from '@/services/api';

export const authService = {
  login: async (credentials) => {
    // return api.post('/auth/login', credentials);
    // MOCK RESPONSE
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@assetflow.com' && credentials.password === 'admin123') {
          resolve({
            data: {
              token: 'mock-jwt-token',
              user: { id: 1, email: 'admin@assetflow.com', role: 'admin', name: 'Admin User' },
            },
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  forgotPassword: async (data) => {
    // return api.post('/auth/forgot-password', data);
    // MOCK RESPONSE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Reset link sent if email exists' } });
      }, 1000);
    });
  },

  resetPassword: async (data) => {
    // return api.post('/auth/reset-password', data);
    // MOCK RESPONSE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Password reset successfully' } });
      }, 1000);
    });
  },

  logout: async () => {
    // return api.post('/auth/logout');
    // MOCK RESPONSE
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Logged out' } });
      }, 500);
    });
  },

  getCurrentUser: async () => {
    // return api.get('/auth/me');
    // MOCK RESPONSE (simulate failure if no token is mocked)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem('token');
        if (token) {
          resolve({
            data: { user: { id: 1, email: 'admin@assetflow.com', role: 'admin', name: 'Admin User' } },
          });
        } else {
          reject(new Error('Not authenticated'));
        }
      }, 500);
    });
  },
};
