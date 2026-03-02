import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import SubmissionHeader from "../../components/submission/SubmissionHeader";
import TestCaseResults from "../../components/submission/TestCaseResults";
import CodeDisplay from "../../components/submission/CodeDisplay";
import { getSubmission } from "../../api/submissionApi";
import { logger } from "../../utils/logger";

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

            logger.debug("Fetching submission", { submissionId: id });

            const data = await getSubmission(id);

            logger.info("Submission data received successfully", {
                submissionId: data.id,
                status: data.status,
                problemId: data.problemId,
                passedTests: data.passedTests,
                totalTests: data.totalTests,
                hasResults: data.results?.length > 0,
            });
            setSubmission(data);
            setError("");
        } catch (err) {
            logger.error("Failed to fetch submission", err, {
                submissionId: id,
                errorMessage: err.message,
                responseStatus: err.response?.status,
                responseData: err.response?.data,
            });

            // Create a more helpful error message
            let errorMessage = "Failed to load submission.";

            if (!import.meta.env.VITE_API_BASE_URL) {
                errorMessage = "API configuration error. Please check environment variables.";
            } else if (err.response?.status === 404) {
                errorMessage = `Submission #${id} not found. It may have been deleted.`;
            } else if (err.response?.status === 401 || err.response?.status === 403) {
                errorMessage = "You don't have permission to view this submission.";
            } else if (err.message?.includes("Network Error")) {
                errorMessage = "Network error. Please check your connection and API URL.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !submission) {
        return (
            <div className="min-h-screen bg-tech-bg text-tech-text">
                <Navbar />
                <LoadingSpinner message="Loading submission..." />
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="min-h-screen bg-tech-bg text-tech-text">
                <Navbar />
                <ErrorMessage
                    message={error || "Submission not found"}
                    onAction={() => navigate("/problems")}
                    actionText="Back to Problems"
                />
            </div>
        );
    }

    // Validate submission has all required fields
    const hasRequiredFields = submission.id &&
        submission.problemId !== undefined &&
        submission.status &&
        submission.languageId !== undefined;

    if (!hasRequiredFields) {
        logger.error("Submission missing required fields", null, {
            submissionId: id,
            submission,
            hasId: !!submission.id,
            hasProblemId: submission.problemId !== undefined,
            hasStatus: !!submission.status,
            hasLanguageId: submission.languageId !== undefined,
        });
        return (
            <div className="min-h-screen bg-tech-bg text-tech-text">
                <Navbar />
                <ErrorMessage
                    message="Submission data is incomplete. Please try again."
                    onAction={() => navigate("/problems")}
                    actionText="Back to Problems"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-tech-bg text-tech-text">
            <Navbar />

            <div className="container mx-auto px-6 py-12 max-w-5xl">
                <SubmissionHeader
                    submission={submission}
                    onBack={() => navigate(`/problem/${submission.problemId}`)}
                />

                <TestCaseResults submission={submission} loading={loading} />

                {submission.code && <CodeDisplay code={submission.code} />}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(`/problem/${submission.problemId}`)}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate("/problems")}
                        className="btn-outline"
                    >
                        All Problems
                    </button>
                </div>
            </div>
        </div>
    );
}
