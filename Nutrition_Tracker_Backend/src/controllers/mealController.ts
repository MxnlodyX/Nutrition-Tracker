import { Request, Response } from "express";
import * as MealService from "../service/mealService";

export const addMeal = async (req: Request, res: Response) => {
    try {
        const meal = await MealService.addMeal(req.body);
        res.status(201).json({
            message: "Meal added successfully",
            meal,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getTodayMeals = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const meals = await MealService.getMealsToday(userId);

        if (meals.length === 0) {
            return res.status(404).json({ message: "No meals found for today" });
        }

        return res.status(200).json(meals);
    } catch (error: any) {
        console.error("❌ Error fetching meals:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteMeal = async (req: Request, res: Response) => {
    try {
        const mealId = Number(req.params.mealId);
        if (!mealId) return res.status(400).json({ message: "Meal ID is required" });

        const deleted = await MealService.deleteMealToday(mealId);
        return res.status(200).json({
            message: "Meal deleted successfully",
            deleted,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
        });
    }
};