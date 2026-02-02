export default function LanguageSelector({ value, templates, onChange }) {
    if (!templates || templates.length === 0) {
        return (
            <span className="text-sm text-gray-500">
                We currently only support java. Sorry for inconvenience.
            </span>
        );
    }

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-zinc-500 hover:bg-zinc-700 cursor-pointer"
            style={{
                appearance: "auto",
                WebkitAppearance: "menulist",
                MozAppearance: "menulist"
            }}
        >
            {templates.map((template) => (
                <option
                    key={template.id}
                    value={template.language}
                    className="bg-zinc-800 text-white py-2"
                >
                    {template.language}
                </option>
            ))}
        </select>
    );
}
