import { getLanguageName, formatDate } from "../../utils/helpers";
import { Eye, Code2 } from "lucide-react";

export default function SubmissionsList({ submissions, loading, onViewResults, onLoadCode }) {
    if (loading) {
        return <div className="text-center py-8 text-slate-500 text-xs">Loading submissions...</div>;
    }

    if (!submissions || submissions.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500 text-sm">
                No submissions yet.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {submissions.map((submission) => {
                const isAccepted = submission.status === "COMPLETED";
                return (
                    <div
                        key={submission.id}
                        className="rounded-lg border border-white/[0.06] bg-[#161b22]/60 p-3 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-2 h-2 rounded-full ${isAccepted
                                            ? "bg-emerald-400"
                                            : submission.status === "FAILED"
                                                ? "bg-red-400"
                                                : "bg-yellow-400"
                                        }`}
                                />
                                <span className="text-xs font-semibold text-white">
                                    #{submission.id}
                                </span>
                                <span
                                    className={`text-[11px] font-medium ${isAccepted ? "text-emerald-400" : "text-red-400"
                                        }`}
                                >
                                    {submission.status?.replace(/_/g, " ")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => onViewResults(submission.id)}
                                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                    title="View results"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => onLoadCode(submission)}
                                    className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
                                    title="Load code into editor"
                                >
                                    <Code2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-1.5 text-[10px] text-slate-500">
                            <span>{getLanguageName(submission.languageId)}</span>
                            <span>
                                {submission.passedTests || 0}/{submission.totalTests || 0} passed
                            </span>
                            {submission.createdAt && (
                                <span>{formatDate(submission.createdAt)}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
