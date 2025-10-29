import express from "express";
import * as UserNutritionControll from "../controllers/nutritionController";
import { authMiddleware }  from "../middleware/authMidleware";
const router = express.Router();
router.post("/calculate/:userId", authMiddleware, UserNutritionControll.calculateUserNutrition);
router.get("/latest/:userId", authMiddleware, UserNutritionControll.getLatestUserNutrition);
router.put("/update", UserNutritionControll.updateLatestUserNutrition)
export default router