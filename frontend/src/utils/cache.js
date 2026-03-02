/**
 * Browser Cache Utility (Production Ready)
 * L1 Memory Cache + L2 localStorage Cache with expiration
 */

const CACHE_VERSION = "1.0";
const CACHE_VERSION_KEY = "cq_cache_version";
const PREFIX = "cq_cache:";

/* Safe Storage Wrapper */
const safeStorage = {
    get(key) {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch {}
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch {}
    }
};

/* Memory Cache (L1 Cache) */
const memoryCache = new Map();

/* Cache Time Presets */
export const CACHE_TIME = {
    SHORT: 5 * 60 * 1000,
    MEDIUM: 30 * 60 * 1000,
    LONG: 24 * 60 * 60 * 1000
};

/* Helpers */
const buildKey = (key) => PREFIX + key;

/* Version Initialization */
export const ensureCacheVersion = () => {
    const version = safeStorage.get(CACHE_VERSION_KEY);

    if (version !== CACHE_VERSION) {
        clearAllCache();
        safeStorage.set(CACHE_VERSION_KEY, CACHE_VERSION);
    }
};

/* Set Cache */
export const setCache = (key, data, expiresInMs) => {
    try {
        const fullKey = buildKey(key);

        const cacheEntry = {
            data,
            timestamp: Date.now(),
            expiresIn: expiresInMs
        };

        memoryCache.set(fullKey, data);
        safeStorage.set(fullKey, JSON.stringify(cacheEntry));
    } catch (error) {
        console.warn("Failed to set cache:", error);
    }
};

/* Get Cache */
export const getCache = (key) => {
    const fullKey = buildKey(key);

    try {
        /* L1 Memory Cache */
        if (memoryCache.has(fullKey)) {
            return memoryCache.get(fullKey);
        }

        const cached = safeStorage.get(fullKey);
        if (!cached) return null;

        const cacheEntry = JSON.parse(cached);

        const age = Date.now() - cacheEntry.timestamp;

        if (age > cacheEntry.expiresIn) {
            clearCache(key);
            return null;
        }

        memoryCache.set(fullKey, cacheEntry.data);
        return cacheEntry.data;
    } catch (error) {
        clearCache(key);
        return null;
    }
};

/* Clear Specific Cache */
export const clearCache = (key) => {
    const fullKey = buildKey(key);
    memoryCache.delete(fullKey);
    safeStorage.remove(fullKey);
};

/* Clear All Cache */
export const clearAllCache = () => {
    try {
        Object.keys(localStorage).forEach((key) => {
            if (!key.startsWith(PREFIX)) return;

            safeStorage.remove(key);
        });

        memoryCache.clear();
    } catch (error) {
        console.warn("Failed to clear cache:", error);
    }
};

/* Clean Expired Cache (GC) */
export const cleanExpiredCache = () => {
    Object.keys(localStorage).forEach((key) => {
        if (!key.startsWith(PREFIX)) return;

        try {
            const item = JSON.parse(safeStorage.get(key));
            if (!item?.timestamp) return;

            const age = Date.now() - item.timestamp;

            if (age > item.expiresIn) {
                safeStorage.remove(key);
                memoryCache.delete(key);
            }
        } catch {}
    });
};

/* Cache Expired Check */
export const isCacheExpired = (key) => {
    try {
        const cached = safeStorage.get(buildKey(key));
        if (!cached) return true;

        const entry = JSON.parse(cached);
        return Date.now() - entry.timestamp > entry.expiresIn;
    } catch {
        return true;
    }
};

/* Time Until Expiration */
export const getTimeUntilExpiration = (key) => {
    try {
        const cached = safeStorage.get(buildKey(key));
        if (!cached) return null;

        const entry = JSON.parse(cached);
        const remaining =
            entry.expiresIn - (Date.now() - entry.timestamp);

        return remaining > 0 ? remaining : 0;
    } catch {
        return null;
    }
};

/* Cache Statistics */
export const getCacheStats = () => {
    try {
        let totalSize = 0;
        let entries = 0;

        Object.keys(localStorage).forEach((key) => {
            if (!key.startsWith(PREFIX)) return;

            const item = safeStorage.get(key);
            if (item) {
                totalSize += new Blob([item]).size;
                entries++;
            }
        });

        return {
            entries,
            totalSize,
            totalSizeKB: (totalSize / 1024).toFixed(2),
            version: safeStorage.get(CACHE_VERSION_KEY)
        };
    } catch {
        return {
            entries: 0,
            totalSize: 0,
            totalSizeKB: "0",
            version: CACHE_VERSION
        };
    }
};

/* Stale-While-Revalidate Fetch */
export const getCachedOrFetch = async (key, fetchFn, ttl) => {
    const cached = getCache(key);

    if (cached) {
        // background refresh
        fetchFn()
            .then((data) => setCache(key, data, ttl))
            .catch(() => {});
        return cached;
    }

    const fresh = await fetchFn();
    setCache(key, fresh, ttl);
    return fresh;
};