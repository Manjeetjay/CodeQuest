export default function ProblemTabs({ activeTab, onTabChange, examplesCount, submissionsCount }) {
    const tabs = [
        { id: "description", label: "Description" },
        { id: "examples", label: `Examples (${examplesCount})` },
        { id: "solutions", label: `My Solutions (${submissionsCount})` },
    ];

    return (
        <div className="flex gap-4 border-b border-zinc-800 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === tab.id
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
