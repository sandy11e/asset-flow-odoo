const prisma = require("../config/prisma");

const getDashboard = async () => {

    const [
        totalAssets,
        availableAssets,
        allocatedAssets,
        maintenanceAssets,
        activeBookings,
        activeAllocations,
        totalUsers,
        totalDepartments,
        totalCategories,
        recentAssets,
        recentMaintenance
    ] = await Promise.all([

        prisma.asset.count(),

        prisma.asset.count({
            where: {
                status: "AVAILABLE",
            },
        }),

        prisma.asset.count({
            where: {
                status: "ALLOCATED",
            },
        }),

        prisma.asset.count({
            where: {
                status: "UNDER_MAINTENANCE",
            },
        }),

        prisma.resourceBooking.count({
            where: {
                status: "UPCOMING",
            },
        }),

        prisma.assetAllocation.count({
            where: {
                status: "ACTIVE",
            },
        }),

        prisma.user.count(),

        prisma.department.count(),

        prisma.assetCategory.count(),

        prisma.asset.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        }),

        prisma.maintenanceRequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            include: {
                asset: true,
            },
        })

    ]);

    return {

        totalAssets,

        availableAssets,

        allocatedAssets,

        maintenanceAssets,

        activeBookings,

        activeAllocations,

        totalUsers,

        totalDepartments,

        totalCategories,

        recentAssets,

        recentMaintenance,

    };

};

module.exports = {
    getDashboard,
};