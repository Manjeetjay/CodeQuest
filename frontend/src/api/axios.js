import axios from "axios";
import { logger } from "../utils/logger";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const raw = localStorage.getItem("auth");
            if (raw) {
                const auth = JSON.parse(raw);
                if (auth?.token && auth?.type) {
                    config.headers.Authorization = `${auth.type} ${auth.token}`;
                }
            }
        } catch (e) {
            // Corrupt localStorage entry — ignore
        }

        logger.apiRequest(config.method.toUpperCase(), config.url, config.data);
        return config;
    },
    (error) => {
        logger.error("Request interceptor error", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        logger.apiResponse(
            response.config.method.toUpperCase(),
            response.config.url,
            response.status,
            response.data
        );
        return response;
    },
    (error) => {
        const status = error?.response?.status;

        logger.apiError(
            error.config?.method?.toUpperCase() || "UNKNOWN",
            error.config?.url || "unknown",
            error
        );

        // Only force-logout on 401 from protected endpoints (not auth endpoints)
        if (status === 401) {
            const url = error.config?.url || "";
            const isAuthEndpoint = url.includes("/api/auth/");

            if (!isAuthEndpoint) {
                // Check if token actually exists — if it does but got 401,
                // the token is invalid/expired, so clear it
                const hasAuth = !!localStorage.getItem("auth");
                if (hasAuth) {
                    logger.warn("Token rejected by server — clearing session", { status, url });
                    localStorage.removeItem("auth");
                    // Use soft redirect so React state stays consistent
                    // Delay slightly to avoid clearing state mid-render
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 100);
                }
            }
        }
        // Don't redirect on 403 — that's a permissions issue, not an auth issue

        return Promise.reject(error);
    }
);

export default axiosInstance;