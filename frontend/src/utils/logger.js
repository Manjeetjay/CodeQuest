/**
 * Production-Grade Logger Utility
 * 
 * Features:
 * - Environment-aware logging (verbose in dev, essential in production)
 * - Structured log format with timestamps
 * - Log levels: ERROR, WARN, INFO, DEBUG
 * - Context support for better debugging
 * - Easy integration with external logging services (e.g., Sentry, LogRocket)
 */

const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
};

class Logger {
    constructor() {
        this.isDevelopment = import.meta.env.MODE === 'development';
        this.logLevel = this.isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;
        this.appName = 'CodeQuest';
    }

    /**
     * Format log message with timestamp and context
     */
    formatMessage(level, message, context = {}) {
        const timestamp = new Date().toISOString();
        const formattedContext = Object.keys(context).length > 0 ? JSON.stringify(context) : '';

        return {
            timestamp,
            level,
            app: this.appName,
            message,
            context,
            formattedMessage: `[${timestamp}] [${level}] ${message} ${formattedContext}`,
        };
    }

    /**
     * Check if log level should be output
     */
    shouldLog(level) {
        return LOG_LEVELS[level] <= this.logLevel;
    }

    /**
     * Log error - Always shown in production
     */
    error(message, error = null, context = {}) {
        if (!this.shouldLog('ERROR')) return;

        const logData = this.formatMessage('ERROR', message, {
            ...context,
            error: error ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
            } : null,
        });

        console.error('❌', logData.formattedMessage);
        if (error) console.error(error);

        // TODO: Send to error tracking service (e.g., Sentry)
        // this.sendToErrorTracking(logData);
    }

    /**
     * Log warning - Shown in production
     */
    warn(message, context = {}) {
        if (!this.shouldLog('WARN')) return;

        const logData = this.formatMessage('WARN', message, context);
        console.warn('⚠️', logData.formattedMessage);

        // TODO: Send to logging service
        // this.sendToLoggingService(logData);
    }

    /**
     * Log info - Shown in production for important events
     */
    info(message, context = {}) {
        if (!this.shouldLog('INFO')) return;

        const logData = this.formatMessage('INFO', message, context);
        console.info('ℹ️', logData.formattedMessage);
    }

    /**
     * Log debug - Only shown in development
     */
    debug(message, context = {}) {
        if (!this.shouldLog('DEBUG')) return;

        const logData = this.formatMessage('DEBUG', message, context);
        console.log('🔍', logData.formattedMessage);
    }

    /**
     * Log API request
     */
    apiRequest(method, url, data = null) {
        this.debug(`API Request: ${method} ${url}`, {
            method,
            url,
            data: data ? JSON.stringify(data).substring(0, 200) : null, // Limit data length
        });
    }

    /**
     * Log API response
     */
    apiResponse(method, url, status, data = null) {
        const isSuccess = status >= 200 && status < 300;
        const logMethod = isSuccess ? 'debug' : 'warn';

        this[logMethod](`API Response: ${method} ${url} - ${status}`, {
            method,
            url,
            status,
            dataPreview: data ? JSON.stringify(data).substring(0, 200) : null,
        });
    }

    /**
     * Log API error
     */
    apiError(method, url, error) {
        const status = error.response?.status || 'Network Error';
        const errorMessage = error.response?.data?.message || error.message;

        this.error(`API Error: ${method} ${url} - ${status}`, error, {
            method,
            url,
            status,
            errorMessage,
        });
    }

    /**
     * Log user action
     */
    userAction(action, details = {}) {
        this.info(`User Action: ${action}`, details);
    }

    /**
     * Log navigation
     */
    navigation(from, to) {
        this.debug(`Navigation: ${from} → ${to}`, { from, to });
    }

    /**
     * Log performance metric
     */
    performance(metric, value, unit = 'ms') {
        this.debug(`Performance: ${metric} = ${value}${unit}`, {
            metric,
            value,
            unit,
        });
    }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing or custom instances
export default logger;
