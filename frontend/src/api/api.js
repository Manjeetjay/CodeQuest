import axiosInstance from "./axios";

export const login = async (payload) => {
    try {
        const res = await axiosInstance.post("/auth/login", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Login failed";
    }
};

export const register = async (payload) => {
    try {
        const res = await axiosInstance.post("/auth/register", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Registration failed";
    }
};

export const getAllProblems = async () => {
    try {
        const res = await axiosInstance.get("/u/problem");
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch problems";
    }
};

export const getProblemById = async (id) => {
    try {
        const res = await axiosInstance.get(`/u/problem/${id}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch problem";
    }
};