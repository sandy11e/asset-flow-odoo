const prisma = require("../config/prisma");

const getNotifications = () => {

    return prisma.notification.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 20
    });

};

module.exports = {
    getNotifications
};