import { Flame, Beef, Wheat, Droplet } from "lucide-react";
import { useState } from "react";

export default function UserTarget({ nutrition, onSave }: any) {
    const [editForm, setEditForm] = useState(false);
    const [formData, setFormData] = useState({
        tdee: nutrition?.tdee || "",
        protein: nutrition?.protein || "",
        carb: nutrition?.carb || "",
        fat: nutrition?.fat || "",
    });

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
    ]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleCancel = async () => {
        setEditForm(false);
    };
    const handleSave = async () => {
        if (onSave) await onSave(formData);
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
                    <div className="flex justify-end mt-6 gap-2">
                        <div className="flex justify-end mt-6 gap-4">
                            {/* ปุ่มยกเลิก */}
                            <button
                                onClick={handleCancel}
                                className="relative group px-6 py-3 font-bold rounded-2xl text-white shadow-lg overflow-hidden transition-all duration-300
               bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:shadow-2xl hover:scale-[1.03] active:scale-95"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 via-red-600 to-pink-700 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    ยกเลิก
                                </span>
                            </button>

                            {/* ปุ่มบันทึก */}
                            <button
                                onClick={handleSave}
                                className="relative group px-6 py-3 font-bold rounded-2xl text-white shadow-lg overflow-hidden transition-all duration-300
                                bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:shadow-2xl hover:scale-[1.03] active:scale-95"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    บันทึกเป้าหมาย
                                </span>
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
