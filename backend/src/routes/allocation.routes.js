const express = require("express");

const router = express.Router();

const controller = require("../controllers/allocation.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.post(
    "/",
    authorize("asset:allocate"),
    controller.allocate
);

router.get(
    "/",
    authorize("asset:read"),
    controller.getAllocations
);

router.post(
    "/:id/return",
    authorize("asset:allocate"),
    controller.returnAsset
);

module.exports = router;