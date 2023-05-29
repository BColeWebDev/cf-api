"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationMiddlware_1 = __importDefault(require("../middleware/validationMiddlware"));
const currentUserMiddleware_1 = require("../middleware/currentUserMiddleware");
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const isAdminMiddleware_1 = require("../middleware/isAdminMiddleware");
router.route("/")
    .get(currentUserMiddleware_1.currentUser, auth_controller_1.default.currentUser);
router.route("/:id/users")
    .get(isAdminMiddleware_1.isAdmin, auth_controller_1.default.allUsers);
router.route("/register")
    .post(validationMiddlware_1.default.registerIsValid, auth_controller_1.default.registerUser);
router.route("/register/cancel")
    .post(auth_controller_1.default.userCancel);
router.route("/login")
    .post(validationMiddlware_1.default.loginIsValid, auth_controller_1.default.loginUser);
router.route("/login/forgot-password")
    .post(validationMiddlware_1.default.forgotPassword, auth_controller_1.default.forgotPassword);
router.route("/login/reset/:token")
    .post(auth_controller_1.default.loginReset);
router.route("/confirmation/:token")
    .post(auth_controller_1.default.sendConfirmation);
router.route("/logout")
    .post(auth_controller_1.default.SignOutUser);
router.route('/authO')
    .post(auth_controller_1.default.authOLogin);
exports.default = router;
