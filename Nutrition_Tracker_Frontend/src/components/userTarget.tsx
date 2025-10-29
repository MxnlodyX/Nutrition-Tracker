import { Flame, Beef, Wheat, Droplet } from "lucide-react";
import { useState } from "react";
import { updateNutritionInfo, getNutritionInfo } from "../service/nutritionService";
import { toast } from "react-toastify";

export default function UserTarget({ nutrition, fetchData }: any) {
    const [editForm, setEditForm] = useState(false);
    const [formData, setFormData] = useState({
        tdee: nutrition?.tdee || "",
        protein: nutrition?.protein || "",
        carb: nutrition?.carb || "",
        fat: nutrition?.fat || "",
    });
    const [baseNutrition] = useState({
        tdee: nutrition?.tdee || 0,
        protein: nutrition?.protein || 0,
        carb: nutrition?.carb || 0,
        fat: nutrition?.fat || 0,
    });
    const handleResetToCalculated = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            // 🔁 ดึงค่าที่คำนวณใหม่จาก API
            const recalculated = await getNutritionInfo(Number(userId));
            console.log("🔁 recalculated from API:", recalculated);

            // ✅ ตั้งค่ากลับใน form
            setFormData({
                tdee: Number(recalculated.tdee),
                protein: Number(recalculated.protein),
                carb: Number(recalculated.carb),
                fat: Number(recalculated.fat),
            });

            toast.success("รีเซ็ตค่ากลับตามการคำนวณจากน้ำหนักและส่วนสูงแล้ว 🎯");
        } catch (error) {
            console.error("❌ Failed to reset nutrition:", error);
            toast.error("ไม่สามารถรีเซ็ตค่าได้");
        }
    };
    const handleSaveNutrition = async (formData: any) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;
            await updateNutritionInfo({
                ...formData,
                user_id: Number(userId),
            });
            fetchData();
            toast.success("🎉 Meal added successfully!");
            setEditForm(false);
        } catch (error) {
            console.error("❌ Failed to update nutrition:", error);
        }
    };

    const gradientMap = {
        orange: "from-orange-500 via-red-500 to-pink-600",
        blue: "from-sky-500 via-blue-500 to-indigo-600",
        green: "from-lime-500 via-emerald-500 to-green-600",
        purple: "from-violet-500 via-purple-500 to-fuchsia-600",
    };

    const nurtitionData = [
        { icon: <Flame className="w-5 h-5 text-white" />, label: "calories", key: "tdee", unit: "Kcal", color: gradientMap.orange },
        { icon: <Beef className="w-5 h-5 text-white" />, label: "protein", key: "protein", unit: "gram", color: gradientMap.green },
        { icon: <Wheat className="w-5 h-5 text-white" />, label: "carb", key: "carb", unit: "gram", color: gradientMap.blue },
        { icon: <Droplet className="w-5 h-5 text-white" />, label: "fat", key: "fat", unit: "gram", color: gradientMap.purple },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGoalChange = (value: string) => {
        setFormData(() => {
            const updated = { ...baseNutrition }; // 👈 ใช้ค่าต้นฉบับ
            const tdee = Number(baseNutrition.tdee);
            const protein = Number(baseNutrition.protein);
            const carb = Number(baseNutrition.carb);
            const fat = Number(baseNutrition.fat);

            switch (value) {
                case "diet":
                    updated.tdee = Math.round(tdee * 0.85);
                    updated.protein = Math.round(protein * 1.1);
                    updated.carb = Math.round(carb * 0.9);
                    updated.fat = Math.round(fat * 0.9);
                    break;
                case "bulk":
                    updated.tdee = Math.round(tdee * 1.15);
                    updated.protein = Math.round(protein * 1.2);
                    updated.carb = Math.round(carb * 1.15);
                    updated.fat = Math.round(fat * 1.1);
                    break;
                case "lean":
                    updated.tdee = Math.round(tdee * 1.05);
                    updated.protein = Math.round(protein * 1.3);
                    updated.carb = Math.round(carb * 0.95);
                    updated.fat = Math.round(fat * 0.9);
                    break;
                case "maintain":
                    updated.tdee = tdee;
                    updated.protein = protein;
                    updated.carb = carb;
                    updated.fat = fat;
                    break;
            }
            return updated;
        });
    };


    const handleCancel = async () => {
        setEditForm(false);
    };

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        เป้าหมายรายวัน
                    </h3>
                    <button
                        onClick={() => setEditForm((prev) => !prev)}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-pen">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                            </svg>
                            แก้ไข
                        </div>
                    </button>
                </div>

                <div className="space-y-3">
                    {editForm && (
                        <div className=" flex flex-row justify-start items-center gap-3">
                            <div className="flex flex-col">
                     
                                <select
                                    onChange={(e) => handleGoalChange(e.target.value)}
                                    disabled={!editForm}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">เลือกโหมด...</option>
                                    <option value="maintain">⚖️ ปกติ (Maintain)</option>
                                    <option value="diet">🥗 Diet (ลดไขมัน)</option>
                                    <option value="bulk">🍚 Bulk (เพิ่มกล้าม)</option>
                                    <option value="lean">💪 Lean (คุมกล้าม + ลดไขมัน)</option>
                                </select>
                            </div>
                            <div className=""><button
                                onClick={handleResetToCalculated}
                                className="relative group px-6 py-2 font-bold rounded-2xl text-white shadow-lg overflow-hidden transition-all duration-300
                                bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 hover:shadow-2xl hover:scale-[1.03] active:scale-95"
                            >
                                รีเซ็ตค่าคำนวณใหม่
                            </button></div>


                        </div>

                    )}
                    {nurtitionData.map((item) => (

                        <div key={item.key} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-6">
                            <div className="flex flex-row items-center gap-3 mb-3">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color}`}>
                                    {item.icon}
                                </div>
                                <p className="text-slate-500 text-1xl font-semibold uppercase tracking-wider">{item.label}</p>
                            </div>

                            {editForm ? (

                                <input
                                    type="number"
                                    name={item.key}
                                    value={formData[item.key as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                <p className="text-2xl font-bold">
                                    {formData[item.key as keyof typeof formData]}{" "}
                                    <span className="text-gray-500 text-lg">{item.unit}</span>
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {editForm && (
                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            onClick={handleCancel}
                            className="relative group px-6 py-3 font-bold rounded-2xl text-white shadow-lg overflow-hidden transition-all duration-300
                                bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:shadow-2xl hover:scale-[1.03] active:scale-95"
                        >
                            ยกเลิก
                        </button>

                        <button
                            onClick={() => handleSaveNutrition(formData)}
                            className="relative group px-6 py-3 font-bold rounded-2xl text-white shadow-lg overflow-hidden transition-all duration-300
                                bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:shadow-2xl hover:scale-[1.03] active:scale-95"
                        >
                            บันทึกเป้าหมาย
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
