import express from "express";
import middleware from "../middleware/validationMiddlware";
import { currentUser } from "../middleware/currentUserMiddleware";
const router = express.Router();
import authCtrl from "../controllers/auth.controller";
import { isAdmin } from "../middleware/isAdminMiddleware";
import uploadMiddleware from "../middleware/uploadMiddleware";
import isAuthenticated from "../middleware/authMiddleware";
import sharableCtrl from "../controllers/sharable.controller";
router.route("/sharable").get(isAuthenticated, sharableCtrl.getAllSharable);

export default router;
