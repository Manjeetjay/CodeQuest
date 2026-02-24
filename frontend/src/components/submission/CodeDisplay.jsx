export default function CodeDisplay({ code }) {
    return (
        <div className="mb-6">
            <h2 className="text-sm font-semibold text-white mb-2">Submitted Code</h2>
            <div className="rounded-lg border border-white/[0.06] bg-[#161b22] p-4 overflow-x-auto">
                <pre className="text-xs text-slate-300 font-code whitespace-pre-wrap leading-relaxed">
                    {code}
                </pre>
            </div>
        </div>
    );
}
