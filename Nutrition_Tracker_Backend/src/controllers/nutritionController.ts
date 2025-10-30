import { Request, Response } from "express";
import * as NutritionService from "../service/nutritionService";
import { NutritionUserData } from "../model/NutritionModel";
export const calculateUserNutrition = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) return res.status(400).json({ message: "user Id is required" })

        const nutrition = await NutritionService.calculateNutrition(userId)
        if (nutrition) {
            return res.status(200).json({
                message: "Nutrition calculated successfully",
                nutrition,
            });
        }

    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "Internal server error" });

    }
}

export const getLatestUserNutrition = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const nutrition = await NutritionService.getLatestNutrition(userId)
        if (!nutrition) return res.status(404).json({ messsage: "No nutrition data fonud" })

        return res.status(200).json(nutrition)
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}
export const updateLatestUserNutrition = async (req: Request, res: Response) => {
    try {
        const data: NutritionUserData = req.body;

        if (
            !data ||
            !data.user_id ||
            data.tdee === undefined ||
            data.protein === undefined ||
            data.carb === undefined ||
            data.fat === undefined
        ) {
            return res.status(400).json({ message: "❌ Invalid or missing nutrition data" });
        }

        const nutrition = await NutritionService.editNutritionGoal(data);

        if (!nutrition) {
            return res.status(404).json({ message: "⚠️ No nutrition data found for this user" });
        }

        return res.status(200).json({
            message: "✅ Nutrition goal updated successfully",
            data: nutrition,
        });
    } catch (error: any) {
        console.error("❌ updateLatestUserNutrition error:", error);
        return res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};