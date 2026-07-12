const departmentService = require("../services/department.service");
const {
    createDepartmentSchema,
    updateDepartmentSchema,
    updateDepartmentStatusSchema,
} = require("../validators/department.validator");
const response = require("../utils/response");

exports.createDepartment = async (req, res) => {
    try {
        const body = createDepartmentSchema.parse(req.body);

        const department = await departmentService.createDepartment(body);

        return response.success(
            res,
            "Department created successfully",
            department,
            201
        );
    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getDepartments();

        return response.success(
            res,
            "Departments fetched successfully",
            departments
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const department = await departmentService.getDepartment(req.params.id);

        if (!department) {
            return response.error(res, "Department not found", 404);
        }

        return response.success(
            res,
            "Department fetched successfully",
            department
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const body = updateDepartmentSchema.parse(req.body);

        const department = await departmentService.updateDepartment(
            req.params.id,
            body
        );

        return response.success(
            res,
            "Department updated successfully",
            department
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateDepartmentStatus = async (req, res) => {
    try {
        const body = updateDepartmentStatusSchema.parse(req.body);

        const department = await departmentService.updateStatus(
            req.params.id,
            body.status
        );

        return response.success(
            res,
            "Department status updated successfully",
            department
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};