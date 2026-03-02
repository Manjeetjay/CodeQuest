import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default function SubmissionHeader({ submission, onBack }) {
    const isAccepted = submission.status === "COMPLETED" || submission.status === "ACCEPTED";

    const getStatusBadge = (status) => {
        const styles = {
            ACCEPTED: "bg-tech-accent/15 text-tech-accent border-tech-accent/30",
            COMPLETED: "bg-tech-accent/15 text-tech-accent border-tech-accent/30",
            WRONG_ANSWER: "bg-red-500/15 text-red-400 border-red-500/30",
            FAILED: "bg-red-500/15 text-red-400 border-red-500/30",
            TIME_LIMIT_EXCEEDED: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
            RUNTIME_ERROR: "bg-orange-500/15 text-orange-400 border-orange-500/30",
            COMPILATION_ERROR: "bg-purple-500/15 text-purple-400 border-purple-500/30",
            PENDING: "bg-sky-500/15 text-sky-400 border-sky-500/30",
            PROCESSING: "bg-sky-500/15 text-sky-400 border-sky-500/30",
        };

        return (
            <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-semibold ${styles[status] || "bg-slate-500/15 text-tech-text border-slate-500/30"
                    }`}
            >
                {isAccepted ? (
                    <CheckCircle2 className="w-3 h-3" />
                ) : (
                    <XCircle className="w-3 h-3" />
                )}
                {status?.replace(/_/g, " ")}
            </span>
        );
    };

    return (
        <div className="mb-6">
            <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs text-tech-muted hover:text-white transition-colors mb-3"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Problem
            </button>

            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-white">
                        Submission #{submission.id}
                    </h1>
                    <p className="text-xs text-tech-muted mt-0.5">
                        Problem #{submission.problemId}
                    </p>
                </div>
                {getStatusBadge(submission.status)}
            </div>
        </div>
    );
}
