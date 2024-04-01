import express from "express";
const router = express.Router()
import  nutritionCtrl from "../controllers/nutritions.controller";
import isAuthenticated from '../middleware/authMiddleware';
import cacheMiddleware from "../middleware/cacheMiddleware";

router.route('/')
.get(isAuthenticated,cacheMiddleware("nutritions"),nutritionCtrl.getAllNutrition);

router.route('/createNutrition')
.post(isAuthenticated,nutritionCtrl.createNutrition)

router.route('/:id/updateNutrition')
.patch(isAuthenticated,nutritionCtrl.updateNutrition);
router.route('/:id/deleteNutrition')
.delete(isAuthenticated,nutritionCtrl.deleteNutrition)


export default router;
