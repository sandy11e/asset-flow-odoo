const authService = require("../services/auth.service");
const response = require("../utils/response");

exports.signup = async (req, res) => {
    try {

        const data = await authService.signup(req.body);

        response.success(res, "User registered successfully", data, 201);

    } catch (err) {

        response.error(res, err.message, 400);

    }
};

exports.login = async (req, res) => {
    try {

        const data = await authService.login(
            req.body.email,
            req.body.password
        );

        response.success(res, "Login successful", data);

    } catch (err) {

        response.error(res, err.message, 400);

    }
};