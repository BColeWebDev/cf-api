"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const user_model_1 = require("../models/user.model");
const isAdmin = async (req, res, next) => {
    const allUser = await user_model_1.User.findOne({ _id: req.params.id });
    if (allUser?.isAdmin) {
        return next();
    }
    return res.status(401).json('Not Authorized');
};
exports.isAdmin = isAdmin;
