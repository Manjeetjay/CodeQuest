import { CheckCircle2, XCircle } from "lucide-react";

export default function TestCaseCard({ result, index }) {
    return (
        <div
            className={`rounded-lg border p-4 ${result.passed
                    ? "border-emerald-400/15 bg-emerald-500/[0.03]"
                    : "border-red-400/15 bg-red-500/[0.03]"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {result.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-xs font-semibold text-white">
                        Case {index + 1}
                    </span>
                </div>
                <span
                    className={`text-[11px] font-medium ${result.passed ? "text-emerald-400" : "text-red-400"
                        }`}
                >
                    {result.statusDescription || (result.passed ? "Accepted" : "Failed")}
                </span>
            </div>

            {/* Input */}
            {result.input && (
                <div className="mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Input
                    </div>
                    <pre className="bg-black/30 p-2.5 rounded text-xs font-code text-slate-300 whitespace-pre-wrap border border-white/[0.04]">
                        {result.input}
                    </pre>
                </div>
            )}

            {/* Expected Output */}
            {result.expectedOutput && (
                <div className="mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Expected
                    </div>
                    <pre className="bg-black/30 p-2.5 rounded text-xs font-code text-sky-300 whitespace-pre-wrap border border-sky-500/10">
                        {result.expectedOutput}
                    </pre>
                </div>
            )}

            {/* Your Output */}
            {result.stdout && (
                <div className="mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Your Output
                    </div>
                    <pre
                        className={`bg-black/30 p-2.5 rounded text-xs font-code whitespace-pre-wrap border ${result.passed
                                ? "text-emerald-300 border-emerald-500/10"
                                : "text-red-300 border-red-500/10"
                            }`}
                    >
                        {result.stdout}
                    </pre>
                </div>
            )}

            {/* Error Output */}
            {result.stderr && (
                <div className="mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Error
                    </div>
                    <pre className="bg-red-500/5 p-2.5 rounded text-xs font-code text-red-300 whitespace-pre-wrap border border-red-500/10">
                        {result.stderr}
                    </pre>
                </div>
            )}

            {/* Compilation Output */}
            {result.compileOutput && (
                <div className="mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Compile
                    </div>
                    <pre className="bg-purple-500/5 p-2.5 rounded text-xs font-code text-purple-300 whitespace-pre-wrap border border-purple-500/10">
                        {result.compileOutput}
                    </pre>
                </div>
            )}

            {/* Performance */}
            {(result.time !== null || result.memory !== null) && (
                <div className="flex gap-4 mt-2 pt-2 border-t border-white/[0.04]">
                    {result.time !== null && (
                        <span className="text-[10px] text-slate-500">
                            <span className="font-medium">Time:</span> {result.time}s
                        </span>
                    )}
                    {result.memory !== null && (
                        <span className="text-[10px] text-slate-500">
                            <span className="font-medium">Memory:</span> {result.memory}KB
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
