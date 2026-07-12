const express = require("express");

const router = express.Router();

const controller = require("../controllers/asset.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.get(
    "/",
    authorize("asset:read"),
    controller.getAssets
);

router.get(
    "/:id",
    authorize("asset:read"),
    controller.getAsset
);

router.post(
    "/",
    authorize("asset:create"),
    controller.createAsset
);

router.patch(
    "/:id",
    authorize("asset:update"),
    controller.updateAsset
);

module.exports = router;