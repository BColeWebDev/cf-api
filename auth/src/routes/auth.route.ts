import express from 'express';
import middleware from "../middleware/validationMiddleware"
import { currentUser } from '../middleware/currentUserMiddleware';
const router = express.Router()
import authCtrl from "../controllers/auth.controller"
router.route("/register")
      .post( middleware.registerIsValid, authCtrl.registerUser)
router.route("/login")
      .post(middleware.loginIsValid,authCtrl.loginUser)
router.route("/current-user")
      .get(currentUser,authCtrl.currentUser,authCtrl.currentUser);

export default router