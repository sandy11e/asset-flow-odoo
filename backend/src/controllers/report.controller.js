const reportService = require("../services/report.service");
const response = require("../utils/response");

exports.getReports = async (req, res) => {

    try {

        const data = await reportService.getReports();

        return response.success(
            res,
            "Reports generated successfully",
            data
        );

    } catch (err) {

        return response.error(
            res,
            err.message
        );

    }

};