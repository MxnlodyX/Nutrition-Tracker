export interface NutritionInput {
  gender: "male" | "female";
  weight: number; // kg
  height: number; // cm
  age: number; // years
  activity: "none" | "light" | "moderate" | "daily";
}