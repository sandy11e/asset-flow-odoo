const prisma = require("../config/prisma");
const activityService = require("./activity.service");
const createBooking = async (data, userId) => {

    const overlap = await prisma.resourceBooking.findFirst({
        where: {
            assetId: data.assetId,
            status: {
                not: "CANCELLED",
            },
            AND: [
                {
                    startTime: {
                        lt: new Date(data.endTime),
                    },
                },
                {
                    endTime: {
                        gt: new Date(data.startTime),
                    },
                },
            ],
        },
    });

    if (overlap) {
        throw new Error("Time slot already booked");
    }

    return prisma.resourceBooking.create({
        data: {
            assetId: data.assetId,
            userId,
            title: data.title,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
        },
        include: {
            asset: true,
            user: true,
        },
    });
    await activityService.logActivity(
    booking.user.name,
    `Booked ${booking.asset.assetTag}`
);

return booking;

};

const getBookings = () => {

    return prisma.resourceBooking.findMany({
        include: {
            asset: true,
            user: true,
        },
        orderBy: {
            startTime: "asc",
        },
    });

};

const cancelBooking = (id) => {

    return prisma.resourceBooking.update({
        where: {
            id,
        },
        data: {
            status: "CANCELLED",
        },
    });

};

module.exports = {
    createBooking,
    getBookings,
    cancelBooking,
};