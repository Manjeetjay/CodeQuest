import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ErrorMessage from "../../components/shared/ErrorMessage";
import ProblemHeader from "../../components/problem/ProblemHeader";
import ProblemTabs from "../../components/problem/ProblemTabs";
import ProblemDescription from "../../components/problem/ProblemDescription";
import ExamplesSection from "../../components/problem/ExamplesSection";
import SubmissionsList from "../../components/problem/SubmissionsList";
import CodeEditor from "../../components/editor/CodeEditor";
import { getProblemById, createSubmission, getMySubmissionsForProblem } from "../../api/api";
import { getLanguageId, getLanguageName } from "../../utils/helpers";

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
            const savedCode = localStorage.getItem(getStorageKey("code"));
            const savedLanguage = localStorage.getItem(getStorageKey("language"));

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
        localStorage.setItem(getStorageKey("language"), language);

        const template = problem.templates.find((t) => t.language === language);
        if (template) {
            setCode(template.template);
            localStorage.setItem(getStorageKey("code"), template.template);
        }
    };

    const handleEditorChange = (value) => {
        const newCode = value || "";
        setCode(newCode);
        localStorage.setItem(getStorageKey("code"), newCode);
    };

    const loadSubmissionIntoEditor = (submission) => {
        setCode(submission.code);
        localStorage.setItem(getStorageKey("code"), submission.code);

        const languageName = getLanguageName(submission.languageId);
        setSelectedLanguage(languageName);
        localStorage.setItem(getStorageKey("language"), languageName);
        setActiveTab("description");
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
            navigate(`/submission/${result.id}`);
        } catch (err) {
            console.error("Submission failed:", err);
            alert(err.message || "Failed to submit code. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleViewResults = (submissionId) => {
        navigate(`/submission/${submissionId}`);
    };

    const sampleTestCases = problem?.testCases?.filter((tc) => tc.sample) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <LoadingSpinner message="Loading problem..." />
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <ErrorMessage
                    message={error || "Problem not found"}
                    onAction={() => navigate("/problems")}
                    actionText="Back to Problems"
                />
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
                        <ProblemHeader problem={problem} onBack={() => navigate("/problems")} />

                        <ProblemTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            examplesCount={sampleTestCases.length}
                            submissionsCount={mySubmissions.length}
                        />

                        {activeTab === "description" && (
                            <ProblemDescription description={problem.description} />
                        )}

                        {activeTab === "examples" && <ExamplesSection testCases={sampleTestCases} />}

                        {activeTab === "solutions" && (
                            <SubmissionsList
                                submissions={mySubmissions}
                                loading={loadingSubmissions}
                                onViewResults={handleViewResults}
                                onLoadCode={loadSubmissionIntoEditor}
                            />
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <CodeEditor
                    code={code}
                    language={selectedLanguage}
                    templates={problem.templates}
                    onCodeChange={handleEditorChange}
                    onLanguageChange={handleLanguageChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                />
            </div>
        </div>
    );
}
