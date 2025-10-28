import { useEffect, useState } from "react";
import { Flame, Beef, Wheat, Droplet } from "lucide-react";

interface NutritionCardProps {
    title: string;
    current: number;
    goal: number;
    color: "orange" | "blue" | "green" | "purple";
    icon?: "flame" | "beaf" | "drop" | "wheat";
}

export default function NutritionCard({ title, current, goal, color, icon }: NutritionCardProps) {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const progress = Math.min((current / goal) * 100, 100);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimatedProgress(progress), 300);
        return () => clearTimeout(timeout);
    }, [progress]);

    const gradientMap = {
        orange: "from-orange-500 via-red-500 to-pink-600",
        blue: "from-sky-500 via-blue-500 to-indigo-600",
        green: "from-lime-500 via-emerald-500 to-green-600",
        purple: "from-violet-500 via-purple-500 to-fuchsia-600",
    };

    const iconMap = {
        flame: <Flame className="w-5 h-5 text-white" strokeWidth={2.5} />,
        beaf: <Beef className="w-5 h-5 text-white" strokeWidth={2.5} />,
        drop: <Droplet className="w-5 h-5 text-white" strokeWidth={2.5} />,
        wheat: <Wheat className="w-5 h-5 text-white" strokeWidth={2.5} />,
    };

    return (
        <div className="group relative">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradientMap[color]} shadow-lg`}>
                        {icon && iconMap[icon]}
                    </div>
                    <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientMap[color]} shadow-md`}>
                        <span className="text-white text-xs font-bold">{Math.round(animatedProgress)}%</span>
                    </div>
                </div>

                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">{title}</div>

                <div className="flex items-center gap-2">
                    <span className="font-black tracking-tight text-xl font-bold uppercase mb-2">{current}</span>
                    <span>/</span>
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">{goal}</span>
                </div>

                <div className="relative h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
                    <div
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${gradientMap[color]} rounded-full transition-[width] duration-700 ease-out shadow-lg`}
                        style={{ width: `${animatedProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
