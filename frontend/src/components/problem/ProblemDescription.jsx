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
                        className="bg-white/[0.05] px-2 py-1 rounded text-sm font-mono text-tech-accent-hover"
                    >
                        {part.slice(1, -1)}
                    </code>
                );
            }
            return part;
        });
    };

    return (
        <div className="px-4 text-sm text-tech-text leading-relaxed space-y-5">
            {sections.map((section, index) => {
                const trimmed = section.trim();

                if (trimmed.toLowerCase().startsWith("constraints")) {
                    const lines = trimmed.split("\n");

                    return (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-tech-accent/5 to-transparent border border-tech-accent/30 p-5"
                        >
                            <h4 className="text-sm font-semibold text-tech-accent uppercase tracking-wider mb-4">
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
                            className="bg-white/[0.03] border border-tech-border rounded-lg p-4 space-y-3"
                        >
                            <h4 className="text-sm font-semibold text-tech-accent tracking-wide">
                                {lines[0]}
                            </h4>

                            <div className="bg-black/40 rounded-md p-3 text-sm font-mono text-tech-text whitespace-pre-wrap">
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