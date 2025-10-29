import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import StepIndicator from "../components/StepIndicator";
import  useRegistrationForm  from "../hook/useRegistrationForm";
import { registerUser } from "../service/registrationService";

export default function RegistrationPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const { formData, errors, handleChange, validateStep } = useRegistrationForm();

    const handleNext = async () => {
        const validationErrors = validateStep(currentStep);
        if (validationErrors) return;

        if (currentStep === 3) {
            try {
                await registerUser(formData);
                setCurrentStep(4);
            } catch (error) {
                console.error("Registration failed:", error);
                // Optionally, set an error state to display a message to the user
            }
            return;
        }

        setCurrentStep(currentStep + 1);

    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen p-5 flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-green-700">
                Nutrition<span className="text-cyan-600">Tracker</span>
            </h1>
            <p className="text-gray-500 mt-4 opacity-70 mb-6">
                ติดตามโภชนาการ เพื่อสุขภาพที่ดีของคุณ
            </p>

            <div className="w-full max-w-3xl shadow-lg rounded-2xl overflow-hidden bg-white">
                <StepIndicator currentStep={currentStep} />

                <div className="p-8 bg-white">
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                        <>
                            <h2 className="text-xl font-semibold text-green-700 mb-4">
                                ข้อมูลส่วนตัว
                            </h2>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        ชื่อ
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                    {errors.firstname && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        นามสกุล
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                    {errors.lastname && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                                    )}
                                </div>

                                <div className="flex gap-5">
                                    <div className="flex flex-col w-full">
                                        <label className="block font-semibold text-gray-700 text-sm mb-2">
                                            เพศ
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                        >
                                            <option value="" disabled hidden>
                                                เลือกเพศ
                                            </option>
                                            <option value="male">ชาย</option>
                                            <option value="female">หญิง</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <label className="block font-semibold text-gray-700 text-sm mb-2">
                                            วันเกิด
                                        </label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            value={formData.birthday}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                        />
                                        {errors.birthday && (
                                            <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                                        )}
                                    </div>
                                </div>
                            </form>

                            <div className="w-full flex justify-end mt-5">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-28 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all cursor-pointer"
                                >
                                    ถัดไป
                                </button>
                            </div>

                            <div className="flex justify-center mt-4">
                                <p>
                                    มีบัญชีอยู่แล้ว?{" "}
                                    <Link
                                        to="/login"
                                        className="text-blue-400 font-medium cursor-pointer"
                                    >
                                        เข้าสู่ระบบ
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                        <>
                            <h2 className="text-xl font-semibold text-green-700 mb-4">
                                ข้อมูลบัญชี
                            </h2>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </form>

                            <div className="w-full flex justify-between mt-6">
                                <button
                                    onClick={handlePrev}
                                    className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-all cursor-pointer"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all cursor-pointer"
                                >
                                    ถัดไป
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                        <>
                            <h2 className="text-xl font-semibold text-green-700 mb-4">
                                ข้อมูลสุขภาพ
                            </h2>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex gap-5">
                                    <div className="flex flex-col w-full">
                                        <label className="block font-semibold text-gray-700 text-sm mb-2">
                                            น้ำหนัก (กก.)
                                        </label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                        />
                                        {errors.weight && (
                                            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <label className="block font-semibold text-gray-700 text-sm mb-2">
                                            ส่วนสูง (ซม.)
                                        </label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                        />
                                        {errors.height && (
                                            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-700 text-sm mb-2">
                                        กิจกรรมประจำวัน (Activity Level)
                                    </label>
                                    <select
                                        name="activity"
                                        value={formData.activity}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
                                    >
                                        <option value="" disabled hidden>
                                            เลือกกิจกรรม
                                        </option>
                                        <option value="none">ไม่ออกกำลังกายเลย</option>
                                        <option value="light">ออกกำลังกาย 1-2 ครั้ง/สัปดาห์</option>
                                        <option value="medium">ออกกำลังกาย 3-5 ครั้ง/สัปดาห์</option>
                                        <option value="heavy">ออกกำลังกายหนักทุกวัน</option>
                                    </select>
                                    {errors.activity && (
                                        <p className="text-red-500 text-sm mt-1">{errors.activity}</p>
                                    )}
                                </div>
                            </form>

                            <div className="w-full flex justify-between mt-6">
                                <button
                                    onClick={handlePrev}
                                    className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-all cursor-pointer"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all cursor-pointer"
                                >
                                    ถัดไป
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                        <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                            <CheckCircleIcon className="h-20 w-20 text-green-500" />
                            <h2 className="text-2xl font-bold text-green-700">
                                สมัครสมาชิกสำเร็จ!
                            </h2>
                            <p className="text-gray-500">ยินดีต้อนรับสู่ Nutrition Tracker 🎉</p>
                            <Link
                                to="/"
                                className="mt-5 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-all"
                            >
                                ไปที่หน้าเข้าสู่ระบบ
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}