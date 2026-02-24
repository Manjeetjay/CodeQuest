export default function ProblemDescription({ description }) {
    if (!description) return null;

    // Split description into paragraphs and render with proper spacing
    const paragraphs = description.split(/\n\n+/);

    return (
        <div className="text-sm text-slate-300 leading-relaxed space-y-3">
            {paragraphs.map((para, i) => {
                // Check if it looks like a constraints block
                const isConstraints = para.toLowerCase().startsWith("constraints");
                if (isConstraints) {
                    const lines = para.split("\n");
                    return (
                        <div key={i} className="mt-4">
                            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                                {lines[0]}
                            </h4>
                            <ul className="space-y-1 text-slate-400">
                                {lines.slice(1).map((line, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-emerald-400 mt-0.5">•</span>
                                        <code className="text-xs font-code bg-white/5 px-1.5 py-0.5 rounded">
                                            {line.replace(/^[-•]\s*/, "")}
                                        </code>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }

                return (
                    <p key={i} className="whitespace-pre-wrap">
                        {para}
                    </p>
                );
            })}
        </div>
    );
}
