const prisma = require("../config/prisma");

const createAudit = (data) => {

    return prisma.auditCycle.create({
        data: {
            title: data.title,
            department: data.department,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        },
    });

};

const getAudits = () => {

    return prisma.auditCycle.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

};

const closeAudit = (id) => {

    return prisma.auditCycle.update({
        where: {
            id,
        },
        data: {
            status: "CLOSED",
        },
    });

};

module.exports = {
    createAudit,
    getAudits,
    closeAudit,
};