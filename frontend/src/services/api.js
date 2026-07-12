import axios from 'axios';

// Create a unified Axios instance for the entire application
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 second timeout
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    // In a real implementation, grab this from localStorage or Zustand/Redux
    const token = localStorage.getItem('assetflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    // Directly return the data payload to simplify service logic
    return response.data;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle Unauthorized (Token Expired)
      if (response.status === 401) {
        console.error('Session expired. Redirecting to login...');
        localStorage.removeItem('assetflow_token');
        // window.location.href = '/login'; // Or dispatch to AuthContext
      }
      
      // Handle Forbidden (Permission Denied)
      if (response.status === 403) {
        console.error('Permission denied to access this resource.');
      }
      
      // Handle Not Found
      if (response.status === 404) {
        console.error('API resource not found.');
      }
    } else {
      // Network Error (Server Down)
      console.error('Network error. Please check your connection or try again later.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
