const express = require("express");

const router = express.Router();

const controller = require("../controllers/booking.controller");

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");

router.use(auth);

router.post(
    "/",
    authorize("booking:create"),
    controller.createBooking
);

router.get(
    "/",
    authorize("booking:read"),
    controller.getBookings
);

router.patch(
    "/:id/cancel",
    authorize("booking:create"),
    controller.cancelBooking
);

module.exports = router;