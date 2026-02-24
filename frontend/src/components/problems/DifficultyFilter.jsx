export default function DifficultyFilter({ activeFilter, onFilterChange }) {
    const filters = ["ALL", "EASY", "MEDIUM", "HARD"];

    return (
        <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${activeFilter === filter
                            ? "bg-emerald-300 text-slate-900"
                            : "bg-white/5 text-slate-300 border border-white/10 hover:border-emerald-300/40"
                        }`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter === "ALL" ? "All" : filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
            ))}
        </div>
    );
}
