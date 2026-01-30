import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getSubmission } from "../../api/api";

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
            const data = await getSubmission(id);
            setSubmission(data);
            setError("");
        } catch (err) {
            console.error("Failed to fetch submission:", err);
            setError("Failed to load submission. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            ACCEPTED: "bg-green-500/20 text-green-400 border-green-500/50",
            WRONG_ANSWER: "bg-red-500/20 text-red-400 border-red-500/50",
            TIME_LIMIT_EXCEEDED: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
            RUNTIME_ERROR: "bg-orange-500/20 text-orange-400 border-orange-500/50",
            COMPILATION_ERROR: "bg-purple-500/20 text-purple-400 border-purple-500/50",
            PENDING: "bg-blue-500/20 text-blue-400 border-blue-500/50",
            PROCESSING: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        };

        return (
            <span className={`px-4 py-2 rounded-lg border font-medium text-sm ${statusStyles[status] || "bg-gray-500/20 text-gray-400 border-gray-500/50"}`}>
                {status?.replace(/_/g, " ")}
            </span>
        );
    };

    const getTestResultIcon = (passed) => {
        if (passed === true) {
            return (
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            );
        }
        return (
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        );
    };

    if (loading && !submission) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                        <div className="text-xl font-semibold text-white">Loading submission...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="text-red-500 text-xl mb-4">{error || "Submission not found"}</div>
                        <button
                            onClick={() => navigate("/problems")}
                            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Back to Problems
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isProcessing = submission.status === "PENDING" || submission.status === "PROCESSING";

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(`/problem/${submission.problemId}`)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Problem
                    </button>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Submission #{submission.id}</h1>
                            <p className="text-gray-400">Problem #{submission.problemId}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {getStatusBadge(submission.status)}
                        </div>
                    </div>
                </div>

                {/* Processing Status */}
                {isProcessing && (
                    <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                            <div className="text-blue-400 font-medium">
                                Your submission is being processed. This page will update automatically...
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics Card */}
                {!isProcessing && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                            <div className="text-gray-400 text-sm mb-1">Status</div>
                            <div className="text-2xl font-bold text-white">
                                {submission.status?.replace(/_/g, " ")}
                            </div>
                        </div>
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                            <div className="text-gray-400 text-sm mb-1">Test Cases</div>
                            <div className="text-2xl font-bold text-white">
                                {submission.passedTests || 0} / {submission.totalTests || 0}
                            </div>
                        </div>
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                            <div className="text-gray-400 text-sm mb-1">Language</div>
                            <div className="text-2xl font-bold text-white">
                                {getLanguageName(submission.languageId)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Test Results */}
                {submission.results && submission.results.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Test Results</h2>
                        <div className="space-y-4">
                            {submission.results.map((result, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {getTestResultIcon(result.passed)}
                                            <span className="font-semibold text-white">
                                                Test Case {index + 1}
                                            </span>
                                        </div>
                                        <span className={`text-sm font-medium ${result.passed ? "text-green-400" : "text-red-400"
                                            }`}>
                                            {result.statusDescription || (result.passed ? "Accepted" : "Failed")}
                                        </span>
                                    </div>

                                    {result.stdout && (
                                        <div className="mb-3">
                                            <div className="text-sm text-gray-400 mb-1">Output:</div>
                                            <div className={`bg-black p-3 rounded-lg font-mono text-sm whitespace-pre-wrap border ${result.passed
                                                ? "text-green-400 border-green-500/30"
                                                : "text-red-400 border-red-500/30"
                                                }`}>
                                                {result.stdout}
                                            </div>
                                        </div>
                                    )}

                                    {result.stderr && (
                                        <div className="mb-3">
                                            <div className="text-sm text-gray-400 mb-1">Error Output:</div>
                                            <div className="bg-red-500/10 p-3 rounded-lg font-mono text-sm text-red-400 whitespace-pre-wrap border border-red-500/30">
                                                {result.stderr}
                                            </div>
                                        </div>
                                    )}

                                    {result.compileOutput && (
                                        <div className="mb-3">
                                            <div className="text-sm text-gray-400 mb-1">Compilation Output:</div>
                                            <div className="bg-purple-500/10 p-3 rounded-lg font-mono text-sm text-purple-400 whitespace-pre-wrap border border-purple-500/30">
                                                {result.compileOutput}
                                            </div>
                                        </div>
                                    )}

                                    {(result.time !== null || result.memory !== null) && (
                                        <div className="flex gap-4 mt-3 pt-3 border-t border-zinc-800">
                                            {result.time !== null && (
                                                <div className="text-sm text-gray-400">
                                                    <span className="font-medium">Time:</span> {result.time}s
                                                </div>
                                            )}
                                            {result.memory !== null && (
                                                <div className="text-sm text-gray-400">
                                                    <span className="font-medium">Memory:</span> {result.memory}KB
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submitted Code */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Submitted Code</h2>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">
                            {submission.code}
                        </pre>
                    </div>
                </div>

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

// Helper function to map language IDs to names
function getLanguageName(languageId) {
    const languages = {
        62: "Java",
        71: "Python",
        63: "JavaScript",
        54: "C++",
        50: "C",
        60: "Go",
        73: "Rust",
    };
    return languages[languageId] || `Language ${languageId}`;
}
