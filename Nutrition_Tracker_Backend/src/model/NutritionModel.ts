export interface NutritionInput {
  gender: "male" | "female";
  weight: number; // kg
  height: number; // cm
  age: number; // years
  activity: "none" | "light" | "moderate" | "daily";
}

export interface NutritionUserData {
    user_id: number,
    tdee: number,
    protein: number,
    carb: number,
    fat: number
}