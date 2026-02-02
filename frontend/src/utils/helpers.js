import { DIFFICULTY_COLORS, LANGUAGE_IDS, MONACO_LANGUAGES } from "./constants";

/**
 * Returns the Tailwind CSS class for a given difficulty level
 */
export const getDifficultyColor = (difficulty) => {
    return DIFFICULTY_COLORS[difficulty] || "text-gray-400";
};

/**
 * Converts a language name to its Judge0 language ID
 */
export const getLanguageId = (language) => {
    return LANGUAGE_IDS[language] || 62;
};

/**
 * Converts a Judge0 language ID to its language name
 */
export const getLanguageName = (languageId) => {
    const reverseMapping = Object.entries(LANGUAGE_IDS).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
    return reverseMapping[languageId] || "Unknown";
};

/**
 * Maps a language name to its Monaco editor language identifier
 */
export const getMonacoLanguage = (lang) => {
    return MONACO_LANGUAGES[lang] || "plaintext";
};

/**
 * Formats a date string to a localized string
 */
export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
};
