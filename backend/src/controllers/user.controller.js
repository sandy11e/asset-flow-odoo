const userService = require("../services/user.service");

const {
    updateUserSchema,
    updateRoleSchema,
    updateStatusSchema,
} = require("../validators/user.validator");

const response = require("../utils/response");

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        return response.success(
            res,
            "Users fetched successfully",
            users
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);

        if (!user) {
            return response.error(res, "User not found", 404);
        }

        return response.success(
            res,
            "User fetched successfully",
            user
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const body = updateUserSchema.parse(req.body);

        const user = await userService.updateUser(
            req.params.id,
            body
        );

        return response.success(
            res,
            "User updated successfully",
            user
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateRole = async (req, res) => {
    try {
        const body = updateRoleSchema.parse(req.body);

        const user = await userService.updateRole(
            req.params.id,
            body.role
        );

        return response.success(
            res,
            "User role updated successfully",
            user
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const body = updateStatusSchema.parse(req.body);

        const user = await userService.updateStatus(
            req.params.id,
            body.status
        );

        return response.success(
            res,
            "User status updated successfully",
            user
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};