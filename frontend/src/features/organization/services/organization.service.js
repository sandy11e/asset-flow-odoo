import api from '@/services/api';

export const organizationService = {
  // Departments
  getDepartments: async () => {
    return api.get('/departments');
  },
  getDepartmentById: async (id) => {
    return api.get(`/departments/${id}`);
  },
  createDepartment: async (data) => {
    return api.post('/departments', data);
  },
  updateDepartment: async (id, data) => {
    return api.patch(`/departments/${id}`, data);
  },
  updateDepartmentStatus: async (id, status) => {
    return api.patch(`/departments/${id}/status`, { status });
  },

  // Categories
  getCategories: async () => {
    return api.get('/categories');
  },
  getCategoryById: async (id) => {
    return api.get(`/categories/${id}`);
  },
  createCategory: async (data) => {
    return api.post('/categories', data);
  },
  updateCategory: async (id, data) => {
    return api.patch(`/categories/${id}`, data);
  },
  updateCategoryStatus: async (id, status) => {
    return api.patch(`/categories/${id}/status`, { status });
  },

  // Employees (Users)
  getEmployees: async () => {
    return api.get('/users');
  },
  getEmployeeById: async (id) => {
    return api.get(`/users/${id}`);
  },
  updateEmployeeRole: async (id, role) => {
    return api.patch(`/users/${id}/role`, { role });
  },
  updateEmployeeStatus: async (id, status) => {
    return api.patch(`/users/${id}/status`, { status });
  },
};

export default organizationService;
