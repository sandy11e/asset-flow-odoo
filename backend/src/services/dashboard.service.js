const prisma = require("../config/prisma");

const getDashboard = async () => {

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const now = new Date();

    const [
        totalAssets,
        availableAssets,
        allocatedAssets,
        maintenanceToday,
        activeBookings,
        pendingTransfers,
        upcomingReturns,
        overdueReturns,
        recentAssets,
        recentMaintenance
    ] = await Promise.all([
        prisma.asset.count(),
        prisma.asset.count({ where: { status: "AVAILABLE" } }),
        prisma.asset.count({ where: { status: "ALLOCATED" } }),
        prisma.maintenanceRequest.count({
            where: { createdAt: { gte: todayStart, lte: todayEnd } }
        }),
        prisma.resourceBooking.count({
            where: { status: { in: ["UPCOMING", "ONGOING"] } }
        }),
        Promise.resolve(0), // Mocked for now
        prisma.assetAllocation.count({
            where: { status: "ACTIVE", expectedReturnDate: { gte: now } }
        }),
        prisma.assetAllocation.count({
            where: { status: "ACTIVE", expectedReturnDate: { lt: now } }
        }),
        prisma.asset.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        prisma.maintenanceRequest.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { asset: true }
        })
    ]);

    return {
        totalAssets,
        availableAssets,
        allocatedAssets,
        maintenanceToday,
        activeBookings,
        pendingTransfers,
        upcomingReturns,
        overdueReturns,
        recentAssets,
        recentMaintenance
    };

};

module.exports = {
    getDashboard,
};