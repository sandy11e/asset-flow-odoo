const express = require("express");

const router = express.Router();

const controller = require("../controllers/user.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.get(
    "/",
    authorize("user:read"),
    controller.getUsers
);

router.get(
    "/:id",
    authorize("user:read"),
    controller.getUser
);

router.patch(
    "/:id",
    authorize("user:update"),
    controller.updateUser
);

router.patch(
    "/:id/role",
    authorize("user:update"),
    controller.updateRole
);

router.patch(
    "/:id/status",
    authorize("user:update"),
    controller.updateStatus
);

module.exports = router;