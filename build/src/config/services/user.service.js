"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnverifiedUserByEmail = exports.deleteUserById = exports.setUserVerified = exports.setUserPassword = exports.saveUser = exports.findUserById = exports.findUserBy = exports.setResetPasswordToken = exports.createUser = exports.getUser = void 0;
const user_model_1 = require("../../models/user.model");
const dayjs_1 = __importDefault(require("dayjs"));
const getUser = (user) => user.hidePassword();
exports.getUser = getUser;
const createUser = ({ username, email, password, }) => new user_model_1.User({ username, email, password });
exports.createUser = createUser;
const setResetPasswordToken = (user, resetTokenValue, expiryDate) => {
    user.passwordResetToken = resetTokenValue;
    user.passwordResetExpires = expiryDate;
};
exports.setResetPasswordToken = setResetPasswordToken;
const findUserBy = async (prop, value) => await user_model_1.User.findOne({ [prop]: value });
exports.findUserBy = findUserBy;
const findUserById = async (id) => await user_model_1.User.findById(id);
exports.findUserById = findUserById;
const saveUser = async (user) => await user.save();
exports.saveUser = saveUser;
const setUserPassword = async (user, password) => {
    user.password = password;
    user.passwordResetToken = "";
    user.passwordResetExpires = (0, dayjs_1.default)().toDate();
    return await user.hashPassword();
};
exports.setUserPassword = setUserPassword;
const setUserVerified = async (user) => {
    user.isVerified = true;
    user.expires = undefined;
};
exports.setUserVerified = setUserVerified;
const deleteUserById = async (user) => await user_model_1.User.findByIdAndDelete(user._id);
exports.deleteUserById = deleteUserById;
const deleteUnverifiedUserByEmail = async (email) => await user_model_1.User.findOneAndDelete({ email, isVerified: false });
exports.deleteUnverifiedUserByEmail = deleteUnverifiedUserByEmail;
exports.default = {
    getUser: exports.getUser,
    createUser: exports.createUser,
    setResetPasswordToken: exports.setResetPasswordToken,
    findUserBy: exports.findUserBy,
    findUserById: exports.findUserById,
    saveUser: exports.saveUser,
    setUserPassword: exports.setUserPassword,
    setUserVerified: exports.setUserVerified,
    deleteUserById: exports.deleteUserById,
    deleteUnverifiedUserByEmail: exports.deleteUnverifiedUserByEmail,
};
