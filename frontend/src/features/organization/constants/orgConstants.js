export const ORG_STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending Approval', value: 'Pending Approval' },
  { label: 'Under Review', value: 'Under Review' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Inactive', value: 'Inactive' },
];

export const INDUSTRY_OPTIONS = [
  'Information Technology & SaaS',
  'Logistics & Warehousing',
  'Healthcare & Medical Devices',
  'Industrial Manufacturing',
  'Financial Services & Fintech',
  'Retail & E-Commerce',
  'Government & Public Sector',
  'Education & Research',
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'createdAt-desc' },
  { label: 'Oldest First', value: 'createdAt-asc' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Employees (High to Low)', value: 'employeeCount-desc' },
];
