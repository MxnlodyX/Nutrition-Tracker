import { NutritionInput } from "../model/NutritionModel";
import pool from "../utils/db";

const activityFactor: Record<NutritionInput["activity"], number> = {
    none: 1.2,
    light: 1.375,
    moderate: 1.55,
    daily: 1.725,
};
type ActivityLevel = keyof typeof activityFactor;
const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};
export const calculateNutrition = async (userId: number) => {
    const userResult = await pool.query(
        "SELECT gender, weight, height, birthday, activity FROM userinformation WHERE id = $1",
        [userId]
    );
    const user = userResult.rows[0];
    if (!user) throw new Error("User not found");
    const age = calculateAge(user.birthday);
    const bmr =
        user.gender === "male"
            ? 10 * user.weight + 6.25 * user.height - 5 * age + 5
            : 10 * user.weight + 6.25 * user.height - 5 * age - 161;
    const tdee = bmr * activityFactor[user.activity as ActivityLevel];
    const protein = (tdee * 0.25) / 4;
    const carb = (tdee * 0.5) / 4;
    const fat = (tdee * 0.25) / 9;
    const result = await pool.query(
        `INSERT INTO nutrition_calculation (user_id, bmr, tdee, protein, carb, fat)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [userId, bmr, tdee, protein, carb, fat]
    );
    return result.rows[0];
}
export const getLatestNutrition = async (userId: number) => {
    const result = await pool.query(
        `SELECT * FROM nutrition_calculation 
     WHERE user_id = $1 
     ORDER BY created_at DESC 
     LIMIT 1`,
        [userId]
    );
    return result.rows[0];
};