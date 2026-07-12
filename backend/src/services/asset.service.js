const prisma = require("../config/prisma");
const generateQRCode = require("../utils/qrcode");
const activityService = require("./activity.service");

const generateAssetTag = async () => {

    const count = await prisma.asset.count();

    return `AF-${String(count + 1).padStart(4, "0")}`;

};

const createAsset = async (data) => {

    const category = await prisma.assetCategory.findUnique({
        where: {
            id: data.categoryId,
        },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    if (data.serialNumber) {

        const serial = await prisma.asset.findUnique({
            where: {
                serialNumber: data.serialNumber,
            },
        });

        if (serial) {
            throw new Error("Serial number already exists");
        }

    }

    const assetTag = await generateAssetTag();

const qrData = JSON.stringify({
    assetId: assetTag,
    assetTag,
    name: data.name,
    serialNumber: data.serialNumber,
    category: category.name,
    location: data.location,
});

const qrCode = await generateQRCode(qrData);

    return prisma.asset.create({
        data: {
            ...data,
            acquisitionDate: data.acquisitionDate
                ? new Date(data.acquisitionDate)
                : null,
            assetTag,
            qrCode,
        },
        include: {
            category: true,
        },
    });

await activityService.logActivity(
    "Admin",
    `Created asset ${asset.assetTag}`
);

return asset;
};

const getAssets = () => {

    return prisma.asset.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

};

const getAsset = (id) => {

    return prisma.asset.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });

};

const updateAsset = async (id, data) => {

   return prisma.asset.update({
    where: {
        id,
    },
    data: {
        ...data,
        acquisitionDate: data.acquisitionDate
            ? new Date(data.acquisitionDate)
            : undefined,
    },
    include: {
        category: true,
    },
});

};

module.exports = {
    createAsset,
    getAssets,
    getAsset,
    updateAsset,
};