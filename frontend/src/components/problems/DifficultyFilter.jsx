export default function DifficultyFilter({ activeFilter, onFilterChange }) {
    const filters = ["ALL", "EASY", "MEDIUM", "HARD"];

    return (
        <div className="flex gap-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter
                            ? "bg-white text-black"
                            : "bg-zinc-900 text-gray-400 border border-zinc-700 hover:border-zinc-500"
                        }`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter === "ALL" ? "All" : filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
            ))}
        </div>
    );
}
