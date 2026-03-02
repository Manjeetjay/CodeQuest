export default function DifficultyFilter({ activeFilter, onFilterChange }) {
    const filters = ["ALL", "EASY", "MEDIUM", "HARD"];

    return (
        <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${activeFilter === filter
                        ? "bg-tech-accent text-black"
                        : "bg-white/[0.05] text-tech-text border border-tech-border hover:border-tech-accent/40"
                        }`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter === "ALL" ? "All" : filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
            ))}
        </div>
    );
}
