const prisma = require("../config/prisma");

const allocateAsset = async (data, allocatedById) => {

    const asset = await prisma.asset.findUnique({
        where: {
            id: data.assetId,
        },
    });

    if (!asset) {
        throw new Error("Asset not found");
    }

    if (asset.status !== "AVAILABLE") {
        throw new Error("Asset is already allocated");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: data.userId,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const allocation = await prisma.assetAllocation.create({
        data: {
            assetId: data.assetId,
            userId: data.userId,
            allocatedById,
            expectedReturnDate: data.expectedReturnDate
                ? new Date(data.expectedReturnDate)
                : null,
            remarks: data.remarks,
        },
        include: {
            asset: true,
            user: true,
        },
    });

    await prisma.asset.update({
        where: {
            id: data.assetId,
        },
        data: {
            status: "ALLOCATED",
        },
    });

    return allocation;
};

const getAllocations = () => {

    return prisma.assetAllocation.findMany({
        where: {
            status: "ACTIVE",
        },
        include: {
            asset: true,
            user: true,
        },
        orderBy: {
            allocatedAt: "desc",
        },
    });

};

const returnAsset = async (id) => {

    const allocation = await prisma.assetAllocation.findUnique({
        where: {
            id,
        },
    });

    if (!allocation) {
        throw new Error("Allocation not found");
    }

    await prisma.assetAllocation.update({
        where: {
            id,
        },
        data: {
            status: "RETURNED",
            returnedAt: new Date(),
        },
    });

    await prisma.asset.update({
        where: {
            id: allocation.assetId,
        },
        data: {
            status: "AVAILABLE",
        },
    });

    return true;
};

module.exports = {
    allocateAsset,
    getAllocations,
    returnAsset,
};