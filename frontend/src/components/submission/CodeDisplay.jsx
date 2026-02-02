export default function CodeDisplay({ code }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Submitted Code</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap overflow-x-auto">
                    {code}
                </pre>
            </div>
        </div>
    );
}
