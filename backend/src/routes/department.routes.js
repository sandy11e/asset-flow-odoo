const express = require("express");

const router = express.Router();

const controller = require("../controllers/department.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.get(
    "/",
    authorize("department:read"),
    controller.getDepartments
);

router.get(
    "/:id",
    authorize("department:read"),
    controller.getDepartment
);

router.post(
    "/",
    authorize("department:create"),
    controller.createDepartment
);

router.patch(
    "/:id",
    authorize("department:update"),
    controller.updateDepartment
);

router.patch(
    "/:id/status",
    authorize("department:update"),
    controller.updateDepartmentStatus
);

module.exports = router;