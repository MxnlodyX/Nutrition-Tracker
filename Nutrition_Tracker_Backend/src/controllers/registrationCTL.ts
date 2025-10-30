import { Request, Response } from 'express'
import * as RegistrationService from '../service/registrationService'
import UserInformation from "../model/registrationModel";
import * as NutritionService from "../service/nutritionService";

const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};
export const createNewAccount = async (req: Request, res: Response) => {
    try {
        const user = new UserInformation(req.body);
        const newUser = await RegistrationService.registrationAccount(user);
        if (!newUser?.id) {
            return res.status(400).json({ message: "User ID not found after registration" });
        }
        const nutrition = await NutritionService.calculateNutrition(Number(newUser?.id));

        if (!newUser) {
            return res.status(400).json({
                message: "Registration Failed"
            })
        }
        delete (newUser as any).password;
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            nutrition,
        })

    } catch (error: any) {
        console.error(error);
        if (error.status) {
            return res.status(error.status).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}