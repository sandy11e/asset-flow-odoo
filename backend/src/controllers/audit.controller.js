const auditService = require("../services/audit.service");
const response = require("../utils/response");

exports.createAudit = async (req, res) => {

    try {

        const audit = await auditService.createAudit(req.body);

        return response.success(
            res,
            "Audit created successfully",
            audit,
            201
        );

    } catch (err) {

        return response.error(res, err.message);

    }

};

exports.getAudits = async (req, res) => {

    try {

        const audits = await auditService.getAudits();

        return response.success(
            res,
            "Audits fetched successfully",
            audits
        );

    } catch (err) {

        return response.error(res, err.message);

    }

};

exports.closeAudit = async (req, res) => {

    try {

        const audit = await auditService.closeAudit(req.params.id);

        return response.success(
            res,
            "Audit closed successfully",
            audit
        );

    } catch (err) {

        return response.error(res, err.message);

    }

};