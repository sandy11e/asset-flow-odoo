const express = require("express");

const router = express.Router();
const departmentRoutes = require("./department.routes");

const authRoutes = require("./auth.routes");
const authMiddleware = require("../middlewares/auth.middleware");
const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");
const assetRoutes = require("./asset.routes");
const allocationRoutes = require("./allocation.routes");
const bookingRoutes = require("./booking.routes");
const maintenanceRoutes = require("./maintenance.routes");
const dashboardRoutes = require("./dashboard.routes");
const reportRoutes = require("./report.routes");
const notificationRoutes = require("./notification.routes");
const activityRoutes = require("./activity.routes");
const auditRoutes = require("./audit.routes");

router.use("/audit", auditRoutes);
router.use("/activity", activityRoutes);
router.use("/notifications", notificationRoutes);
router.use("/reports", reportRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/bookings", bookingRoutes);

router.use("/allocations", allocationRoutes);
router.use("/assets", assetRoutes);
router.use("/users", userRoutes);
router.use("/departments", departmentRoutes);
router.use("/categories", categoryRoutes);

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API Healthy",
    });
});

router.use("/auth", authRoutes);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});
module.exports = router;