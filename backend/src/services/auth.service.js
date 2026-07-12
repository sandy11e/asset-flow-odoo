const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const PERMISSIONS = require("../constants/permissions");
const signup = async (data) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            phone: data.phone,
            role: data.role || PERMISSIONS.USER, 
        },
    });

    const token = generateToken({
    id: user.id,
});

    return {
        user,
        token,
    };
};

const login = async (email, password) => {

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({
    id: user.id,
});

    return {
        user,
        token,
    };
};

module.exports = {
    signup,
    login,
};