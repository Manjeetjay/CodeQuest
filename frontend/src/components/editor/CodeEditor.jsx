import Editor from "@monaco-editor/react";
import { DEFAULT_EDITOR_OPTIONS } from "../../utils/constants";
import { getMonacoLanguage } from "../../utils/helpers";
import LanguageSelector from "./LanguageSelector";
import EditorActions from "./EditorActions";

export default function CodeEditor({
    code,
    language,
    templates,
    onCodeChange,
    onLanguageChange,
    onSubmit,
    submitting,
}) {
    return (
        <div className="w-full md:flex-1 flex flex-col bg-[#0d1117]">
            {/* Top toolbar — LeetCode style */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-[#161b22]">
                <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Currently We Support Java Only!!</span>
                </div>
                {/* <LanguageSelector
                    value={language}
                    templates={templates}
                    onChange={onLanguageChange}
                /> */}
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    language="java"
                    value={code}
                    onChange={onCodeChange}
                    theme="vs-dark"
                    wordBasedSuggestionsOnlySameLanguage={true}
                    options={{
                        ...DEFAULT_EDITOR_OPTIONS,
                        padding: { top: 14 },
                    }}
                />
            </div>

            {/* Bottom action bar */}
            <EditorActions
                onSubmit={onSubmit}
                submitting={submitting}
                disabled={!code.trim()}
            />
        </div>
    );
}
