import axios from "axios";
import { logger } from "../utils/logger";

// Validate API base URL configuration
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
    logger.error(
        "VITE_API_BASE_URL is not configured! API calls will fail.",
        null,
        { env: import.meta.env.MODE }
    );
} else {
    logger.info("API Configuration loaded", {
        baseUrl: apiBaseUrl,
        environment: import.meta.env.MODE,
    });
}

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth?.token && auth?.type) {
            config.headers.Authorization = `${auth.type} ${auth.token}`;
        }

        // Log API request
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
        // Log successful API response
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

        // Log API error
        logger.apiError(
            error.config?.method?.toUpperCase() || 'UNKNOWN',
            error.config?.url || 'unknown',
            error
        );

        // Handle authentication errors
        if (status === 401 || status === 403) {
            logger.warn("Authentication failed - redirecting to login", { status });
            localStorage.removeItem("auth");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;