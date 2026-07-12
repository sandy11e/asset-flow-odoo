const prisma = require("../config/prisma");

const getActivities = () => {

    return prisma.activityLog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 30
    });

};

const logActivity = (
    userName,
    action
) => {

    return prisma.activityLog.create({
        data: {
            userName,
            action
        }
    });

};

module.exports = {
    getActivities,
    logActivity
};