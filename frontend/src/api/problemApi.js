import axiosInstance from "./axios";
import { getCachedOrFetch, setCache } from "../utils/cache";

const CACHE_TTL = {
    PROBLEMS: 30 * 60 * 1000, // 30 mins
};

export const getAllProblems = async (fromNetwork = false) => {
    const fetchFn = async () => {
        try {
            const res = await axiosInstance.get("/api/u/problem");
            return res.data;
        } catch (err) {
            throw err.response?.data || "Failed to fetch problems";
        }
    };

    const cacheKey = "all_problems";

    if (fromNetwork) {
        const fresh = await fetchFn();
        setCache(cacheKey, fresh, CACHE_TTL.PROBLEMS);
        return fresh;
    }

    return getCachedOrFetch(cacheKey, fetchFn, CACHE_TTL.PROBLEMS);
};

export const getProblemById = async (id, fromNetwork = false) => {
    const fetchFn = async () => {
        try {
            const res = await axiosInstance.get(`/api/u/problem/${id}`);
            return res.data;
        } catch (err) {
            throw err.response?.data || "Failed to fetch problem";
        }
    };

    const cacheKey = `problem_${id}`;

    if (fromNetwork) {
        const fresh = await fetchFn();
        setCache(cacheKey, fresh, CACHE_TTL.PROBLEMS);
        return fresh;
    }

    return getCachedOrFetch(cacheKey, fetchFn, CACHE_TTL.PROBLEMS);
};
