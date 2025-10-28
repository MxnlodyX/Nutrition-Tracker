import pool from "../utils/db";
import UserInformation from "../model/registrationModel"
import bcrypt from "bcrypt";
export const getClient = async () => {
    return await pool.connect(); // ✅ คืน client เพื่อใช้ transaction
};

export const registrationAccount = async (user: UserInformation) => {
    const client = await pool.connect()
    try {
        if (!user) {
            throw { status: 400, message: "No data received" };
        }
        const checkEmail = await client.query(`SELECT email FROM userinformation WHERE email = $1`, [user.email])
        if (checkEmail.rows.length > 0) {
            throw { status: 400, message: "Email already registered" };
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await client.query(
            `INSERT INTO userinformation 
        (firstname, lastname, gender, birthday, email, password, weight, height, activity) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) 
        RETURNING *`,
            [
                user.firstname,
                user.lastname,
                user.gender,
                user.birthday,
                user.email,
                hashedPassword,
                user.weight,
                user.height,
                user.activity,
            ]
        );
        if (result.rows.length > 0) {
            const newUser = new UserInformation(result.rows[0]);
            delete (newUser as any).password;
            return newUser;
        }
    } catch (error: any) {
        throw error
    }
    finally {
        client.release()
    }
}