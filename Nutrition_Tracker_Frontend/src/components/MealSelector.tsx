import { useState } from "react";

export default function MealSelector({ onSelect }: { onSelect: (meal: string) => void }) {
    const [selectedMeal, setSelectedMeal] = useState("BreakFast");
    const meals = ["BreakFast", "Lunch", "Dinner", "Additional"];

    return (
        <div className="flex flex-wrap justify-between gap-3 mt-4">
            {meals.map((meal) => (
                <button
                    key={meal}
                    onClick={() => {
                        setSelectedMeal(meal);
                        onSelect(meal);
                    }}
                    className={`flex-1 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md 
          ${selectedMeal === meal
                            ? "bg-gray-700 text-white shadow-lg scale-[1.03]"
                            : "bg-white/70 backdrop-blur-sm border-2 border-slate-200 text-slate-600 hover:border-indigo-300"
                        }`}
                >
                    {meal}
                </button>
            ))}
        </div>
    );
}
