import { useState, useEffect } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { getProblemById } from "../api/api";
import { Token } from "monaco-editor";

export default function ProblemSolving() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [code, setCode] = useState("");
    const [activeTab, setActiveTab] = useState("description");

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const data = await getProblemById(id);

            setProblem(data);

            // Set default language and template
            if (data.templates && data.templates.length > 0) {
                const defaultTemplate = data.templates[0];
                setSelectedLanguage(defaultTemplate.language);
                setCode(defaultTemplate.template);
            }

            setError("");
        } catch (err) {
            console.error("Failed to fetch problem:", err);
            setError("Failed to load problem. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        const template = problem.templates.find(t => t.language === language);
        if (template) {
            setCode(template.template);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value || "");
    };

    const getMonacoLanguage = (lang) => {
        const mapping = {
            "Java": "java",
            "Python": "python",
            "JavaScript": "javascript",
            "C++": "cpp",
            "C": "c",
            "Go": "go",
            "Rust": "rust",
        };
        return mapping[lang] || "plaintext";
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "EASY":
                return "text-[#00b8a3]";
            case "MEDIUM":
                return "text-[#ffc01e]";
            case "HARD":
                return "text-[#ef4743]";
            default:
                return "text-gray-400";
        }
    };

    const sampleTestCases = problem?.testCases?.filter(tc => tc.sample) || [];

    const handleSubmit = () => {
        // convert into json
        const submission = {
            problemId: problem.id,
            language_id: selectedLanguage,
            // encode the code in base64
            source_code: btoa(code),
            email: localStorage.getItem("email"),
        };

        console.log(submission);
        // send this data back to backend


    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-2xl font-semibold text-white">Loading problem...</div>
                </div>
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="text-red-500 text-xl mb-4">{error || "Problem not found"}</div>
                        <button
                            onClick={() => navigate("/problems")}
                            className="px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium"
                        >
                            Back to Problems
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Panel - Problem Description */}
                <div className="w-full md:w-1/2 border-r border-zinc-800 overflow-y-auto">
                    <div className="p-6">
                        {/* Problem Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <button
                                    onClick={() => navigate("/problems")}
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

                        {/* Tabs */}
                        <div className="flex gap-4 border-b border-zinc-800 mb-6">
                            <button
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === "description"
                                    ? "text-white border-b-2 border-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </button>
                            <button
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === "examples"
                                    ? "text-white border-b-2 border-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("examples")}
                            >
                                Examples ({sampleTestCases.length})
                            </button>
                        </div>

                        {/* Content */}
                        {activeTab === "description" ? (
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {problem.description}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sampleTestCases.length > 0 ? (
                                    sampleTestCases.map((testCase, index) => (
                                        <div key={testCase.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                            <div className="font-semibold text-white mb-3">Example {index + 1}</div>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="text-sm text-gray-400 mb-1">Input:</div>
                                                    <div className="bg-black p-3 rounded font-mono text-sm text-white whitespace-pre-wrap">
                                                        {testCase.input}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400 mb-1">Output:</div>
                                                    <div className="bg-black p-3 rounded font-mono text-sm text-white whitespace-pre-wrap">
                                                        {testCase.output}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-center py-8">
                                        No sample test cases available
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-full md:w-1/2 flex flex-col">
                    {/* Language Selector */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-400 font-medium">Language:</label>
                            {problem.templates && problem.templates.length > 0 ? (
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className="px-3 py-1.5 bg-black border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-zinc-500"
                                >
                                    {problem.templates.map((template) => (
                                        <option key={template.id} value={template.language}>
                                            {template.language}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span className="text-sm text-gray-500">No templates available</span>
                            )}
                        </div>
                        <div className="text-xs text-gray-500">Monaco Editor</div>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            language={getMonacoLanguage(selectedLanguage)}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 4,
                                wordWrap: "on",
                            }}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                        <div className="flex items-center justify-end gap-3">
                            {/* <button className="px-6 py-2.5 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors font-medium border border-zinc-700">
                                Run Tests
                            </button> */}
                            <button className="px-6 py-2.5 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
