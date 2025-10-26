import jwt, { SignOptions, Secret } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const ACCESS_EXPIRES = Number(process.env.JWT_ACCESS_EXPIRES) || 900; // 15m
const REFRESH_EXPIRES = Number(process.env.JWT_REFRESH_EXPIRES) || 604800; // 7d

export const generateToken = (userId: number) => {
    const payload = {id: userId}
    const accessToken = jwt.sign(payload, JWT_SECRET,{
      expiresIn: ACCESS_EXPIRES,
    } as SignOptions)

    const refreshToken = jwt.sign(payload, JWT_SECRET,{
      expiresIn: REFRESH_EXPIRES
    } as SignOptions)
    return { accessToken, refreshToken };
}
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
export const decodeToken = (token: string) => jwt.decode(token);

