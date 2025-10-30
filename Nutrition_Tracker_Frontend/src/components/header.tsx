import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/authService";
import { toast } from "react-toastify";
import { User } from "lucide-react"; // 👈 ใช้ icon จาก lucide-react

type TabKey = "today" | "target" | "history";

interface NutritionHeaderProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
}

export default function NutritionHeader({ activeTab, onTabChange }: NutritionHeaderProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const tabClass = (tab: TabKey) =>
        `flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg cursor-pointer ${activeTab === tab
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105"
            : "bg-slate-200 text-gray-600 hover:bg-slate-300"
        }`;

    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);
        const refreshToken = localStorage.getItem('refreshToken')
        try {
            await logout(refreshToken);
            toast.success("ออกจากระบบเรียบร้อย");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            toast.error("ออกจากระบบไม่สำเร็จ");
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
        }
    };

    // ปิด dropdown เมื่อคลิกนอกกล่อง
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-sparkles text-white"
                            >
                                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                                <path d="M20 3v4"></path>
                                <path d="M22 5h-4"></path>
                                <path d="M4 17v2"></path>
                                <path d="M5 18H3"></path>
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            NutriTracker
                        </h1>
                    </div>

                    {/* Avatar + Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-10 h-10 bg-slate-200 hover:bg-slate-300 text-gray-700 rounded-full flex items-center justify-center transition-all shadow-md"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
                                    disabled={loading}
                                >
                                    {loading ? "Logging out..." : "Logout"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-normal text-gray-600">ติดตามสุขภาพของคุณทุกวัน</p>

                <div className="mt-8 flex gap-5 bg-slate-100/50 p-1.5 rounded-2xl">
                    <button onClick={() => onTabChange("today")} className={tabClass("today")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
                        Today
                    </button>
                    <button onClick={() => onTabChange("target")} className={tabClass("target")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        Target
                    </button>
                    <button onClick={() => onTabChange("history")} className={tabClass("history")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
                        History
                    </button>
                </div>
            </div>
        </div>
    );
}
