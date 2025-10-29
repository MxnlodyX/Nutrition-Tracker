import pool from "../utils/db";
import { Meal } from "../model/mealModel";

export const addMeal = async (meal: Meal) => {
    const { userId, mealType, foodName, calories, protein, carb, fat } = meal;
    const result = await pool.query(
        `INSERT INTO meals (user_id, meal_type, food_name, calories, protein, carb, fat)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [userId, mealType, foodName, calories, protein, carb, fat]
    );
    return result.rows[0];
};

export const getMealsToday = async (userId: number) => {
    const result = await pool.query(
        `SELECT * FROM meals
        WHERE user_id = $1
        AND DATE(created_at) = CURRENT_DATE
        ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};
export const getAllMeals = async (userId: number) => {
    const result = await pool.query(
        `SELECT * FROM meals
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};

export const getMealsByDate = async (userId: number, date: string) => {
    const result = await pool.query(
        `SELECT * FROM meals
         WHERE user_id = $1
           AND DATE(created_at) = $2
         ORDER BY created_at DESC`,
        [userId, date]
    );
    return result.rows;
};
export const deleteMealToday = async (mealId: number) => {
    const result = await pool.query(
        `DELETE FROM meals WHERE id = $1 RETURNING *`,
        [mealId]
    );

    if (result.rows.length === 0) {
        throw { status: 404, message: "Meal not found" };
    }

    return result.rows[0]; // ✅ ส่งข้อมูลมื้อที่ถูกลบกลับ
};
