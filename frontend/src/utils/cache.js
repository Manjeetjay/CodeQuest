/**
 * Browser Cache Utility
 * Provides caching functionality using localStorage with automatic expiration
 */

const CACHE_VERSION = "1.0";
const CACHE_VERSION_KEY = "cache_version";

/**
 * Set data in cache with expiration time
 * @param {string} key - Cache key
 * @param {any} data - Data to cache (will be JSON stringified)
 * @param {number} expiresInMs - Expiration time in milliseconds
 */
export const setCache = (key, data, expiresInMs) => {
    try {
        const cacheEntry = {
            data,
            timestamp: Date.now(),
            expiresIn: expiresInMs,
        };

        localStorage.setItem(key, JSON.stringify(cacheEntry));

        // Set cache version if not set
        if (!localStorage.getItem(CACHE_VERSION_KEY)) {
            localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);
        }
    } catch (error) {
        console.warn("Failed to set cache:", error);
        // Silently fail - cache is optional
    }
};

/**
 * Get data from cache if not expired
 * @param {string} key - Cache key
 * @returns {any|null} Cached data or null if expired/not found
 */
export const getCache = (key) => {
    try {
        // Check version first
        const version = localStorage.getItem(CACHE_VERSION_KEY);
        if (version !== CACHE_VERSION) {
            // Version mismatch, clear all cache
            clearAllCache();
            return null;
        }

        const cached = localStorage.getItem(key);
        if (!cached) {
            return null;
        }

        const cacheEntry = JSON.parse(cached);
        const now = Date.now();
        const age = now - cacheEntry.timestamp;

        // Check if expired
        if (age > cacheEntry.expiresIn) {
            // Expired, remove it
            localStorage.removeItem(key);
            return null;
        }

        return cacheEntry.data;
    } catch (error) {
        console.warn("Failed to get cache:", error);
        // If parsing fails, clear this cache entry
        clearCache(key);
        return null;
    }
};

/**
 * Clear specific cache entry
 * @param {string} key - Cache key to clear
 */
export const clearCache = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn("Failed to clear cache:", error);
    }
};

/**
 * Clear all cache entries
 */
export const clearAllCache = () => {
    try {
        // Get all keys
        const keys = Object.keys(localStorage);

        // Clear all except auth-related keys
        keys.forEach((key) => {
            // Keep these keys
            if (key === "token" || key === "email" || key.startsWith("problem_")) {
                // Keep problem code/language localStorage (problem_X_code, problem_X_language)
                if (key.includes("_code") || key.includes("_language")) {
                    return;
                }
            }
            localStorage.removeItem(key);
        });

        // Reset version
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);
    } catch (error) {
        console.warn("Failed to clear all cache:", error);
    }
};

/**
 * Check if a cache entry is expired
 * @param {string} key - Cache key
 * @returns {boolean} True if expired or not found
 */
export const isCacheExpired = (key) => {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) {
            return true;
        }

        const cacheEntry = JSON.parse(cached);
        const now = Date.now();
        const age = now - cacheEntry.timestamp;

        return age > cacheEntry.expiresIn;
    } catch (error) {
        return true;
    }
};

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export const getCacheStats = () => {
    try {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter(
            (key) => key !== CACHE_VERSION_KEY && key !== "token" && key !== "email"
        );

        let totalSize = 0;
        cacheKeys.forEach((key) => {
            const item = localStorage.getItem(key);
            if (item) {
                totalSize += new Blob([item]).size;
            }
        });

        return {
            entries: cacheKeys.length,
            totalSize: totalSize,
            totalSizeKB: (totalSize / 1024).toFixed(2),
            version: localStorage.getItem(CACHE_VERSION_KEY),
        };
    } catch (error) {
        return {
            entries: 0,
            totalSize: 0,
            totalSizeKB: "0",
            version: CACHE_VERSION,
        };
    }
};

/**
 * Get time until cache expires
 * @param {string} key - Cache key
 * @returns {number|null} Milliseconds until expiration, or null if not found
 */
export const getTimeUntilExpiration = (key) => {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) {
            return null;
        }

        const cacheEntry = JSON.parse(cached);
        const now = Date.now();
        const age = now - cacheEntry.timestamp;
        const remaining = cacheEntry.expiresIn - age;

        return remaining > 0 ? remaining : 0;
    } catch (error) {
        return null;
    }
};
