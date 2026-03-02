export default function CodeDisplay({ code }) {
    return (
        <div className="mb-6">
            <h2 className="text-sm font-semibold text-white mb-2">Submitted Code</h2>
            <div className="rounded-lg border border-tech-border bg-tech-panel p-4 overflow-x-auto">
                <pre className="text-xs text-tech-text font-code whitespace-pre-wrap leading-relaxed">
                    {code}
                </pre>
            </div>
        </div>
    );
}
