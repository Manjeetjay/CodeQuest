import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { Code2, ArrowRight } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    useDocumentHead({
        title: "Login | CodeQuest",
        description: "Log in to your CodeQuest account to access coding challenges and track your progress.",
    });
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/problems", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        const result = await login(formData.email, formData.password);
        if (!result.success) {
            setError(result.error || "Service Unavailable. Try in few minutes.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-tech-bg text-tech-text overflow-hidden relative font-sans">
            <Navbar />

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] opacity-30"></div>

            <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[85vh]">
                <div className="w-full max-w-sm animate-fade-up">
                    {/* Logo mark */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        <Code2 className="h-5 w-5 text-tech-accent" />
                        <span className="heading-editorial text-xl text-tech-accent">CodeQuest.</span>
                    </div>

                    {/* Card */}
                    <div className="border border-tech-border/30 bg-tech-panel p-8">
                        <h1 className="heading-display text-2xl text-white text-center mb-1">WELCOME BACK</h1>
                        <p className="text-xs text-tech-muted text-center font-light">
                            Log in to continue solving problems
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {error && (
                                <div className="border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full border border-tech-border/30 bg-tech-bg px-3.5 py-2.5 text-sm text-tech-text placeholder-slate-600 focus:outline-none focus:border-tech-accent/30 transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full border border-tech-border/30 bg-tech-bg px-3.5 py-2.5 text-sm text-tech-text placeholder-slate-600 focus:outline-none focus:border-tech-accent/30 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary justify-center disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Logging in…" : "Login"}
                                {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>

                    {/* Footer link */}
                    <p className="mt-6 text-center text-xs text-tech-muted/60">
                        No account yet?{" "}
                        <Link to="/register" className="text-tech-muted hover:text-white transition-colors border-b border-tech-muted/30 pb-0.5">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
