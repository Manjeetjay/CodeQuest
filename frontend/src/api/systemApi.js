import axiosInstance from "./axios";

export const getServerStatus = async () => {
    try {
        const res = await axiosInstance.get("/api/health");
        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch server status";
    }
};
