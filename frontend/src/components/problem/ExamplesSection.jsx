export default function ExamplesSection({ testCases }) {
    if (!testCases || testCases.length === 0) {
        return (
            <div className="text-gray-500 text-center py-8">
                No sample test cases available
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {testCases.map((testCase, index) => (
                <div key={testCase.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <div className="font-semibold text-white mb-3">Example {index + 1}</div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Input:</div>
                            <div className="bg-black p-3 rounded font-mono text-sm text-white whitespace-pre-wrap">
                                {testCase.input}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Output:</div>
                            <div className="bg-black p-3 rounded font-mono text-sm text-white whitespace-pre-wrap">
                                {testCase.output}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
