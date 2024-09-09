import express from "express";
const router = express.Router();
import nutritionCtrl from "../controllers/nutritions.controller";
import isAuthenticated from "../middleware/authMiddleware";
import cacheMiddleware from "../middleware/cacheMiddleware";

router
  .route("/")
  .get(
    isAuthenticated,
    cacheMiddleware("nutritions"),
    nutritionCtrl.getAllNutrition
  );
router
  .route("/instant-search")
  .get(
    isAuthenticated,
    cacheMiddleware("nutritions-instant"),
    nutritionCtrl.instantNutritionSearch
  );
router
  .route("/createNutrition")
  .post(isAuthenticated, nutritionCtrl.createNutrition);

router
  .route("/:id/updateNutrition")
  .patch(isAuthenticated, nutritionCtrl.updateNutrition);
router
  .route("/:id/deleteNutrition")
  .delete(isAuthenticated, nutritionCtrl.deleteNutrition);
router
  .route("/details")
  .get(
    isAuthenticated,
    cacheMiddleware("nutritions-details"),
    nutritionCtrl.getNutritionDetails
  );

export default router;
