export default function ProblemDescription({ description }) {
    if (!description) return null;

    const sections = description.split("\n\n");

    const renderInlineCode = (text) => {
        const parts = text.split(/(`[^`]+`)/g);

        return parts.map((part, index) => {
            if (part.startsWith("`") && part.endsWith("`")) {
                return (
                    <code
                        key={index}
                        className="bg-white/5 px-2 py-1 rounded text-sm font-mono text-emerald-300"
                    >
                        {part.slice(1, -1)}
                    </code>
                );
            }
            return part;
        });
    };

    return (
        <div className="px-4 text-sm text-slate-300 leading-relaxed space-y-5">
            {sections.map((section, index) => {
                const trimmed = section.trim();

                if (trimmed.toLowerCase().startsWith("constraints")) {
                    const lines = trimmed.split("\n");

                    return (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 rounded-xl p-5"
                        >
                            <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                                {lines[0]}
                            </h4>

                            <div className="grid gap-2 ps-2">
                                {lines.slice(1).map((line, i) => (
                                    <p key={i}>  {line.replace(/^[•]\s*/, "")}</p>
                                ))}
                            </div>
                        </div>
                    );
                }

                if (trimmed.toLowerCase().startsWith("example")) {
                    const lines = trimmed.split("\n");

                    return (
                        <div
                            key={index}
                            className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 space-y-3"
                        >
                            <h4 className="text-sm font-semibold text-emerald-400 tracking-wide">
                                {lines[0]}
                            </h4>

                            <div className="bg-black/40 rounded-md p-3 text-sm font-mono text-slate-300 whitespace-pre-wrap">
                                {lines.slice(1).join("\n")}
                            </div>
                        </div>
                    );
                }

                return (
                    <p key={index} className="whitespace-pre-wrap">
                        {renderInlineCode(trimmed)}
                    </p>
                );
            })}
        </div>
    );
}