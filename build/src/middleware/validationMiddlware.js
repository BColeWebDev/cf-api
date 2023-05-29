"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../config/validation"));
// Validation of Register
const registerIsValid = async (req, res, next) => {
    // returns error if credentials are incorrect
    // goes to next middlware if correct
    const { error } = await validation_1.default.registerValidation(req.body);
    error === undefined ?
        next()
        :
            res.status(400).json({ errors: error.details.map(err => err.message) });
};
// Validation of Login
const loginIsValid = async (req, res, next) => {
    const { error } = await validation_1.default.loginValidation(req.body);
    // returns error if credentials are incorrect
    // goes to next middlware if correct
    error === undefined ?
        next()
        :
            res.status(400).json({ errors: error.details.map(err => err.message) });
};
// Validation of Forgot Password
const forgotPassword = async (req, res, next) => {
    const { error } = await validation_1.default.forgotValidation(req.body);
    error === undefined ?
        next() :
        res.status(400).json({ errors: error.details.map(err => err.message) });
};
exports.default = { registerIsValid, loginIsValid, forgotPassword };
