import TestCaseCard from "./TestCaseCard";
import { getLanguageName } from "../../utils/helpers";

export default function TestCaseResults({ submission, loading }) {
    const isProcessing = submission?.status === "PENDING" || submission?.status === "PROCESSING";

    if (isProcessing) {
        return (
            <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    <div className="text-blue-400 font-medium">
                        Your submission is being processed. This page will update automatically...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Statistics Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">Status</div>
                    <div className="text-2xl font-bold text-white">
                        {submission?.status?.replace(/_/g, " ") || "Unknown"}
                    </div>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">Test Cases</div>
                    <div className="text-2xl font-bold text-white">
                        {submission?.passedTests ?? 0} / {submission?.totalTests ?? 0}
                    </div>
                </div>
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">Language</div>
                    <div className="text-2xl font-bold text-white">
                        {submission?.languageId ? getLanguageName(submission.languageId) : "Unknown"}
                    </div>
                </div>
            </div>

            {/* only those testcase which are sample */}
            {submission?.results && submission.results.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Test Results</h2>
                    <div className="space-y-4">
                        {submission.results.map((result, index) => (
                            <TestCaseCard key={index} result={result} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
