const { z } = require("zod");

const createMaintenanceSchema = z.object({
    assetId: z.string().uuid(),
    issue: z.string().min(5),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

module.exports = {
    createMaintenanceSchema,
};