const express = require("express");

const router = express.Router();

const controller = require("../controllers/maintenance.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.post(
    "/",
    authorize("maintenance:create"),
    controller.raiseRequest
);

router.get(
    "/",
    authorize("maintenance:read"),
    controller.getRequests
);

router.patch(
    "/:id/approve",
    authorize("maintenance:approve"),
    controller.approveRequest
);

router.patch(
    "/:id/reject",
    authorize("maintenance:approve"),
    controller.rejectRequest
);

router.patch(
    "/:id/resolve",
    authorize("maintenance:approve"),
    controller.resolveRequest
);

module.exports = router;