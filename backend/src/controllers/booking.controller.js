const bookingService = require("../services/booking.service");
const { createBookingSchema } = require("../validators/booking.validator");
const response = require("../utils/response");

exports.createBooking = async (req, res) => {
    try {

        const body = createBookingSchema.parse(req.body);

        const booking = await bookingService.createBooking(
            body,
            req.user.id
        );

        return response.success(
            res,
            "Booking created successfully",
            booking,
            201
        );

    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getBookings = async (req, res) => {

    try {

        const bookings = await bookingService.getBookings();

        return response.success(
            res,
            "Bookings fetched successfully",
            bookings
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};

exports.cancelBooking = async (req, res) => {

    try {

        await bookingService.cancelBooking(req.params.id);

        return response.success(
            res,
            "Booking cancelled successfully"
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};