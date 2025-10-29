import api from "../utils/api";
import { Meal } from "../../../Nutrition_Tracker_Backend/src/model/mealModel";

export const addMeal = async (mealData: Omit<Meal, 'id' | 'createdAt'>) => {
    const response = await api.post("/meals", mealData);
    return response.data;
};
export const getMealToday = async (userId: Number) => {
    const response = await api.get(`/meals/today/${userId}`)
    return response.data
}
export const getUserMeal = async (userId: Number, date?: string) => {
    const q = date ? `?date=${date}` : "";
    const response = await api.get(`/meals/getmeal/${userId}${q}`);
    return response.data;
}
export const deleteMealToday = async (mealId: Number) => {
    const response = await api.delete(`/meals/delete/${mealId}`)
    return response.data
}