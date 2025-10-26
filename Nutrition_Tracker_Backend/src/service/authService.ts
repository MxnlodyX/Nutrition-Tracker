import bcrypt from "bcrypt"
import pool from "../utils/db"
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/jwt"

export const login = async (email: string, password: string) => {
    const client = await pool.connect()
    try {
        const r = await client.query("SELECT * FROM userinformation WHERE email=$1", [email]);
        const user = r.rows[0];
        if (!user) throw { status: 404, message: "user not found" };

        const match = await bcrypt.compare(password, user.password);

        if (!match) throw { status: 401, message: "Invalid password" };

        const { accessToken, refreshToken } = generateToken(user.user_id);

        await client.query(
            "INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)",
            [user.user_id, refreshToken]
        )
        return { user: { id: user.user_id, email: user.email }, accessToken, refreshToken }
    } finally {
        client.release()
    }
}

export const refresh = async (refreshToken: string) => {
    const client = await pool.connect()
    try {
        const found = await client.query("SELECt * FROm user_tokens WHERE token=$1", [refreshToken]);
        if (!found.rows[0]) throw { status: 403, message: "Invalid refresh token" };
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: number }
        const { accessToken, refreshToken: newRefresh } = generateToken(decoded.id);
        await client.query("DELETE FROM user_tokens WHERE token=$1", [refreshToken]);
        await client.query("INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)", [
            decoded.id,
            newRefresh,
        ]);
        return { accessToken, refreshToken: newRefresh };
    } finally {
        client.release();
    }
}

export const logout = async (refreshToken: string) => {
    const client = await pool.connect()
    try {
        await client.query("DELETE FROM user_tokens WHERe token=$1", [refreshToken])
    } finally {
        client.release()
    }
}
export const profile = async (userId: number) => {
    const client = await pool.connect()
    try {
        const result = await client.query(
            "SELECT firstname, lastname, gender, birthday, email, weight, height, activity FROM userinformation WHERE user_id = $1",
            [userId]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];

    } finally {
        client.release()
    }
}