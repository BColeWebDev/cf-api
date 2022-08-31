import express from 'express';
import middleware from "../middleware/validationMiddleware"
const router = express.Router()
import authCtrl from "../controllers/auth"
router.route("/register")
.post( middleware.registerIsValid, authCtrl.registerUser)
router.route("/login")
      .post(middleware.loginIsValid,authCtrl.loginUser)
export default router