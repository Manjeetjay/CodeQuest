import { useEffect } from "react";

export default function LanguageSelector({ value, templates, onChange }) {

    if (!templates || templates.length === 0) {
        return (
            <span className="px-2 py-1 bg-white/5 border border-white/[0.08] rounded text-slate-200 text-xs">
                Java
            </span>
        );
    }

    useEffect(() => {
        const exists = templates.some(t => t.language === value);

        if (!exists) {
            onChange(templates[0].language);
        }
    }, [value, templates, onChange]);

    return (
        <select
            value={value || templates[0].language}
            onChange={(e) => onChange(e.target.value)}
            className="min-w-[80px] px-2 py-1 border border-white/[0.08] rounded text-xs focus:outline-none focus:border-emerald-400/50 cursor-pointer"
            style={{
                appearance: "auto",
                WebkitAppearance: "menulist",
                MozAppearance: "menulist",
                backgroundColor: "#000000ff",
                color: "#ffffffff",
            }}
        >
            {templates.map((template) => (
                <option
                    key={template.id}
                    value={template.language}
                    style={{ backgroundColor: "#0d1117", color: "#ffffff" }}
                >
                    {template.language}
                </option>
            ))}
        </select>
    );
}