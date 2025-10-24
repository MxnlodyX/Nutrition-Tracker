import { useState } from "react";

export default function useRegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        email: "",
        password: "",
        confirmPassword: "",
        weight: "",
        height: "",
        activity: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateStep = (step: number): Record<string, string> | null => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.firstName) newErrors.firstName = "กรุณากรอกชื่อ";
            if (!formData.lastName) newErrors.lastName = "กรุณากรอกนามสกุล";
            if (!formData.gender) newErrors.gender = "กรุณาเลือกเพศ";
            if (!formData.birthday) newErrors.birthday = "กรุณาเลือกวันเกิด";
        }

        if (step === 2) {
            if (!formData.email) newErrors.email = "กรุณากรอกอีเมล";
            else if (!/\S+@\S+\.\S+/.test(formData.email))
                newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";

            if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
            if (!formData.confirmPassword)
                newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
            if (
                formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
            )
                newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }

        if (step === 3) {
            if (!formData.weight) newErrors.weight = "กรุณากรอกน้ำหนัก";
            if (!formData.height) newErrors.height = "กรุณากรอกส่วนสูง";
            if (!formData.activity) newErrors.activity = "กรุณาเลือกกิจกรรม";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length > 0 ? newErrors : null;
    };

    return { formData, errors, handleChange, validateStep };
}
