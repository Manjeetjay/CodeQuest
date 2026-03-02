import { ArrowLeft } from "lucide-react";
import { getDifficultyColor } from "../../utils/helpers";

const difficultyBg = {
    EASY: "bg-[#00b8a3]/15 border-[#00b8a3]/30",
    MEDIUM: "bg-[#ffc01e]/15 border-[#ffc01e]/30",
    HARD: "bg-[#ef4743]/15 border-[#ef4743]/30",
};

export default function ProblemHeader({ problem, onBack }) {
    return (
        <div className="mb-4">
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-base text-tech-muted hover:text-white transition-colors mb-3"
            >
                <ArrowLeft className="w-5 h-5" />
                Problems
            </button>

            <h1 className="text-2xl font-semibold text-white leading-tight">
                {problem.problemNumber}. {problem.title}
            </h1>
            <hr className="my-2 border-tech-border" />

            <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                    className={`px-3 py-1 text-base font-semibold rounded-full border ${difficultyBg[problem.difficulty] || ""} ${getDifficultyColor(problem.difficulty)}`}
                >
                    {problem.difficulty}
                </span>
                <br />
                {problem.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-sm bg-white/[0.05] text-tech-muted rounded-full border border-tech-border"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
