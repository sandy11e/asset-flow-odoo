export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const APP_CONFIG = {
  appName: 'AssetFlow',
  version: '1.0.0',
  defaultLocale: 'en-US',
};

export const ROLES = {
  ADMIN: 'admin',
  ASSET_MANAGER: 'asset_manager',
  DEPARTMENT_HEAD: 'department_head',
  EMPLOYEE: 'employee',
};
