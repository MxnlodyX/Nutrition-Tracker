import { useState } from "react";
import MealSelector from "./MealSelector"; // ✅ ตรวจชื่อไฟล์ให้ตรง

interface NewMealFormProps {
    onClose: () => void;
}

export default function NewMealForm({ onClose }: NewMealFormProps) {
    const [mealType, setMealType] = useState("มื้อ 1");

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-2xl animate-fadeIn relative">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6">🍽️ เพิ่มมื้ออาหาร</h2>

                {/* ✅ ตัวเลือกมื้อ */}
                <MealSelector onSelect={(meal) => setMealType(meal)} />

                {/* ✅ ช่องกรอกชื่ออาหาร */}
                <div className="flex flex-col gap-2 mt-6">
                    <label
                        htmlFor="foodName"
                        className="text-slate-700 font-semibold text-sm tracking-wide"
                    >
                        📝 ชื่ออาหาร
                    </label>
                    <input
                        id="foodName"
                        type="text"
                        placeholder="เช่น ข้าวผัดไก่"
                        className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                    />
                </div>

                {/* ✅ โภชนาการ */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="text-slate-700 font-semibold text-sm tracking-wide">
                            🔥 Kcal
                        </label>
                        <input
                            type="number"
                            placeholder="500"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 
              focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>

                    <div>
                        <label className="text-slate-700 font-semibold text-sm tracking-wide">
                            💪 Protein (g)
                        </label>
                        <input
                            type="number"
                            placeholder="35"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 
              focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>

                    <div>
                        <label className="text-slate-700 font-semibold text-sm tracking-wide">
                            🌾 Carb (g)
                        </label>
                        <input
                            type="number"
                            placeholder="60"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 
              focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>

                    <div>
                        <label className="text-slate-700 font-semibold text-sm tracking-wide">
                            🥑 Fat (g)
                        </label>
                        <input
                            type="number"
                            placeholder="15"
                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 
              focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>
                </div>

                {/* ✅ ปุ่ม */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-200 rounded-xl hover:bg-slate-300 transition font-medium"
                    >
                        ยกเลิก
                    </button>
                    <button
                        className="px-6 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition font-medium"
                    >
                        บันทึก
                    </button>
                </div>

                {/* ❌ ปุ่มปิดมุมขวา */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
