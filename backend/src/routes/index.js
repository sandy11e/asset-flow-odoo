const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const authMiddleware = require("../middlewares/auth.middleware");

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