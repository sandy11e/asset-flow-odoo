const { z } = require("zod");

const createDepartmentSchema = z.object({
    name: z.string().trim().min(2),
    description: z.string().optional(),
    parentDepartmentId: z.string().uuid().optional().nullable(),
});

const updateDepartmentSchema = z.object({
    name: z.string().trim().min(2).optional(),
    description: z.string().optional(),
    parentDepartmentId: z.string().uuid().optional().nullable(),
});

const updateDepartmentStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createDepartmentSchema,
    updateDepartmentSchema,
    updateDepartmentStatusSchema,
};