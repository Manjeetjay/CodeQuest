import axiosInstance from "./axios";
import { getCachedOrFetch, setCache, getCache, clearCache } from "../utils/cache";

const CACHE_TTL = {
    SUBMISSIONS: 10 * 60 * 1000, // 10 mins
    SINGLE_SUBMISSION: 5 * 60 * 1000, // 5 mins
};

export const createSubmission = async (payload) => {
    try {
        const res = await axiosInstance.post("/api/u/submissions", payload);

        // Clear cached submissions for this problem to reflect the new submission
        clearCache(`problem_${payload.problemId}_submissions`);

        return res.data;
    } catch (err) {
        throw err.response?.data || "Failed to create submission";
    }
};

export const getSubmission = async (id) => {
    const cacheKey = `submission_${id}`;
    const cached = getCache(cacheKey);

    // Only return cache if the status is final (not pending or processing)
    if (cached && cached.status !== "PENDING" && cached.status !== "PROCESSING") {
        return cached;
    }

    try {
        const res = await axiosInstance.get(`/api/u/submissions/${id}`);
        const data = res.data;

        // Only cache if the status is final
        if (data.status !== "PENDING" && data.status !== "PROCESSING") {
            setCache(cacheKey, data, CACHE_TTL.SINGLE_SUBMISSION);
        }

        return data;
    } catch (err) {
        throw err.response?.data || "Failed to fetch submission";
    }
};

export const getMySubmissionsForProblem = async (problemId, email) => {
    if (!email) {
        return [];
    }

    const fetchFn = async () => {
        try {
            const res = await axiosInstance.get(`/api/u/submissions/problem/${problemId}/user/${email}`);
            return res.data;
        } catch (err) {
            throw err.response?.data || "Failed to fetch submissions";
        }
    };

    const cacheKey = `problem_${problemId}_submissions`;
    return getCachedOrFetch(cacheKey, fetchFn, CACHE_TTL.SUBMISSIONS);
};
