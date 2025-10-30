import api from "../utils/api";
import { RegistrationData } from "../types/registration";

export const registerUser = async (userData: RegistrationData) => {
    const res = await api.post("/register", userData);
    return res.data;
};