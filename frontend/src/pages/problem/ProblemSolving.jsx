import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Navbar from "../../components/Navbar";
import { getProblemById, createSubmission, getMySubmissionsForProblem } from "../../api/api";

export default function ProblemSolving() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [code, setCode] = useState("");
    const [activeTab, setActiveTab] = useState("description");
    const [submitting, setSubmitting] = useState(false);
    const [mySubmissions, setMySubmissions] = useState([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);

    useEffect(() => {
        fetchProblem();
        fetchMySubmissions();
    }, [id]);

    // LocalStorage keys for persistence
    const getStorageKey = (suffix) => `problem_${id}_${suffix}`;

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const data = await getProblemById(id);

            setProblem(data);

            // Try to load from localStorage first
            const savedCode = localStorage.getItem(getStorageKey('code'));
            const savedLanguage = localStorage.getItem(getStorageKey('language'));

            if (savedCode && savedLanguage) {
                // Restore from localStorage
                setCode(savedCode);
                setSelectedLanguage(savedLanguage);
            } else if (data.templates && data.templates.length > 0) {
                // Set default language and template
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

    const fetchMySubmissions = async () => {
        try {
            setLoadingSubmissions(true);
            const email = localStorage.getItem("email");
            if (email) {
                const submissions = await getMySubmissionsForProblem(id, email);
                setMySubmissions(submissions);
            }
        } catch (err) {
            console.error("Failed to fetch submissions:", err);
        } finally {
            setLoadingSubmissions(false);
        }
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        // Save to localStorage
        localStorage.setItem(getStorageKey('language'), language);

        const template = problem.templates.find(t => t.language === language);
        if (template) {
            setCode(template.template);
            localStorage.setItem(getStorageKey('code'), template.template);
        }
    };

    const handleEditorChange = (value) => {
        const newCode = value || "";
        setCode(newCode);
        // Save to localStorage on every change
        localStorage.setItem(getStorageKey('code'), newCode);
    };

    const loadSubmissionIntoEditor = (submission) => {
        setCode(submission.code);
        localStorage.setItem(getStorageKey('code'), submission.code);
        // Find matching template language
        const languageName = getLanguageName(submission.languageId);
        setSelectedLanguage(languageName);
        localStorage.setItem(getStorageKey('language'), languageName);
        setActiveTab("description");
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

    const getLanguageId = (language) => {
        const mapping = {
            "Java": 62,
            "Python": 71,
            "JavaScript": 63,
            "C++": 54,
            "C": 50,
            "Go": 60,
            "Rust": 73,
        };
        return mapping[language] || 62;
    };

    const getLanguageName = (languageId) => {
        const mapping = {
            62: "Java",
            71: "Python",
            63: "JavaScript",
            54: "C++",
            50: "C",
            60: "Go",
            73: "Rust",
        };
        return mapping[languageId] || "Unknown";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleSubmit = async () => {
        if (!code.trim()) {
            alert("Please write some code before submitting!");
            return;
        }

        try {
            setSubmitting(true);

            const submission = {
                problemId: parseInt(id),
                languageId: getLanguageId(selectedLanguage),
                code: code,
                email: localStorage.getItem("email"),
            };

            console.log(submission);

            const result = await createSubmission(submission);

            // Navigate to submission results page
            navigate(`/submission/${result.id}`);
        } catch (err) {
            console.error("Submission failed:", err);
            alert(err.message || "Failed to submit code. Please try again.");
        } finally {
            setSubmitting(false);
        }
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
                            <button
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === "solutions"
                                    ? "text-white border-b-2 border-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab("solutions")}
                            >
                                My Solutions ({mySubmissions.length})
                            </button>
                        </div>

                        {/* Content */}
                        {activeTab === "description" ? (
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {problem.description}
                            </div>
                        ) : activeTab === "examples" ? (
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
                        ) : (
                            <div className="space-y-4">
                                {loadingSubmissions ? (
                                    <div className="text-center py-8 text-gray-400">Loading submissions...</div>
                                ) : mySubmissions.length > 0 ? (
                                    mySubmissions.map((submission) => (
                                        <div key={submission.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white font-semibold">#{submission.id}</span>
                                                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${submission.status === 'COMPLETED'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : submission.status === 'FAILED'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {submission.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => navigate(`/submission/${submission.id}`)}
                                                        className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium text-sm border border-zinc-700"
                                                    >
                                                        View Results
                                                    </button>
                                                    <button
                                                        onClick={() => loadSubmissionIntoEditor(submission)}
                                                        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                                                    >
                                                        Load Code
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                <span>{getLanguageName(submission.languageId)}</span>
                                                <span>•</span>
                                                <span>{submission.passedTests || 0}/{submission.totalTests || 0} tests passed</span>
                                                {submission.createdAt && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{formatDate(submission.createdAt)}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No submissions yet. Submit your solution to see it here!
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
                            <button
                                className="px-6 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                onClick={handleSubmit}
                                disabled={submitting || !code.trim()}
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
                </div>
            </div>
        </div>
    );
}
