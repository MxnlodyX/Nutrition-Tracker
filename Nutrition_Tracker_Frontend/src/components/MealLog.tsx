import { useEffect, useState } from "react";
import { MealToday } from '../types/meal';
import Swal from "sweetalert2";
import { deleteMealToday } from "../service/mealService";

interface MealLogProps {
    meals: MealToday[];
    onDeleted?: () => void;
}

export default function MealLog({ meals, onDeleted }: MealLogProps) {
    const [displayMeals, setDisplayMeals] = useState<MealToday[]>([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = async (mealId: number) => {
        const confirm = await Swal.fire({
            title: "ยืนยันการลบ?",
            text: "คุณต้องการลบมื้ออาหารนี้หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ลบเลย",
            cancelButtonText: "ยกเลิก",
            confirmButtonColor: "#e11d48",
        });

        if (!confirm.isConfirmed) return;

        try {
            await deleteMealToday(mealId);
            onDeleted?.(); // ✅ reload หน้า
            console.log("✅ onDeleted called");
            await Swal.fire({
                title: "ลบสำเร็จ!",
                text: "มื้ออาหารถูกลบออกเรียบร้อยแล้ว 🍽️",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });


        } catch (error: any) {
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบมื้อนี้ได้", "error");
            console.error("❌ Failed to delete meal:", error);
        }
    };
    useEffect(() => {
        // 🕐 จำลอง delay การโหลดข้อมูล
        setTimeout(() => {
            setDisplayMeals(meals || []);
            setLoading(false);
        }, 800);
    }, [meals]);

    return (
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
            <h1 className="font-extrabold text-2xl mb-4">มื้ออาหารวันนี้</h1>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            )}

            {!loading && displayMeals.length > 0 && (
                <div className="space-y-4">
                    {displayMeals.map((meal) => (
                        <div
                            key={meal.id}
                            className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md rounded-2xl p-5 flex justify-between items-center shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
                        >
                            <div className="w-[80%] flex flex-col bg-gradie nt-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-5">
                                    <p className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        <span className="tracking-wide">{meal.meal_type.toUpperCase()}</span>
                                    </p>
                                    <p className="text-indigo-600 font-semibold text-base truncate max-w-[180px]">
                                        {meal.food_name}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm font-medium text-slate-600">
                                    <span className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                                         <span className="text-orange-600">{meal.calories} kcal</span>
                                    </span>
                                    <span className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                        โปรตีน <span className="text-green-600">{meal.protein}g</span>
                                    </span>
                                    <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                        คาร์บ <span className="text-yellow-600">{meal.carb}g</span>
                                    </span>
                                    <span className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100">
                                        ไขมัน <span className="text-purple-600">{meal.fat}g</span>
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(meal.id)} // ✅ เพิ่ม onClick

                                className="cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                                ลบ
                            </button>
                        </div>
                    ))}
                </div>
            )}


            {!loading && displayMeals.length === 0 && (
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
    );
}
