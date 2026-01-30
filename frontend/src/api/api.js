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

export const createSubmission = async (payload) => {
    try {
        const res = await axiosInstance.post("/u/submissions", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to create submission";
    }
};

export const getSubmission = async (id) => {
    try {
        const res = await axiosInstance.get(`/u/submissions/${id}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch submission";
    }
};

export const getMySubmissionsForProblem = async (problemId, email) => {
    try {
        const res = await axiosInstance.get(`/u/submissions/problem/${problemId}/user/${email}`);
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch submissions";
    }
};