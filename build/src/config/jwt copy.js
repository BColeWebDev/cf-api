"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = exports.generateToken = void 0;
const token_model_1 = require("./../models/token.model");
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = __importDefault(require("crypto"));
/**
 * generates JWT used for local testing
 */
// Enviorment Variables
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const jwtSecret = process.env.JWT_SECRET;
// Generates JWT User Token
const generateToken = (email, first_name, last_name) => {
    // information to be encoded
    return (0, jsonwebtoken_1.sign)({ email, first_name, last_name }, jwtSecret, {
        expiresIn: "1hr"
    });
};
exports.generateToken = generateToken;
// Creates user token
const createToken = () => new token_model_1.Token({
    token: crypto_1.default.randomBytes(16).toString("hex"),
});
exports.createToken = createToken;
// Verfiy JWT Token
const decodeToken = (token) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, jwtSecret);
    }
    catch (error) {
        return error;
    }
};
exports.decodeToken = decodeToken;
