export default function EditorActions({ onSubmit, submitting, disabled }) {
    return (
        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-end gap-3">
                <button
                    className="px-6 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={onSubmit}
                    disabled={submitting || disabled}
                >
                    {submitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </div>
    );
}
