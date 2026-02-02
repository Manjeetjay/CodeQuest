import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import SubmissionHeader from "../../components/submission/SubmissionHeader";
import TestCaseResults from "../../components/submission/TestCaseResults";
import CodeDisplay from "../../components/submission/CodeDisplay";
import { getSubmission } from "../../api/api";
import { getCache, setCache } from "../../utils/cache";

export default function SubmissionResult() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSubmission();
        // Poll for updates if submission is still processing
        const interval = setInterval(() => {
            if (submission?.status === "PENDING" || submission?.status === "PROCESSING") {
                fetchSubmission();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [id, submission?.status]);

    const fetchSubmission = async () => {
        try {
            setLoading(true);
            const cacheKey = `submission_${id}`;

            // Check cache only if we don't have a submission or it's not processing
            if (!submission || (submission.status !== "PENDING" && submission.status !== "PROCESSING")) {
                const cached = getCache(cacheKey);
                if (cached && cached.status !== "PENDING" && cached.status !== "PROCESSING") {
                    setSubmission(cached);
                    setLoading(false);
                    setError("");
                    return;
                }
            }

            // Fetch from API
            const data = await getSubmission(id);
            setSubmission(data);
            setError("");

            // Only cache completed submissions (not pending/processing)
            if (data.status !== "PENDING" && data.status !== "PROCESSING") {
                setCache(cacheKey, data, 5 * 60 * 1000); // 5 minutes
            }
        } catch (err) {
            console.error("Failed to fetch submission:", err);
            setError("Failed to load submission. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !submission) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <LoadingSpinner message="Loading submission..." />
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <ErrorMessage
                    message={error || "Submission not found"}
                    onAction={() => navigate("/problems")}
                    actionText="Back to Problems"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <SubmissionHeader
                    submission={submission}
                    onBack={() => navigate(`/problem/${submission.problemId}`)}
                />

                <TestCaseResults submission={submission} loading={loading} />

                <CodeDisplay code={submission.code} />

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(`/problem/${submission.problemId}`)}
                        className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate("/problems")}
                        className="px-8 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700"
                    >
                        All Problems
                    </button>
                </div>
            </div>
        </div>
    );
}
