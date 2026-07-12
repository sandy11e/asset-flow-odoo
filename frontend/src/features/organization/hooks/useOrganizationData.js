import { useState, useEffect, useCallback } from 'react';
import { organizationService } from '../services/organization.service';

export const useOrganizationData = () => {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [deptData, catData, empData] = await Promise.all([
        organizationService.getDepartments(),
        organizationService.getCategories(),
        organizationService.getEmployees(),
      ]);
      setDepartments(deptData.data || deptData);
      setCategories(catData.data || catData);
      setEmployees(empData.data || empData);
    } catch (err) {
      setError(err.message || 'Failed to load organization data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    departments,
    categories,
    employees,
    isLoading,
    error,
    refresh: fetchAllData,
  };
};

export default useOrganizationData;
