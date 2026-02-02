import { getLanguageName, formatDate } from "../../utils/helpers";

export default function SubmissionsList({ submissions, loading, onViewResults, onLoadCode }) {
    if (loading) {
        return <div className="text-center py-8 text-gray-400">Loading submissions...</div>;
    }

    if (!submissions || submissions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No submissions yet. Submit your solution to see it here!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {submissions.map((submission) => (
                <div
                    key={submission.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-white font-semibold">#{submission.id}</span>
                            <span
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${submission.status === "COMPLETED"
                                        ? "bg-green-500/20 text-green-400"
                                        : submission.status === "FAILED"
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                            >
                                {submission.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onViewResults(submission.id)}
                                className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium text-sm border border-zinc-700"
                            >
                                View Results
                            </button>
                            <button
                                onClick={() => onLoadCode(submission)}
                                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                            >
                                Load Code
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span>{getLanguageName(submission.languageId)}</span>
                        <span>•</span>
                        <span>
                            {submission.passedTests || 0}/{submission.totalTests || 0} tests passed
                        </span>
                        {submission.createdAt && (
                            <>
                                <span>•</span>
                                <span>{formatDate(submission.createdAt)}</span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
