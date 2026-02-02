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
                <ProblemsHeader />

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
