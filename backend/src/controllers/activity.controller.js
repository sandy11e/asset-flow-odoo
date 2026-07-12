const activityService = require("../services/activity.service");
const response = require("../utils/response");

exports.getActivities = async (req, res) => {

    try {

        const data = await activityService.getActivities();

        return response.success(
            res,
            "Activities fetched",
            data
        );

    } catch (err) {

        return response.error(
            res,
            err.message
        );

    }

};