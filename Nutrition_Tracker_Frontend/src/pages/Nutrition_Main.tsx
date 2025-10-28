import NutritionHeader from "../components/header";
import NutritionCard from "../components/nutritionCard";
import MealButton from "../components/addMealButton"
import MealLog from "../components/MealLog"

export default function NutritionMainPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <NutritionHeader />
            <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <NutritionCard title="Calories" current={0} goal={2000} color="orange" icon="flame" />
                <NutritionCard title="Protein" current={0} goal={150} color="green" icon="beaf" />
                <NutritionCard title="Carb" current={0} goal={250} color="blue" icon="wheat" />
                <NutritionCard title="Fat" current={0} goal={65} color="purple" icon="drop" />
            </div>
            <div className="max-w-6xl mx-auto mt-8">
                <MealButton />
            </div>
            <div className="max-w-6xl mx-auto mt-8">
                <MealLog/>
            </div>
        </div>
    );
}
