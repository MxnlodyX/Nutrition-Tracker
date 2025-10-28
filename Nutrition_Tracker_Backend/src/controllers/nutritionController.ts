import { Request, Response } from "express";
import * as NutritionService from "../service/nutritionService";

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