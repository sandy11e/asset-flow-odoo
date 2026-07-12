const prisma = require("../config/prisma");

const getReports = async () => {

    const [
        totalAssets,
        allocatedAssets,
        availableAssets,
        maintenanceAssets,
        departmentSummary,
        categorySummary
    ] = await Promise.all([

        prisma.asset.count(),

        prisma.asset.count({
            where: {
                status: "ALLOCATED"
            }
        }),

        prisma.asset.count({
            where: {
                status: "AVAILABLE"
            }
        }),

        prisma.asset.count({
            where: {
                status: "UNDER_MAINTENANCE"
            }
        }),

        prisma.department.findMany({
            include: {
                users: true
            }
        }),

        prisma.assetCategory.findMany()

    ]);

    return {

        assetSummary: {
            totalAssets,
            allocatedAssets,
            availableAssets,
            maintenanceAssets
        },

        departmentSummary: departmentSummary.map(d => ({
            department: d.name,
            employees: d.users.length
        })),

        categorySummary

    };

};

module.exports = {
    getReports
};