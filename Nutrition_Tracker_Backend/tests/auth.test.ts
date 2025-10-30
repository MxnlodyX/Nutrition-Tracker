import pool from "../src/utils/db";
import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);


describe("Auth API", () => {
    it("should register a new user", async () => {
        await pool.query("DELETE FROM userinformation WHERE email = 'jestTest@example.com'");
        const email = 'jestTest@example.com';
        const res = await request.post("/api/register").send({
            firstname: "Test",
            lastname: "User",
            email,
            password: "123456",
            gender: "male",
            weight: 70,
            height: 175,
            birthday: "2000-01-01",
            activity: "light",
        });
        expect(res.statusCode).toBe(201);
    });
    it("should reject duplicate email", async () => {
        const email = `jestTest@example.com`;
        const res = await request.post("/auth/register").send({
            email: email,
            password: "123456",
        });
        expect(res.statusCode).toBe(404);
    });
    it("should login successfully", async () => {
        const email = `jestTest@example.com`;
        await request.post("/api/register").send({
            firstname: "Test",
            lastname: "User",
            email,
            password: "123456",
            gender: "male",
            weight: 70,
            height: 175,
            birthday: "2000-01-01",
            activity: "light",
        });
        const res = await request.post("/api/auth/login").send({
            email,
            password: "123456",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("accessToken");
    });
});
