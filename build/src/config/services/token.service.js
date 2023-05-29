"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = exports.setUserId = exports.findTokenBy = exports.createToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const token_model_1 = require("../../models/token.model");
// Creates user token
const createToken = () => new token_model_1.Token({ token: crypto_1.default.randomBytes(16).toString("hex") });
exports.createToken = createToken;
//Finds token
const findTokenBy = async (prop, value) => await token_model_1.Token.findOne({ [prop]: value });
exports.findTokenBy = findTokenBy;
// setting user id
const setUserId = (token, userId) => {
    token._userId = userId;
};
exports.setUserId = setUserId;
const saveToken = (token) => token.save();
exports.saveToken = saveToken;
exports.default = {
    createToken: exports.createToken,
    findTokenBy: exports.findTokenBy,
    setUserId: exports.setUserId,
    saveToken: exports.saveToken,
};
