const assetService = require("../services/asset.service");

const {
    createAssetSchema,
    updateAssetSchema,
} = require("../validators/asset.validator");

const response = require("../utils/response");

exports.createAsset = async (req, res) => {
    try {
        const body = createAssetSchema.parse(req.body);

        const asset = await assetService.createAsset(body);

        return response.success(
            res,
            "Asset created successfully",
            asset,
            201
        );
    } catch (err) {
        return response.error(res, err.message, 400);
    }
};

exports.getAssets = async (req, res) => {
    try {
        const assets = await assetService.getAssets();

        return response.success(
            res,
            "Assets fetched successfully",
            assets
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.getAsset = async (req, res) => {
    try {
        const asset = await assetService.getAsset(req.params.id);

        if (!asset) {
            return response.error(res, "Asset not found", 404);
        }

        return response.success(
            res,
            "Asset fetched successfully",
            asset
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const body = updateAssetSchema.parse(req.body);

        const asset = await assetService.updateAsset(
            req.params.id,
            body
        );

        return response.success(
            res,
            "Asset updated successfully",
            asset
        );
    } catch (err) {
        return response.error(res, err.message);
    }
};