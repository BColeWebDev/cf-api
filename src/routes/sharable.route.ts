import express from "express";
const router = express.Router();
import middleware from "../middleware/validationMiddlware";
import isAuthenticated from "../middleware/authMiddleware";
import sharableCtrl from "../controllers/sharable.controller";
router.route("/")
.get(isAuthenticated, sharableCtrl.getAllSharable);

router.route("/create")
.post(isAuthenticated,middleware.sharableIsValid,sharableCtrl.createSharable);


router.route("/delete")
.get(isAuthenticated, sharableCtrl.deleteSharable);

router.route("/:id/like")
.get(isAuthenticated, sharableCtrl.likeSharable);

router.route("/:id/download")
.get(isAuthenticated, sharableCtrl.downloadSharable);

export default router;
