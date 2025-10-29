import express from "express";
import * as MealController from "../controllers/mealController";
import { authMiddleware } from "../middleware/authMidleware";

const router = express.Router();

router.post("/", authMiddleware, MealController.addMeal);
router.get("/today/:userId", authMiddleware, MealController.getTodayMeals);
router.delete("/delete/:mealId", authMiddleware, MealController.deleteMeal);

export default router;