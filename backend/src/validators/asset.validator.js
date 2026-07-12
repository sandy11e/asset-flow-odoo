const { z } = require("zod");

const createAssetSchema = z.object({
    name: z.string().trim().min(2),

    serialNumber: z.string().optional(),

    categoryId: z.string().uuid(),

    acquisitionDate: z.string().optional(),

    acquisitionCost: z.number().optional(),

    condition: z.enum([
        "EXCELLENT",
        "GOOD",
        "FAIR",
        "POOR",
    ]).optional(),

    location: z.string().min(2),

    isBookable: z.boolean().optional(),
});

const updateAssetSchema = createAssetSchema.partial();

module.exports = {
    createAssetSchema,
    updateAssetSchema,
};