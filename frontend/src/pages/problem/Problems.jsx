import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllProblems } from "../../api/api";

export default function Problems() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const data = await getAllProblems();
            setProblems(data);
            setError("");
        } catch (err) {
            console.error("Failed to fetch problems:", err);
            setError("Failed to load problems. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // if All is selected sort by id else sort by title
    const filteredProblems = problems
        .filter((problem) => {
            const matchesDifficulty =
                filter === "ALL" || problem.difficulty === filter;

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


    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "EASY":
                return "text-[#00b8a3]";
            case "MEDIUM":
                return "text-[#ffc01e]";
            case "HARD":
                return "text-[#ef4743]";
            default:
                return "text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Problems</h1>
                    <p className="text-gray-400">
                        Master your skills with algorithmic challenges
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                            placeholder="Search problems..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "ALL"
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-gray-400 border border-zinc-700 hover:border-zinc-500"
                                }`}
                            onClick={() => setFilter("ALL")}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "EASY"
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-gray-400 border border-zinc-700 hover:border-zinc-500"
                                }`}
                            onClick={() => setFilter("EASY")}
                        >
                            Easy
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "MEDIUM"
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-gray-400 border border-zinc-700 hover:border-zinc-500"
                                }`}
                            onClick={() => setFilter("MEDIUM")}
                        >
                            Medium
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "HARD"
                                ? "bg-white text-black"
                                : "bg-zinc-900 text-gray-400 border border-zinc-700 hover:border-zinc-500"
                                }`}
                            onClick={() => setFilter("HARD")}
                        >
                            Hard
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-xl text-gray-400">Loading problems...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Problems List */}
                {!loading && !error && (
                    <>
                        {/* Stats */}
                        <div className="mb-4 text-gray-400">
                            Showing {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
                        </div>

                        {/* Problems Table - LeetCode Style */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="border-b border-zinc-800">
                                    <tr className="text-left text-sm text-gray-400">
                                        <th className="px-4 py-3 font-medium w-16">Status</th>
                                        <th className="px-4 py-3 font-medium">Title</th>
                                        <th className="px-4 py-3 font-medium w-32">Difficulty</th>
                                        <th className="px-4 py-3 font-medium hidden md:table-cell">Tags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProblems.length > 0 ? (
                                        filteredProblems.map((problem) => (
                                            <tr
                                                key={problem.id}
                                                className="border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                                                onClick={() => navigate(`/problem/${problem.id}`)}
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="w-6 h-6 rounded-full border-2 border-zinc-600"></div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-white hover:text-blue-400 transition-colors">
                                                        {problem.id}. {problem.title}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 hidden md:table-cell">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {problem.tags && problem.tags.length > 0 ? (
                                                            problem.tags.map((tag, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-2 py-1 text-xs bg-zinc-800 text-gray-400 rounded"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-600 text-sm">No tags</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-12 text-center text-gray-500">
                                                No problems found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
