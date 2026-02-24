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

export const getAllProblems = async () => {
    try {
        const res = await axiosInstance.get("/api/u/problem");
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch problems";
    }
};

export const getProblemById = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/u/problem/${id}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch problem";
    }
};

export const createSubmission = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/u/submissions", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to create submission";
    }
};

export const getSubmission = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/u/submissions/${id}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch submission";
    }
};

export const getMySubmissionsForProblem = async (problemId, email) => {
    try {
        const res = await axiosInstance.get(`/api/u/submissions/problem/${problemId}/user/${email}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch submissions";
    }
};

export const getServerStatus = async () => {
    try {
        const res = await axiosInstance.get("/api/health");
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch server status";
    }
};
