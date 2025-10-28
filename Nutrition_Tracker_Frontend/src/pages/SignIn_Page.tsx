import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as types from "../types/type"
import { login } from "../service/authService"
import { toast } from "react-toastify";

export default function SignInPage() {
    const [loginData, setLoginData] = useState<types.LoginData>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await login(loginData.email, loginData.password)
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            navigate('/nutritionTrack')
            toast.success("🎉 เข้าสู่ระบบสำเร็จ!");

        } catch (error: any) {
            toast.error(error.response?.data?.message || "❌ เข้าสู่ระบบไม่สำเร็จ");
        }
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                <span className="text-green-600">Nutrition</span>
                                <span className="text-cyan-500">Tracker</span>
                            </h1>
                            <p className="text-gray-500">ติดตามโภชนาการ เพื่อสุขภาพที่ดีของคุณ</p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">เข้าสู่ระบบ</h2>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล</label>
                                <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่าน</label>
                                <input className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                            </div>
                            <button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                                onClick={handleLogin}>
                                เข้าสู่ระบบ
                            </button>
                            <div className="text-center pt-4">
                                <span className="text-gray-600">ยังไม่มีบัญชี? </span>
                                <Link to="/register" className="text-green-600 font-semibold hover:underline">
                                    สมัครสมาชิก
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}