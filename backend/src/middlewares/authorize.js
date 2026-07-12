const PERMISSIONS = require("../constants/permissions");

module.exports = (...requiredPermissions) => {

    return (req, res, next) => {

        const userPermissions = PERMISSIONS[req.user.role] || [];

        if (userPermissions.includes("*")) {
            return next();
        }

        const allowed = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!allowed) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        next();

    };

};