const express = require("express");

const router = express.Router();
const departmentRoutes = require("./department.routes");

const authRoutes = require("./auth.routes");
const authMiddleware = require("../middlewares/auth.middleware");
const categoryRoutes = require("./category.routes");
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