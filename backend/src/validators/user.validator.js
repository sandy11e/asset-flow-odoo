const { z } = require("zod");

const updateUserSchema = z.object({
    name: z.string().trim().min(2).optional(),
    phone: z.string().optional(),
    departmentId: z.string().uuid().nullable().optional(),
});

const updateRoleSchema = z.object({
    role: z.enum([
        "ADMIN",
        "ASSET_MANAGER",
        "DEPARTMENT_HEAD",
        "EMPLOYEE",
    ]),
});

const updateStatusSchema = z.object({
    status: z.enum([
        "ACTIVE",
        "INACTIVE",
    ]),
});

module.exports = {
    updateUserSchema,
    updateRoleSchema,
    updateStatusSchema,
};