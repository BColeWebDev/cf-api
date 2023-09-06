import express from 'express';
import middleware from "../middleware/validationMiddlware";
import { currentUser } from '../middleware/currentUserMiddleware';
const router = express.Router()
import authCtrl from "../controllers/auth.controller"
import { isAdmin } from "../middleware/isAdminMiddleware";


router.route("/")
      .get(currentUser,authCtrl.currentUser);
router.route("/:id/users")
      .get(isAdmin,authCtrl.allUsers)
router.route("/:id/delete")
      .delete(authCtrl.deleteUser)
router.route("/register")
      .post( middleware.registerIsValid, authCtrl.registerUser)

router.route("/register/cancel")
       .post(authCtrl.userCancel)

router.route("/login")
      .post(middleware.loginIsValid,authCtrl.loginUser)

router.route("/login/forgot-password")
      .post(middleware.forgotPassword, authCtrl.forgotPassword)
      
router.route("/login/reset/:token")
      .post(authCtrl.loginReset)

router.route("/confirmation/:token")
      .post(authCtrl.sendConfirmation)

router.route("/logout")
      .post(authCtrl.SignOutUser)

router.route("/settings")
      .post(authCtrl.Settings)

export default router