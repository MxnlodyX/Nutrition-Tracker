import { Request, Response } from "express";
import * as AuthService from "../service/authService";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const data = await AuthService.login(email, password)
        if (data) {
            res.status(200).json(data);
        }
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || "Login failed" })
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: "Missing refreshToken" })
        const token = await AuthService.refresh(refreshToken)
        if (token) {
            res.json(token)
        }
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || "Refresh failed" })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        console.log("🧩 Logout body:", req.body);

        const refreshToken = req.body.refreshToken;
        if (!refreshToken)
            return res.status(400).json({ message: "Missing refreshToken" });

        await AuthService.logout(refreshToken);
        return res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
        console.error(error);
        return res.status(error.status || 500).json({ message: error.message });
    }
}
    export const getProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).userId;
            const user = await AuthService.profile(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "Protected",
                userId,
                userInfo: user,
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching user profile" });
        }
    };