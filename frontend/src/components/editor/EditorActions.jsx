import { Play } from "lucide-react";

export default function EditorActions({ onSubmit, submitting, disabled }) {
    return (
        <div className="px-4 py-3 border-t border-tech-border bg-tech-panel flex items-center justify-between">
            <span className="text-[16px] text-tech-muted font-code">Monaco Editor</span>
            <button
                className="inline-flex items-center gap-1.5 px-5 py-1.5 bg-white hover:bg-neutral-200 text-black text-sm font-bold uppercase tracking-[0.1em] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
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
