const prisma = require("../config/prisma");

const createCategory = async (data) => {

    const existing = await prisma.assetCategory.findUnique({
        where: {
            name: data.name,
        },
    });

    if (existing) {
        throw new Error("Category already exists");
    }

    return prisma.assetCategory.create({
        data,
    });

};

const getCategories = () => {

    return prisma.assetCategory.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

};

const getCategory = (id) => {

    return prisma.assetCategory.findUnique({
        where: {
            id,
        },
    });

};

const updateCategory = async (id, data) => {

    if (data.name) {

        const existing = await prisma.assetCategory.findFirst({
            where: {
                name: data.name,
                NOT: {
                    id,
                },
            },
        });

        if (existing) {
            throw new Error("Category name already exists");
        }

    }

    return prisma.assetCategory.update({
        where: {
            id,
        },
        data,
    });

};

const updateStatus = (id, status) => {

    return prisma.assetCategory.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });

};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    updateStatus,
};