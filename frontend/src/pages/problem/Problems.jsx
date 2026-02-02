import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ProblemsHeader from "../../components/problems/ProblemsHeader";
import SearchBar from "../../components/problems/SearchBar";
import DifficultyFilter from "../../components/problems/DifficultyFilter";
import ProblemsTable from "../../components/problems/ProblemsTable";
import { getAllProblems } from "../../api/api";
import { getCache, setCache } from "../../utils/cache";

export default function Problems() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async (forceRefresh = false) => {
        try {
            setLoading(true);

            // Check cache first unless force refresh
            if (!forceRefresh) {
                const cached = getCache("problems_list");
                if (cached) {
                    setProblems(cached);
                    setLoading(false);
                    return;
                }
            }

            // Fetch from API
            const data = await getAllProblems();
            setProblems(data);
            setError("");

            // Store in cache (1 hour expiration)
            setCache("problems_list", data, 60 * 60 * 1000);
        } catch (err) {
            console.error("Failed to fetch problems:", err);
            setError("Failed to load problems. Please try again later.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProblems(true);
    };

    // Filter problems based on difficulty and search term
    const filteredProblems = problems
        .filter((problem) => {
            const matchesDifficulty = filter === "ALL" || problem.difficulty === filter;

            const matchesSearch =
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (problem.tags &&
                    problem.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                    ));

            return matchesDifficulty && matchesSearch;
        })
        .sort((a, b) => {
            if (filter !== "ALL") return a.id - b.id;
            return a.title.localeCompare(b.title, undefined, {
                sensitivity: "base",
            });
        });

    const handleProblemClick = (problemId) => {
        navigate(`/problem/${problemId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <LoadingSpinner message="Loading problems..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Problems</h1>
                        <p className="text-gray-400">Master your skills with algorithmic challenges</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700 disabled:opacity-50 flex items-center gap-2"
                        title="Refresh problems list"
                    >
                        <svg
                            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    <DifficultyFilter activeFilter={filter} onFilterChange={setFilter} />
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Problems Table */}
                {!error && (
                    <ProblemsTable problems={filteredProblems} onProblemClick={handleProblemClick} />
                )}
            </main>
        </div>
    );
}
