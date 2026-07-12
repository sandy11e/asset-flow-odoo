const prisma = require("../config/prisma");

const getUsers = () => {

    return prisma.user.findMany({
        include: {
            department: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

};

const getUser = (id) => {

    return prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            department: true,
        },
    });

};

const updateUser = (id, data) => {

    return prisma.user.update({
        where: {
            id,
        },
        data,
        include: {
            department: true,
        },
    });

};

const updateRole = (id, role) => {

    return prisma.user.update({
        where: {
            id,
        },
        data: {
            role,
        },
    });

};

const updateStatus = (id, status) => {

    return prisma.user.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });

};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    updateRole,
    updateStatus,
};