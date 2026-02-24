export default function ExamplesSection({ testCases }) {
    if (!testCases || testCases.length === 0) {
        return (
            <div className="text-slate-500 text-center py-8 text-sm">
                No sample test cases available.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {testCases.map((testCase, index) => (
                <div key={testCase.id}>
                    <h4 className="text-xs font-semibold text-white mb-2">
                        Example {index + 1}:
                    </h4>
                    <div className="rounded-lg bg-[#1a1a2e]/60 border border-white/[0.06] p-3.5 space-y-2.5">
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                Input
                            </span>
                            <pre className="mt-1 font-code text-xs text-sky-300 whitespace-pre-wrap">
                                {testCase.input}
                            </pre>
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                Output
                            </span>
                            <pre className="mt-1 font-code text-xs text-emerald-300 whitespace-pre-wrap">
                                {testCase.output}
                            </pre>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
