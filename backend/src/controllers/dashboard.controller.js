const dashboardService = require("../services/dashboard.service");
const response = require("../utils/response");

exports.getDashboard = async (req, res) => {

    try {

        const dashboard = await dashboardService.getDashboard();

        return response.success(
            res,
            "Dashboard loaded successfully",
            dashboard
        );

    } catch (err) {

        return response.error(res, err.message);

    }

};