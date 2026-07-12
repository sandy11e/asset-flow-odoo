const { z } = require("zod");

const createAllocationSchema = z.object({
    assetId: z.string().uuid(),
    userId: z.string().uuid(),
    expectedReturnDate: z.string().optional(),
    remarks: z.string().optional(),
});

module.exports = {
    createAllocationSchema,
};