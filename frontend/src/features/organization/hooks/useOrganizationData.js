import { useState, useEffect, useCallback } from 'react';
import { organizationService } from '../services/organization.service';

export const useOrganizationData = () => {
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [orgData, deptData, branchData, teamData] = await Promise.all([
        organizationService.getOrganizations(),
        organizationService.getDepartments(),
        organizationService.getBranches(),
        organizationService.getTeams(),
      ]);
      setOrganizations(orgData);
      setDepartments(deptData);
      setBranches(branchData);
      setTeams(teamData);
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
    organizations,
    departments,
    branches,
    teams,
    isLoading,
    error,
    refresh: fetchAllData,
  };
};

export default useOrganizationData;
