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
            className="px-3 py-1.5 bg-black border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-zinc-500"
        >
            {templates.map((template) => (
                <option key={template.id} value={template.language}>
                    {template.language}
                </option>
            ))}
        </select>
    );
}
