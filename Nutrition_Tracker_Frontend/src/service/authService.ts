import api from "../utils/api";

export const login = (email: string, password: string) =>
    api.post("/auth/login", { email, password });

export const logout = (refreshToken: string) =>
    api.post("/auth/logout", { refreshToken });

export const getProfile = () =>
    api.get(`/auth/profile`);
