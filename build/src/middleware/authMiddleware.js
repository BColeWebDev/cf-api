"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../config/jwt");
// User authentication for routes 
const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // verify token being sent from header 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json('No token provided');
    }
    // Get token from header
    let token = authHeader.split(' ')[1];
    try {
        // Verify token
        const decoder = (0, jwt_1.decodeToken)(token);
        // Get user from the token
        next();
    }
    catch (error) {
        return res.status(401).json('Not Authorized');
    }
};
exports.default = isAuthenticated;
