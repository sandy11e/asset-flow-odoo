/**
 * @typedef {Object} Organization
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} industry
 * @property {string} taxId
 * @property {string} headquarters
 * @property {string} contactEmail
 * @property {string} contactPhone
 * @property {string} status
 * @property {number} employeeCount
 * @property {number} departmentCount
 * @property {number} branchCount
 * @property {string} totalAssetValue
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Department
 * @property {string} id
 * @property {string} orgId
 * @property {string} orgName
 * @property {string} name
 * @property {string} code
 * @property {string} headOfDepartment
 * @property {string} headEmail
 * @property {number} employeeCount
 * @property {string} budgetAllocated
 * @property {string} status
 * @property {string} location
 * @property {number} assetCount
 */

/**
 * @typedef {Object} Branch
 * @property {string} id
 * @property {string} orgId
 * @property {string} orgName
 * @property {string} name
 * @property {string} code
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {string} managerName
 * @property {string} managerEmail
 * @property {string} status
 * @property {number} employeeCount
 * @property {number} assetCount
 */

/**
 * @typedef {Object} Team
 * @property {string} id
 * @property {string} deptId
 * @property {string} deptName
 * @property {string} orgName
 * @property {string} name
 * @property {string} code
 * @property {string} teamLead
 * @property {string} leadEmail
 * @property {number} memberCount
 * @property {number} assignedAssetCount
 * @property {string} status
 */
