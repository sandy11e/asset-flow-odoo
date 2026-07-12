import api from '@/services/api';

export const authService = {
  // Interfaces prepared for backend connection
  login: async (credentials) => {
    // return api.post('/auth/login', credentials);
    
    // MOCK RESPONSE (No JWT)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@assetflow.com' && credentials.password === 'admin123') {
          resolve({
            data: {
              user: { id: 1, email: 'admin@assetflow.com', role: 'admin', name: 'Admin User' },
            },
          });
        } else if (credentials.email === 'employee@assetflow.com' && credentials.password === 'emp123') {
          resolve({
            data: {
              user: { id: 2, email: 'employee@assetflow.com', role: 'employee', name: 'John Doe' },
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Reset link sent if email exists' } });
      }, 1000);
    });
  },

  resetPassword: async (data) => {
    // return api.post('/auth/reset-password', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Password reset successfully' } });
      }, 1000);
    });
  },

  logout: async () => {
    // return api.post('/auth/logout');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Logged out' } });
      }, 500);
    });
  },

  getCurrentUser: async () => {
    // return api.get('/auth/me');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { user: { id: 1, email: 'admin@assetflow.com', role: 'admin', name: 'Admin User' } },
        });
      }, 500);
    });
  },
};
