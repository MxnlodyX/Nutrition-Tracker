import { useEffect, useState } from "react";
import { Meal } from '../types/meal'
export default function MealLog() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // 🕐 จำลองการ fetch API (delay 1.2 วินาที)
        setTimeout(() => {
            // 🔹 ทดลองเปิด / ปิดคอมเมนต์เพื่อสลับระหว่าง "มีข้อมูล" / "ไม่มีข้อมูล"

            // ✅ กรณีมีข้อมูล
            // setMeals([
            //     {
            //         id: 1,
            //         name: "ข้าวผัดไก่",
            //         calories: 550,
            //         protein: 30,
            //         carb: 65,
            //         fat: 10,
            //         mealType: "มื้อ 1",
            //     },
            //     {
            //         id: 2,
            //         name: "ข้าวต้มปลา",
            //         calories: 320,
            //         protein: 25,
            //         carb: 45,
            //         fat: 5,
            //         mealType: "มื้อ 2",
            //     },
            // ]);

            // ❌ กรณีไม่มีข้อมูล
            setMeals([]);

            setLoading(false);
        }, 1200);
    }, []);
    return (
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
            <h1 className="font-extrabold text-2xl mb-4">มื้ออาหารวันนี้</h1>

            {/* 🌀 แสดงระหว่างโหลด */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            )}

            {/* 📦 ถ้ามีข้อมูล */}
            {!loading && meals.length > 0 && (
                <div className="space-y-4">
                    {meals.map((meal) => (
                        <div
                            key={meal.id}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-semibold text-slate-800">
                                    {meal.mealType} — {meal.name}
                                </p>
                                <p className="text-slate-500 text-sm">
                                    🔥 {meal.calories} kcal · 💪 {meal.protein}g · 🌾 {meal.carb}g · 🥑 {meal.fat}g
                                </p>
                            </div>
                            <button className="text-red-400 hover:text-red-600 transition">ลบ</button>
                        </div>
                    ))}
                </div>
            )}

            {/* 🚫 ถ้าไม่มีข้อมูล */}
            {!loading && meals.length === 0 && (
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
        </div>
    )
}