const { z } = require("zod");

const createBookingSchema = z.object({
    assetId: z.string().uuid(),
    title: z.string().min(2),
    startTime: z.string(),
    endTime: z.string(),
});

module.exports = {
    createBookingSchema,
};