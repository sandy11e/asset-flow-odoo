import {
  organizationMockData,
  departmentMockData,
  branchMockData,
  teamMockData,
} from '../mock/organization.mock';

const DELAY_MS = 400;

export const organizationService = {
  // Organizations
  getOrganizations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...organizationMockData]), DELAY_MS);
    });
  },
  getOrganizationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const org = organizationMockData.find((item) => item.id === id);
        if (org) resolve(org);
        else reject(new Error('Organization not found'));
      }, DELAY_MS);
    });
  },
  createOrganization: async (newOrg) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const created = {
          ...newOrg,
          id: `org-${Date.now()}`,
          status: 'Pending Approval',
          employeeCount: 0,
          departmentCount: 0,
          branchCount: 0,
          totalAssetValue: '$0',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(created);
      }, DELAY_MS);
    });
  },
  updateOrganization: async (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...updatedData, updatedAt: new Date().toISOString() });
      }, DELAY_MS);
    });
  },
  deleteOrganization: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, id }), DELAY_MS);
    });
  },

  // Departments
  getDepartments: async (orgId = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (orgId) {
          resolve(departmentMockData.filter((d) => d.orgId === orgId));
        } else {
          resolve([...departmentMockData]);
        }
      }, DELAY_MS);
    });
  },
  createDepartment: async (newDept) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...newDept,
          id: `dept-${Date.now()}`,
          status: 'Active',
          employeeCount: 0,
          assetCount: 0,
          createdAt: new Date().toISOString(),
        });
      }, DELAY_MS);
    });
  },

  // Branches
  getBranches: async (orgId = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (orgId) {
          resolve(branchMockData.filter((b) => b.orgId === orgId));
        } else {
          resolve([...branchMockData]);
        }
      }, DELAY_MS);
    });
  },

  // Teams
  getTeams: async (deptId = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (deptId) {
          resolve(teamMockData.filter((t) => t.deptId === deptId));
        } else {
          resolve([...teamMockData]);
        }
      }, DELAY_MS);
    });
  },
};

export default organizationService;
