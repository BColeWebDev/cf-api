"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_service_1 = __importStar(require("./../config/services/email.service"));
const user_service_1 = require("../config/services/user.service");
const token_service_1 = require("../config/services/token.service");
const token_service_2 = require("../config/services/token.service");
const jwt_1 = require("../config/jwt");
const user_model_1 = require("../models/user.model");
const hash_1 = __importDefault(require("../config/hash"));
const dayjs_1 = __importDefault(require("dayjs"));
let error = [];
// Return all Created Users (Admin)
const allUsers = async (req, res) => {
    try {
        const allUsers = await user_model_1.User.find({});
        return res.status(200).json(allUsers);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
// Creates user and generates login token
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password, bio, experience, crown_member, age, sex } = req.body;
    // check to see if user already exist
    const userExist = await user_model_1.User.findOne({ email });
    if (userExist) {
        error.push("email already exists!");
        res.status(409).json({ errors: error.map(err => err) });
        error = [];
    }
    else {
        // // Hashed Passwords
        const hashedPassword = await hash_1.default.hash({ rounds: 10, password });
        // token
        const userToken = (0, jwt_1.generateToken)(email, first_name, last_name);
        // Create User 
        const newUser = user_model_1.User.build({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            bio,
            experience,
            age,
            sex,
            crown_member,
            settings: {
                theme: "dark",
                weight: "imperial",
                distance: "imperial",
                size: "imperial"
            }
        });
        await newUser.save();
        // send user
        if (newUser) {
            // Creates verification email
            const emailVerfication = (0, email_service_1.verificationEmail)(newUser.email, userToken);
            try {
                await (0, email_service_1.sendEmail)(emailVerfication);
                // // Creates session cookie
                // res.cookie("x-auth-token",userToken,{
                //     maxAge: 15 * 60 * 1000,
                //     expires: new Date(Date.now() + 15 * 60 * 1000),
                //     secure: false,
                //     httpOnly: true,
                //     signed: true,
                //     sameSite: 'strict'
                // });    
                return res.status(201).send({ message: `A verification mail has been sent. ${newUser.first_name}` });
            }
            catch (error) {
                console.log(error);
                user_model_1.User.findByIdAndDelete(newUser._id);
                return res
                    .status(403)
                    .send({ message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.` });
            }
        }
        else {
            error.push("Invalid user data");
            res.status(400).json({ errors: error.map(err => err) });
            error = [];
        }
    }
};
// - Login User 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Checks for email
    const existingUser = await user_model_1.User.findOne({ email: email });
    if (!existingUser || !(await hash_1.default.compare(password, existingUser.password))) {
        error.push("Invalid Credentials email or password is incorrect");
        return res.status(400).json({ message: "Invalid Credentials email or password is incorrect" });
    }
    try {
        const userToken = (0, jwt_1.generateToken)(existingUser.email, existingUser.first_name, existingUser.last_name);
        res.status(200).json({ id: existingUser.id, email: existingUser.email, userToken });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
};
// - Sign Out User 
const SignOutUser = async (req, res) => {
    res.clearCookie("x-auth-cookie");
    res.status(200).json({ message: "Successfully Logged out" });
};
// - Current User
const currentUser = async (req, res) => {
    res.json({ currentUser: req.currentUser || null });
};
// - Login Reset
const loginReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await (0, user_service_1.findUserById)(email);
        if (!user)
            return res.status(404).send({ message: "No user found with this email address." });
        const resetToken = (0, jwt_1.createToken)();
        const tokenExpiryDate = (0, dayjs_1.default)().add(12, "hours").toDate();
        (0, token_service_2.setUserId)(resetToken, user.id);
        (0, user_service_1.setResetPasswordToken)(user, resetToken.token, tokenExpiryDate);
        await (0, user_service_1.saveUser)(user);
        await (0, token_service_1.saveToken)(resetToken);
        try {
            const email = (0, email_service_1.createResetPasswordEmail)(user.email, resetToken.token);
            await (0, email_service_1.sendEmail)(email);
            return res.status(200).send({ message: "Password has been successfully changed." });
        }
        catch (error) {
            return res.status(503).send({ message: `Impossible to send an email to ${user.email}, try again. Our service may be down.` });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "An unexpected error occurred" });
    }
};
// - Forgot Password 
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await user_model_1.User.findOne({ email: email });
        if (!user)
            return res.status(404).send({ message: "User not found with that email address!" });
        const resetToken = (0, jwt_1.createToken)();
        const tokenExpirationDate = (0, dayjs_1.default)().add(12, "hours").toDate();
        (0, token_service_2.setUserId)(resetToken, user?.id);
        (0, user_service_1.setResetPasswordToken)(user, resetToken.token, tokenExpirationDate);
        // Save user and token
        await (0, user_service_1.saveUser)(user);
        await (0, token_service_1.saveToken)(resetToken);
        try {
            // Creates email reset link
            const email = email_service_1.default.emailResetLink(user.email, resetToken.token);
            // sends email
            await email_service_1.default.sendEmail(email);
            return res
                .status(200)
                .send({ message: `A reset passowrd email has been sent to ${user.email}` });
        }
        catch (error) {
            return res
                .status(503)
                .send({ message: `Impossible to send an email to ${email}, try again. Our service may be down.` });
        }
    }
    catch (error) {
        res
            .status(500)
            .send({ message: "Error has occured" });
    }
};
// - Reset User Password 
const resetPassword = async (req, res) => {
    try {
        const token = await (0, token_service_1.findTokenBy)("token", req.params['token']);
        if (!token) {
            return res.status(404).send({ message: "This token is not valid. your token may have expired." });
        }
        const user = await (0, user_service_1.findUserById)(token._id);
        if (!user) {
            return res.status(404).send({ message: "We were unable to find a user for this token." });
        }
        if (user.passwordResetToken !== token.token) {
            return res.status(400).send({
                message: "User token and your token didn't match. You may have a more recent token in your mail list.",
            });
        }
        // Verify user token has expired
    }
    catch (error) {
        res
            .status(500)
            .send({ message: "Error has occured" });
    }
};
// - Send Confirmation 
const sendConfirmation = async (req, res) => {
    try {
        const token = await (0, token_service_1.findTokenBy)("token", req.params.token);
        if (!token) {
            return res.status(404).send({
                message: "We were unable to find a valid token. Your token may have expired.",
            });
        }
        const user = await (0, user_service_1.findUserById)(token._userId);
        if (!user) {
            return res.status(404).send({ message: `We were unable to find a user for this token.` });
        }
        if (user.isVerified) {
            return res
                .status(400)
                .send({ message: "This user has already been verified. Please log in." });
        }
        (0, user_service_1.setUserVerified)(user);
        await (0, user_service_1.saveUser)(user);
    }
    catch (error) {
        return res.status(500).send("An unexpected error occurred");
    }
};
// - User Cancel
const userCancel = async (req, res) => {
    try {
        (0, user_service_1.deleteUnverifiedUserByEmail)(req.body.email);
        return res.status(200).send({ message: "User reset success" });
    }
    catch (error) {
        return res.status(500).send("An unexpected error occurred");
    }
};
const authOLogin = async (req, res) => {
    res.json('google login');
};
exports.default = {
    registerUser,
    allUsers,
    loginUser,
    currentUser,
    forgotPassword,
    resetPassword,
    sendConfirmation,
    userCancel,
    loginReset,
    SignOutUser,
    authOLogin
};
