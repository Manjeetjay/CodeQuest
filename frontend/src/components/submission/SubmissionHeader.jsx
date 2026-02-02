export default function SubmissionHeader({ submission, onBack }) {
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
            <span
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${statusStyles[status] || "bg-gray-500/20 text-gray-400 border-gray-500/50"
                    }`}
            >
                {status?.replace(/_/g, " ")}
            </span>
        );
    };

    return (
        <div className="mb-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to Problem
            </button>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Submission #{submission.id}
                    </h1>
                    <p className="text-gray-400">Problem #{submission.problemId}</p>
                </div>
                <div className="flex items-center gap-4">{getStatusBadge(submission.status)}</div>
            </div>
        </div>
    );
}
