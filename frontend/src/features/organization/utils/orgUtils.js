export const formatCurrency = (amountStr) => {
  if (!amountStr) return '$0';
  return amountStr;
};

export const calculateTotalEmployees = (orgs = []) => {
  return orgs.reduce((sum, org) => sum + (org.employeeCount || 0), 0);
};

export const filterEntitiesByQuery = (items = [], query = '', fields = ['name', 'code']) => {
  if (!query || !items.length) return items;
  const lower = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => item[field] && String(item[field]).toLowerCase().includes(lower))
  );
};
