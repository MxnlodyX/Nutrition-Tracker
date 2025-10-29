import api from "../utils/api";
import { NutritionUserData } from "../types/type";

export const getNutritionInfo = async (userId: number) => {
    const res = await api.get(`/nutrition/latest/${userId}`);
    return res.data;
};

export const updateNutritionInfo = async (data: NutritionUserData) => { 
    const res = await api.put("/nutrition/update", data);
    return res.data;
}