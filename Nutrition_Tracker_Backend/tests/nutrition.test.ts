import pool from "../src/utils/db";
import { calculateNutrition } from "../src/service/nutritionService";

describe("Nutrition Calculation", () => {
    let userMaleId: number;
    let userFemaleId: number;

    beforeAll(async () => {
        // ✅ เตรียม user ตัวอย่างใน DB
        const male = await pool.query(
            `INSERT INTO userinformation (firstname, lastname, gender, weight, height, birthday, activity, email, password)
       VALUES ('Test', 'Male', 'male', 70, 175, '2000-01-01', 'light', 'nutri_male@example.com', '123456')
       RETURNING id`
        );
        userMaleId = male.rows[0].id;

        const female = await pool.query(
            `INSERT INTO userinformation (firstname, lastname, gender, weight, height, birthday, activity, email, password)
       VALUES ('Test', 'Female', 'female', 70, 175, '2000-01-01', 'light', 'nutri_female@example.com', '123456')
       RETURNING id`
        );
        userFemaleId = female.rows[0].id;
    });

    afterAll(async () => {
        // ✅ ล้างข้อมูล test ออก
        await pool.query("DELETE FROM nutrition_calculation WHERE user_id IN ($1, $2)", [userMaleId, userFemaleId]);
        await pool.query("DELETE FROM userinformation WHERE id IN ($1, $2)", [userMaleId, userFemaleId]);
        await pool.end();
    });

    it("should calculate correct BMR/TDEE for male", async () => {
        const result = await calculateNutrition(userMaleId);
        const bmr = Number(result.bmr);
        const tdee = Number(result.tdee);

        expect(bmr).toBeGreaterThan(1000);
        expect(tdee).toBeGreaterThan(bmr);
        expect(Number(result.protein)).toBeGreaterThan(0);
        expect(Number(result.carb)).toBeGreaterThan(0);
        expect(Number(result.fat)).toBeGreaterThan(0);
    });

    it("should calculate lower BMR for female", async () => {
        const maleResult = await calculateNutrition(userMaleId);
        const femaleResult = await calculateNutrition(userFemaleId);
        expect(Number(femaleResult.bmr)).toBeLessThan(Number(maleResult.bmr));
    });

    it("should throw error if user not found", async () => {
        await expect(calculateNutrition(999999)).rejects.toThrow("User not found");
    });
});
