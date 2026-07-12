const prisma = require("../config/prisma");
const activityService = require("./activity.service");
const createDepartment = async (data) => {

    const exists = await prisma.department.findUnique({
        where: {
            name: data.name,
        },
    });

    if (exists) throw new Error("Department already exists");

    return prisma.department.create({
        data,
    });
    
    await activityService.logActivity(
    "Admin",
    `Created department ${department.name}`
);

return department;

};

const getDepartments = () => {

    return prisma.department.findMany({
        include: {
            parentDepartment: true,
            childDepartments: true,
            users: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

};

const getDepartment = (id) => {

    return prisma.department.findUnique({
        where: { id },
        include: {
            parentDepartment: true,
            childDepartments: true,
            users: true,
        },
    });

};

const updateDepartment = async (id, data) => {

    return prisma.department.update({
        where: { id },
        data,
    });

};

const updateStatus = (id, status) => {

    return prisma.department.update({
        where: { id },
        data: {
            status,
        },
    });

};

module.exports = {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    updateStatus,
};