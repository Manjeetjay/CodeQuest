import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { getAllProblems } from "../../api/problemApi";
import { clearCache } from "../../utils/cache";
import { useAuth } from "../../context/AuthContext";
import { Search, RefreshCw, ArrowRight } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";
import { getDifficultyColor } from "../../utils/helpers";

const difficultyBg = { EASY: "bg-[#00b8a3]/10", MEDIUM: "bg-[#ffc01e]/10", HARD: "bg-[#ef4743]/10", };

export default function Problems() {
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();

    useDocumentHead({ title: "Problems | CodeQuest" });

    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("ALL");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    /* ---------------- AUTH + FETCH ---------------- */
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchProblems();
        } else if (!authLoading && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [authLoading, isAuthenticated]);

    const fetchProblems = async (fromNetwork = false) => {
        try {
            setLoading(true);
            const data = await getAllProblems(fromNetwork);
            setProblems(data);
            setError("");
        } catch (err) {
            console.error("Failed to fetch problems:", err);
            setError("Failed to load problems.");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        clearCache("all_problems");
        fetchProblems(true);
    };

    /* ---------------- FILTERING ---------------- */
    useEffect(() => {
        let filtered = problems;

        if (search) {
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(search.toLowerCase()) ||
                    p.id.toString().includes(search)
            );
        }

        if (difficulty !== "ALL") {
            filtered = filtered.filter(
                (p) => p.difficulty === difficulty
            );
        }

        setFilteredProblems(filtered);
    }, [search, difficulty, problems]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, difficulty]);

    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.ceil(
        filteredProblems.length / ITEMS_PER_PAGE
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const paginatedProblems = filteredProblems.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    if (loading) return (
        <div className="min-h-screen bg-tech-bg text-tech-text">
            <Navbar />
            <LoadingSpinner message="Loading problems..." />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-tech-bg text-tech-text">
            <Navbar />
            <ErrorMessage message={error} onAction={handleRefresh} actionText="Retry" />
        </div>
    );

    return (
        <div className="min-h-screen bg-tech-bg text-tech-text">
            <Navbar />

            <main className="container mx-auto max-w-5xl px-6 py-12">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">Problems</h1>
                        <p className="text-sm text-tech-muted mt-0.5">
                            {filteredProblems.length} of {problems.length} shown
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="btn-outline btn-sm"
                        title="Refresh"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-tech-muted" />
                        <input
                            type="text"
                            placeholder="Search by title or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-tech-panel border border-tech-border rounded-tech text-xs text-tech-text placeholder:text-tech-muted focus:outline-none focus:border-tech-accent/50"
                        />
                    </div>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="px-3 py-2 bg-tech-panel border border-tech-border rounded-tech text-xs text-tech-text focus:outline-none focus:border-tech-accent/50 cursor-pointer"
                        style={{ appearance: "auto", WebkitAppearance: "menulist", MozAppearance: "menulist" }}
                    >
                        <option value="ALL" className="bg-tech-bg">All Difficulty</option>
                        <option value="EASY" className="bg-tech-bg">Easy</option>
                        <option value="MEDIUM" className="bg-tech-bg">Medium</option>
                        <option value="HARD" className="bg-tech-bg">Hard</option>
                    </select>
                </div>

                {filteredProblems.length === 0 ? (
                    <div className="rounded-tech border border-tech-border bg-tech-panel/50 p-12 text-center">
                        <p className="text-tech-muted text-md">
                            No problems match your filter.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        {paginatedProblems.map((problem) => (
                            <Link
                                key={problem.id}
                                to={`/problem/${problem.id}`}
                                className="group flex items-center justify-between rounded-tech border border-tech-border bg-tech-panel/50 px-4 py-3 hover:border-tech-border-hover hover:bg-tech-panel transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-tech-muted font-code w-6">
                                        {problem.problemNumber}
                                    </span>

                                    <span className="text-base font-medium text-tech-text group-hover:text-tech-accent transition-colors">
                                        {problem.title}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[12px] font-semibold ${difficultyBg[problem.difficulty] || ""} ${getDifficultyColor(problem.difficulty)}`}
                                    >
                                        {problem.difficulty}
                                    </span>

                                    <ArrowRight className="w-3.5 h-3.5 text-tech-muted group-hover:text-tech-accent transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                        {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">

                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-tech border border-tech-border disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-tech border ${
                                    currentPage === page
                                        ? "bg-tech-panel text-white"
                                        : "border-tech-border"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-tech border border-tech-border disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}