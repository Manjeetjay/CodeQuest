import axiosInstance from "./axios";

export const login = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/auth/login", payload);
        return res.data;
    } catch (err) {
        // Backend returns ErrorResponse with format: { timestamp, status, error, message, path }
        const errorMessage = err.response?.data?.message || err.response?.data || "Login failed";
        throw new Error(errorMessage);
    }
};

export const register = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/auth/register", payload);
        return res.data;
    } catch (err) {
        // Backend returns ErrorResponse with format: { timestamp, status, error, message, path }
        // Extract the user-friendly message for email verification and other errors
        const errorMessage = err.response?.data?.message || err.response?.data || "Registration failed";
        throw new Error(errorMessage);
    }
};
