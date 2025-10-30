interface StepIndicatorProps {
    currentStep: number;
}

const steps = [
    { num: 1, title: "ข้อมูลส่วนตัว", desc: "ชื่อและข้อมูลติดต่อ" },
    { num: 2, title: "ข้อมูลบัญชี", desc: "อีเมลและรหัสผ่าน" },
    { num: 3, title: "ข้อมูลสุขภาพ", desc: "ส่วนสูง น้ำหนัก และเป้าหมาย" },
    { num: 4, title: "เสร็จสิ้น", desc: "ยืนยันการสมัครสมาชิก" }
]

export default function Stepindicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="w-full bg-gradient-to-r from-green-600 via-cyan-500 to-blue-500 p-6 text-white rounded-t-2xl">
            <div className="flex justify-between">
                {steps.map((step) => (
                    <div key={step.num} className="flex flex-col items-center text-center">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300
                ${currentStep === step.num
                                    ? "bg-white text-green-600 ring-4 ring-green-200"
                                    : "bg-white/40 text-white"
                                }`}
                        >
                            {step.num}
                        </div>
                        <p className="mt-2 text-sm font-semibold">{step.title}</p>
                        <p className="text-xs opacity-70">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}