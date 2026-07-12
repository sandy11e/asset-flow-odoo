const express = require("express");

const router = express.Router();

const controller = require("../controllers/category.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.get(
    "/",
    authorize("category:read"),
    controller.getCategories
);

router.get(
    "/:id",
    authorize("category:read"),
    controller.getCategory
);

router.post(
    "/",
    authorize("category:create"),
    controller.createCategory
);

router.patch(
    "/:id",
    authorize("category:update"),
    controller.updateCategory
);

router.patch(
    "/:id/status",
    authorize("category:update"),
    controller.updateCategoryStatus
);

module.exports = router;