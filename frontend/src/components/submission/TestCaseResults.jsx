import TestCaseCard from "./TestCaseCard";
import { getLanguageName } from "../../utils/helpers";
import { CheckCircle2, XCircle, Lock } from "lucide-react";

export default function TestCaseResults({ submission, loading }) {
    const isProcessing = submission?.status === "PENDING" || submission?.status === "PROCESSING";

    if (isProcessing) {
        return (
            <div className="mb-8 p-5 border border-sky-400/20 bg-sky-500/5 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sky-400" />
                    <span className="text-sky-200 text-sm font-medium">
                        Processing your submission...
                    </span>
                </div>
            </div>
        );
    }

    const allPassed = submission?.passedTests === submission?.totalTests;
    const sampleResults = submission?.results?.filter((r) => r.sample) || [];
    const hiddenResults = submission?.results?.filter((r) => !r.sample) || [];
    const hiddenPassed = hiddenResults.filter((r) => r.passed).length;

    return (
        <>
            {/* Overall verdict banner */}
            <div
                className={`mb-6 p-5 rounded-xl border ${allPassed
                    ? "border-tech-accent/20 bg-tech-accent/15"
                    : "border-red-400/20 bg-red-500/5"
                    }`}
            >
                <div className="flex items-center gap-3">
                    {allPassed ? (
                        <CheckCircle2 className="w-6 h-6 text-tech-accent" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                        <div
                            className={`text-lg font-semibold ${allPassed ? "text-tech-accent" : "text-red-400"
                                }`}
                        >
                            {allPassed ? "Accepted" : "Wrong Answer"}
                        </div>
                        <div className="text-xs text-tech-muted mt-0.5">
                            {submission?.passedTests ?? 0} / {submission?.totalTests ?? 0} test
                            cases passed
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-lg border border-tech-border bg-tech-panel p-4">
                    <div className="text-[10px] text-tech-muted uppercase tracking-widest mb-1">
                        Status
                    </div>
                    <div className="text-sm font-semibold text-white">
                        {submission?.status?.replace(/_/g, " ") || "Unknown"}
                    </div>
                </div>
                <div className="rounded-lg border border-tech-border bg-tech-panel p-4">
                    <div className="text-[10px] text-tech-muted uppercase tracking-widest mb-1">
                        Tests
                    </div>
                    <div className="text-sm font-semibold text-white">
                        {submission?.passedTests ?? 0} / {submission?.totalTests ?? 0}
                    </div>
                </div>
                <div className="rounded-lg border border-tech-border bg-tech-panel p-4">
                    <div className="text-[10px] text-tech-muted uppercase tracking-widest mb-1">
                        Language
                    </div>
                    <div className="text-sm font-semibold text-white">
                        {submission?.languageId
                            ? getLanguageName(submission.languageId)
                            : "Unknown"}
                    </div>
                </div>
            </div>

            {/* Sample test case details */}
            {sampleResults.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-white mb-3">
                        Sample Test Cases
                    </h2>
                    <div className="space-y-3">
                        {sampleResults.map((result, index) => (
                            <TestCaseCard key={index} result={result} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Hidden test cases summary */}
            {hiddenResults.length > 0 && (
                <div className="mb-6 rounded-lg border border-tech-border bg-tech-panel p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-3.5 h-3.5 text-tech-muted" />
                        <h3 className="text-xs font-semibold text-tech-muted uppercase tracking-wider">
                            Hidden Test Cases
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-white font-medium">
                            {hiddenPassed} / {hiddenResults.length} passed
                        </div>
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${hiddenPassed === hiddenResults.length
                                    ? "bg-tech-accent"
                                    : "bg-red-400"
                                    }`}
                                style={{
                                    width: `${hiddenResults.length > 0
                                        ? (hiddenPassed / hiddenResults.length) * 100
                                        : 0
                                        }%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
