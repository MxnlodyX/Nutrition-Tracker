import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });
                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                return api(originalRequest);
            } catch (err) {
                console.error("🔥 Token refresh failed:", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)
export default api