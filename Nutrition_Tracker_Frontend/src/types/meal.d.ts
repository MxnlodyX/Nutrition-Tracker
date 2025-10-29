export interface Meal {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carb: number;
    fat: number;
    mealType: string;
}

export interface MealToday {
    id: number;
    user_id: number;
    meal_type: string;
    food_name: string;
    calories: number;
    protein: number;
    carb: number;
    fat: number;
    created_at: string;
}
