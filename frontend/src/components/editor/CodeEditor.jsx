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
        <div className="w-full md:w-1/2 flex flex-col">
            {/* Language Selector */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-400 font-medium">Language:</label>
                    <LanguageSelector
                        value={language}
                        templates={templates}
                        onChange={onLanguageChange}
                    />
                </div>
                <div className="text-xs text-gray-500">Monaco Editor</div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={getMonacoLanguage(language)}
                    value={code}
                    onChange={onCodeChange}
                    theme="vs-dark"
                    options={DEFAULT_EDITOR_OPTIONS}
                />
            </div>

            {/* Action Buttons */}
            <EditorActions
                onSubmit={onSubmit}
                submitting={submitting}
                disabled={!code.trim()}
            />
        </div>
    );
}
