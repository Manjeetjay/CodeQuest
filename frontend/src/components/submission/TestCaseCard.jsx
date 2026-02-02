export default function TestCaseCard({ result, index }) {
    const getTestResultIcon = (passed) => {
        if (passed === true) {
            return (
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }
        return (
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        );
    };

    return (
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getTestResultIcon(result.passed)}
                    <span className="font-semibold text-white">Test Case {index + 1}</span>
                </div>
                <span
                    className={`text-sm font-medium ${result.passed ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {result.statusDescription || (result.passed ? "Accepted" : "Failed")}
                </span>
            </div>

            {/* Input */}
            {result.input && (
                <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-1 font-medium">Input:</div>
                    <div className="bg-black p-3 rounded-lg font-mono text-sm text-gray-300 whitespace-pre-wrap border border-zinc-700">
                        {result.input}
                    </div>
                </div>
            )}

            {/* Expected Output */}
            {result.expectedOutput && (
                <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-1 font-medium">Expected Output:</div>
                    <div className="bg-black p-3 rounded-lg font-mono text-sm text-blue-400 whitespace-pre-wrap border border-blue-500/30">
                        {result.expectedOutput}
                    </div>
                </div>
            )}

            {/* Actual Output (Your Output) */}
            {result.stdout && (
                <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-1 font-medium">Your Output:</div>
                    <div
                        className={`bg-black p-3 rounded-lg font-mono text-sm whitespace-pre-wrap border ${result.passed
                                ? "text-green-400 border-green-500/30"
                                : "text-red-400 border-red-500/30"
                            }`}
                    >
                        {result.stdout}
                    </div>
                </div>
            )}

            {/* Error Output */}
            {result.stderr && (
                <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-1 font-medium">Error Output:</div>
                    <div className="bg-red-500/10 p-3 rounded-lg font-mono text-sm text-red-400 whitespace-pre-wrap border border-red-500/30">
                        {result.stderr}
                    </div>
                </div>
            )}

            {/* Compilation Output */}
            {result.compileOutput && (
                <div className="mb-3">
                    <div className="text-sm text-gray-400 mb-1 font-medium">Compilation Output:</div>
                    <div className="bg-purple-500/10 p-3 rounded-lg font-mono text-sm text-purple-400 whitespace-pre-wrap border border-purple-500/30">
                        {result.compileOutput}
                    </div>
                </div>
            )}

            {/* Performance Stats */}
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
    );
}
