import { Play } from "lucide-react";

export default function EditorActions({ onSubmit, submitting, disabled }) {
    return (
        <div className="px-3 py-2.5 border-t border-white/[0.06] bg-[#161b22] flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-code">Monaco Editor</span>
            <button
                className="inline-flex items-center gap-1.5 px-5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold rounded-md transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                onClick={onSubmit}
                disabled={submitting || disabled}
            >
                {submitting ? (
                    <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Play className="w-3 h-3" />
                        Submit
                    </>
                )}
            </button>
        </div>
    );
}
