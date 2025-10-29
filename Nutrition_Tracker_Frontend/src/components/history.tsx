import { useState } from "react";
export default function History() {
    const [displayMeals, setDisplayMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
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
                            className="px-4 py-2 border border-indigo-400 rounded-xl shadow-md text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all" 
                        />
                    </div>
                </div>
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
        </div>
    )
}