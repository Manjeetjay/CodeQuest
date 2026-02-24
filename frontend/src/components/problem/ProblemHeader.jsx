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
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-3"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Problems
            </button>

            <h1 className="text-xl font-semibold text-white leading-tight">
                {problem.id}. {problem.title}
            </h1>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${difficultyBg[problem.difficulty] || ""} ${getDifficultyColor(problem.difficulty)}`}
                >
                    {problem.difficulty}
                </span>
                {problem.tags?.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] bg-white/5 text-slate-400 rounded-full border border-white/10"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
