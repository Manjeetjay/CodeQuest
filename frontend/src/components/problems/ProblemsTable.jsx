import ProblemRow from "./ProblemRow";

export default function ProblemsTable({ problems, onProblemClick }) {
    return (
        <>
            {/* Stats */}
            <div className="mb-4 text-tech-muted text-md">
                Showing {problems.length} problem{problems.length !== 1 ? "s" : ""}
            </div>

            {/* Problems Table - LeetCode Style */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-tech-border">
                        <tr className="text-left text-xs uppercase tracking-[0.2em] text-tech-muted">
                            <th className="px-4 py-3 font-medium w-16">Status</th>
                            <th className="px-4 py-3 font-medium">Title</th>
                            <th className="px-4 py-3 font-medium w-32">Difficulty</th>
                            <th className="px-4 py-3 font-medium hidden md:table-cell">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.length > 0 ? (
                            problems.map((problem) => (
                                <ProblemRow
                                    key={problem.id}
                                    problem={problem}
                                    onClick={() => onProblemClick(problem.id)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-12 text-center text-tech-muted">
                                    No problems found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
