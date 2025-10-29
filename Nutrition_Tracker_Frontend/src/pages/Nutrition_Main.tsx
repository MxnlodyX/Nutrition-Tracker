import { useEffect, useState } from "react";
import NutritionHeader from "../components/header";
import NutritionCard from "../components/NutritionCard";
import MealButton from "../components/addMealButton";
import MealLog from "../components/MealLog";
import UserTarget from "../components/userTarget";
import { getProfile } from "../service/authService";
import { getNutritionInfo } from "../service/nutritionService";
import { getMealToday } from "../service/mealService";
import { MealToday } from "../types/meal";

export default function NutritionMainPage() {
    const [profile, setProfile] = useState<any>(null);
    const [nutrition, setNutrition] = useState<any>(null);
    const [mealToday, setMealToday] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<"today" | "target">("today");

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const [profileData, nutritionData, mealTodayData] = await Promise.all([
                getProfile(),
                getNutritionInfo(Number(userId)),
                getMealToday(Number(userId)).catch(() => []),
            ]);

            setProfile(profileData || null);
            setNutrition(nutritionData || null);
            setMealToday(mealTodayData || []);

        } catch (error) {
            console.error("❌ Failed to fetch profile or nutrition:", error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);
    const totals = mealToday.reduce(
        (acc: any, meal: MealToday) => ({
            calories: acc.calories + Number(meal.calories || 0),
            protein: acc.protein + Number(meal.protein || 0),
            carb: acc.carb + Number(meal.carb || 0),
            fat: acc.fat + Number(meal.fat || 0),
        }),
        { calories: 0, protein: 0, carb: 0, fat: 0 }
    );
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <NutritionHeader activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "today" && (
                <div>
                    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <NutritionCard title="Calories" current={totals.calories} goal={nutrition?.tdee} color="orange" icon="flame" />
                        <NutritionCard title="Protein" current={totals.protein} goal={nutrition?.protein} color="green" icon="beaf" />
                        <NutritionCard title="Carb" current={totals.carb} goal={nutrition?.carb} color="blue" icon="wheat" />
                        <NutritionCard title="Fat" current={totals.fat} goal={nutrition?.fat} color="purple" icon="drop" />
                    </div>
                    <div className="max-w-6xl mx-auto mt-8">
                        <MealButton onAdded={fetchData} />
                    </div>
                    <div className="max-w-6xl mx-auto mt-8">
                        <MealLog meals={mealToday} onDeleted={fetchData} />
                    </div>
                </div>
            )}
            {activeTab === "target" && (
                <div>
                    <UserTarget nutrition={nutrition} fetchData={fetchData} />
                </div>
            )}

        </div>
    );
}
