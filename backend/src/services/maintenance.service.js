const prisma = require("../config/prisma");

const raiseRequest = async (data, userId) => {

    return prisma.maintenanceRequest.create({
        data: {
            assetId: data.assetId,
            reportedById: userId,
            issue: data.issue,
            priority: data.priority,
        },
        include: {
            asset: true,
            reportedBy: true,
        },
    });

};

const getRequests = () => {

    return prisma.maintenanceRequest.findMany({
        include: {
            asset: true,
            reportedBy: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

};

const updateStatus = async (id, status) => {

    const request = await prisma.maintenanceRequest.update({
        where: { id },
        data: { status },
    });

    if (status === "APPROVED") {

        await prisma.asset.update({
            where: {
                id: request.assetId,
            },
            data: {
                status: "UNDER_MAINTENANCE",
            },
        });

    }

    if (status === "RESOLVED") {

        await prisma.asset.update({
            where: {
                id: request.assetId,
            },
            data: {
                status: "AVAILABLE",
            },
        });

    }

    return request;

};

module.exports = {
    raiseRequest,
    getRequests,
    updateStatus,
};