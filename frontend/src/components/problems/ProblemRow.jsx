import { getDifficultyColor } from "../../utils/helpers";

export default function ProblemRow({ problem, onClick }) {
    return (
        <tr
            className="border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
            onClick={onClick}
        >
            <td className="px-4 py-4">
                <div className="w-6 h-6 rounded-full border border-white/20"></div>
            </td>
            <td className="px-4 py-4">
                <div className="font-medium text-white hover:text-emerald-200 transition-colors">
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
                                className="px-2 py-1 text-xs bg-white/5 text-slate-300 rounded-full border border-white/10"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-slate-500 text-sm">No tags</span>
                    )}
                </div>
            </td>
        </tr>
    );
}
