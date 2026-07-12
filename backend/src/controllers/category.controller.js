const categoryService = require("../services/category.service");

const {
    createCategorySchema,
    updateCategorySchema,
    updateCategoryStatusSchema,
} = require("../validators/category.validator");

const response = require("../utils/response");

exports.createCategory = async (req, res) => {
    try {
        const body = createCategorySchema.parse(req.body);

        const category = await categoryService.createCategory(body);

        return response.success(
            res,
            "Category created successfully",
            category,
            201
        );
    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();

        return response.success(
            res,
            "Categories fetched successfully",
            categories
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.id);

        if (!category) {
            return response.error(res, "Category not found", 404);
        }

        return response.success(
            res,
            "Category fetched successfully",
            category
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const body = updateCategorySchema.parse(req.body);

        const category = await categoryService.updateCategory(
            req.params.id,
            body
        );

        return response.success(
            res,
            "Category updated successfully",
            category
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateCategoryStatus = async (req, res) => {
    try {
        const body = updateCategoryStatusSchema.parse(req.body);

        const category = await categoryService.updateStatus(
            req.params.id,
            body.status
        );

        return response.success(
            res,
            "Category status updated successfully",
            category
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};