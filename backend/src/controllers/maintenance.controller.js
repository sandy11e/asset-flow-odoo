const maintenanceService = require("../services/maintenance.service");
const { createMaintenanceSchema } = require("../validators/maintenance.validator");
const response = require("../utils/response");

exports.raiseRequest = async (req, res) => {
    try {

        const body = createMaintenanceSchema.parse(req.body);

        const request = await maintenanceService.raiseRequest(
            body,
            req.user.id
        );

        return response.success(
            res,
            "Maintenance request created successfully",
            request,
            201
        );

    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getRequests = async (req, res) => {

    try {

        const requests = await maintenanceService.getRequests();

        return response.success(
            res,
            "Maintenance requests fetched successfully",
            requests
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};

exports.approveRequest = async (req, res) => {

    try {

        const request = await maintenanceService.updateStatus(
            req.params.id,
            "APPROVED"
        );

        return response.success(
            res,
            "Maintenance request approved",
            request
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};

exports.rejectRequest = async (req, res) => {

    try {

        const request = await maintenanceService.updateStatus(
            req.params.id,
            "REJECTED"
        );

        return response.success(
            res,
            "Maintenance request rejected",
            request
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};

exports.resolveRequest = async (req, res) => {

    try {

        const request = await maintenanceService.updateStatus(
            req.params.id,
            "RESOLVED"
        );

        return response.success(
            res,
            "Maintenance request resolved",
            request
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};