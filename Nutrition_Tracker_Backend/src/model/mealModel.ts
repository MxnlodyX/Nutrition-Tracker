export interface Meal {
    id?: number;
    userId: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    foodName: string;
    calories: number;
    protein: number;
    carb: number;
    fat: number;
    createdAt?: Date;
}