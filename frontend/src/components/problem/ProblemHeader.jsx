import { getDifficultyColor } from "../../utils/helpers";

export default function ProblemHeader({ problem, onBack }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold text-white">
                    {problem.id}. {problem.title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <span className={`font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                </span>
                {problem.tags && problem.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {problem.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs bg-zinc-800 text-gray-400 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
