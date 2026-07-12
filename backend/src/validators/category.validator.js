const { z } = require("zod");

const createCategorySchema = z.object({
    name: z.string().trim().min(2),
    description: z.string().optional(),
});

const updateCategorySchema = z.object({
    name: z.string().trim().min(2).optional(),
    description: z.string().optional(),
});

const updateCategoryStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    updateCategoryStatusSchema,
};