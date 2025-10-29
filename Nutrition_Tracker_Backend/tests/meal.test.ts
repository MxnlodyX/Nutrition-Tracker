import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);

describe("Meal API (with Auth)", () => {
    let createdId: number;
    let token: string;
    const userId = 1

    // ✅ login ก่อนรัน test ทั้งหมด
    beforeAll(async () => {
        const res = await request.post("/api/auth/login").send({
            email: "Manlody@example.com",
            password: "123456",
        });
        token = res.body.accessToken;
    });

    it("should add a new meal", async () => {
        const res = await request
            .post("/api/meals")
            .set("Authorization", `Bearer ${token}`) // ✅ แนบ token
            .send({
                userId,
                mealType: "lunch",
                foodName: "ข้าวผัดเจสท์",
                calories: 500,
                protein: 30,
                carb: 60,
                fat: 15,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toMatch(/Meal added successfully/i);
        createdId = res.body.meal.id;
    });

    it("should get meals for user", async () => {
        const res = await request
            .get(`/api/meals/getmeal/${userId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should delete a meal", async () => {
        const res = await request
            .delete(`/api/meals/delete/${createdId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});
