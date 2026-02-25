export default function ProblemTabs({ activeTab, onTabChange, examplesCount, submissionsCount }) {
    const tabs = [
        { id: "description", label: "Description" },
        { id: "examples", label: `Examples (${examplesCount})` },
        { id: "solutions", label: `Submissions (${submissionsCount})` },
    ];

    return (
        <div className="flex gap-1 mb-5 border-b border-white/10 pb-0">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab.id
                            ? "text-white"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
