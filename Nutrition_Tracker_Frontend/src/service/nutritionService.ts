import api from "../utils/api";

export const getNutritionInfo = async (userId: number) => {
    const res = await api.get(`/nutrition/latest/${userId}`);
    return res.data;
};