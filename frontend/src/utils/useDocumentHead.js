import { useEffect } from "react";

/**
 * Custom hook to set the document title (and optionally meta description)
 * for each page. This improves SEO by giving search engines unique
 * per-page titles instead of the same default title on every route.
 *
 * @param {Object} options
 * @param {string} options.title - The page title to set
 * @param {string} [options.description] - Optional meta description override
 */
export default function useDocumentHead({ title, description }) {
    useEffect(() => {
        // Set document title
        if (title) {
            document.title = title;
        }

        // Optionally override the meta description
        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            const originalDescription = metaDesc ? metaDesc.content : "";

            if (metaDesc) {
                metaDesc.content = description;
            }

            // Restore original on unmount
            return () => {
                if (metaDesc && originalDescription) {
                    metaDesc.content = originalDescription;
                }
            };
        }
    }, [title, description]);
}
