import express from 'express';
import middleware from "../middleware/validationMiddleware"
import { currentUser } from '../middleware/currentUserMiddleware';
const router = express.Router()
import authCtrl from "../controllers/auth.controller"


router.route("/")
      .get(currentUser,authCtrl.currentUser);

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

export default router