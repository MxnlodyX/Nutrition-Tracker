import { useEffect, useState } from "react";
import { getUserMeal } from "../service/mealService";

export default function History() {
    const [displayMeals, setDisplayMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "Asia/Bangkok",
        });
        setSelectedDate(today);
    }, []);
    useEffect(() => {
        if (!userId || !selectedDate) return;
        const fetchMeals = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUserMeal(Number(userId), selectedDate);
                setDisplayMeals(data || []);
            } catch (err: any) {
                console.error("❌ Fetch history error:", err);
                setError("ไม่สามารถโหลดข้อมูลได้");
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, [selectedDate, userId]);
    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r font-black">
                        ประวัติการทานอาหาร
                    </h3>
                    <div className="flex items-center gap-3">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-2 border border-indigo-400 rounded-xl shadow-md text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>
                {loading && (
                    <div className="text-center text-gray-500 py-8 animate-pulse">
                        กำลังโหลดข้อมูล...
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 py-8">
                        {error}
                    </div>
                )}
                {!loading && displayMeals.length === 0 && !error && (
                    <div className="flex flex-col justify-center items-center py-10">
                        <div className="inline-block p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl mb-4">
                            <svg
                                className="w-10 h-10 text-slate-400 animate-pulse"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 12h4l2 5 4-10 2 5h4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-normal text-gray-600 text-center">
                            ยังไม่มีข้อมูลมื้ออาหารของวันนี้<br />อย่าลืมทานข้าวนะสุดหล่อ 🍚
                        </h2>
                    </div>
                )}
                {!loading && displayMeals.length > 0 && (
                    <div className="space-y-4">
                        {displayMeals.map((meal, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {meal.food_name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {meal.calories} kcal • โปรตีน {meal.protein}g • คาร์บ{" "}
                                        {meal.carb}g • ไขมัน {meal.fat}g
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-indigo-600">
                                    {meal.meal_type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
