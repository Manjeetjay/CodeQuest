import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { getAllProblems } from "../../api/api";
import { getDifficultyColor } from "../../utils/helpers";
import { getCache, setCache, clearCache } from "../../utils/cache";
import { useAuth } from "../../context/AuthContext";
import { Search, RefreshCw, ArrowRight } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";

const difficultyBg = {
    EASY: "bg-[#00b8a3]/10",
    MEDIUM: "bg-[#ffc01e]/10",
    HARD: "bg-[#ef4743]/10",
};

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

    // Only fetch problems after auth is fully loaded and user is authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchProblems();
        } else if (!authLoading && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [authLoading, isAuthenticated]);

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
            filtered = filtered.filter((p) => p.difficulty === difficulty);
        }
        setFilteredProblems(filtered);
    }, [search, difficulty, problems]);

    const fetchProblems = async (fromNetwork = false) => {
        try {
            setLoading(true);
            const cacheKey = "all_problems";
            const cached = !fromNetwork && getCache(cacheKey);
            let data;

            if (cached) {
                data = cached;
            } else {
                data = await getAllProblems();
                setCache(cacheKey, data, 30 * 60 * 1000);
            }

            setProblems(data);
            setFilteredProblems(data);
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

    if (loading) return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />
            <LoadingSpinner message="Loading problems..." />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />
            <ErrorMessage message={error} onAction={handleRefresh} actionText="Retry" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-5xl px-6 py-12">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">Problems</h1>
                        <p className="text-xs text-slate-500 mt-0.5">
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by title or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-[#161b22] border border-white/[0.06] rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
                        />
                    </div>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="px-3 py-2 bg-[#161b22] border border-white/[0.06] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400/50 cursor-pointer"
                        style={{ appearance: "auto", WebkitAppearance: "menulist", MozAppearance: "menulist" }}
                    >
                        <option value="ALL" className="bg-[#0d1117]">All Difficulty</option>
                        <option value="EASY" className="bg-[#0d1117]">Easy</option>
                        <option value="MEDIUM" className="bg-[#0d1117]">Medium</option>
                        <option value="HARD" className="bg-[#0d1117]">Hard</option>
                    </select>
                </div>

                {/* Problem list */}
                {filteredProblems.length === 0 ? (
                    <div className="rounded-xl border border-white/[0.06] bg-[#0f141c]/50 p-12 text-center">
                        <p className="text-slate-500 text-sm">No problems match your filter.</p>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        {filteredProblems.map((problem) => (
                            <Link
                                key={problem.id}
                                to={`/problem/${problem.id}`}
                                className="group flex items-center justify-between rounded-lg border border-white/[0.04] bg-[#161b22]/50 px-4 py-3 hover:border-white/10 hover:bg-[#161b22] transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 font-code w-6">
                                        {problem.id}
                                    </span>
                                    <span className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                                        {problem.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${difficultyBg[problem.difficulty] || ""} ${getDifficultyColor(problem.difficulty)}`}
                                    >
                                        {problem.difficulty}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
