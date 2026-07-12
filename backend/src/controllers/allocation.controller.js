const allocationService = require("../services/allocation.service");
const { createAllocationSchema } = require("../validators/allocation.validator");
const response = require("../utils/response");

exports.allocate = async (req, res) => {
    try {

        const body = createAllocationSchema.parse(req.body);

        const allocation = await allocationService.allocateAsset(
            body,
            req.user.id
        );

        return response.success(
            res,
            "Asset allocated successfully",
            allocation,
            201
        );

    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getAllocations = async (req, res) => {

    try {

        const allocations = await allocationService.getAllocations();

        return response.success(
            res,
            "Allocations fetched successfully",
            allocations
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};

exports.returnAsset = async (req, res) => {

    try {

        await allocationService.returnAsset(req.params.id);

        return response.success(
            res,
            "Asset returned successfully"
        );

    } catch (err) {
        return response.error(res, err.message);
    }

};