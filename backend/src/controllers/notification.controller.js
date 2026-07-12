const notificationService = require("../services/notification.service");
const response = require("../utils/response");

exports.getNotifications = async (req, res) => {

    try {

        const data = await notificationService.getNotifications();

        return response.success(
            res,
            "Notifications fetched",
            data
        );

    } catch (err) {

        return response.error(res, err.message);

    }

};