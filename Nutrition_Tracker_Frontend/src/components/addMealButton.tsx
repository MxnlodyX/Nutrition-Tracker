import { useState } from "react";
import NewMealForm from "./MealForm"

interface MealButtonProps {
    onAdded?: () => void; 
}
export default function MealButton({ onAdded }:MealButtonProps ) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* 🔘 ปุ่มเพิ่มมื้ออาหาร */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer relative w-full bg-indigo-400 text-white py-5 rounded-3xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                เพิ่มมื้ออาหาร
            </button>
            {isOpen && (
                <NewMealForm onAdded={onAdded} onClose={() => setIsOpen(false)} />

            )}
        </>
    );
}
