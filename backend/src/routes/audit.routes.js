const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

const controller = require("../controllers/audit.controller");

router.use(auth);

router.post(
    "/",
    authorize("asset:read"),
    controller.createAudit
);

router.get(
    "/",
    authorize("asset:read"),
    controller.getAudits
);

router.patch(
    "/:id/close",
    authorize("asset:read"),
    controller.closeAudit
);

module.exports = router;