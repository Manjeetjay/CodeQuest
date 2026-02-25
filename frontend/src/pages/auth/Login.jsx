import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { Code2, ArrowRight, Eye, EyeOff } from "lucide-react";
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
            setError(result.error || "Login failed. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <div className="container mx-auto px-6 py-16 flex items-center justify-center">
                <div className="w-full max-w-sm">
                    {/* Logo mark */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Code2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm font-semibold tracking-tight text-white">CodeQuest</span>
                    </div>

                    {/* Card */}
                    <div className="border border-white/[0.06] rounded-xl bg-[#111318] p-8">
                        <h1 className="text-lg font-semibold text-white text-center">Welcome back</h1>
                        <p className="text-xs text-slate-500 text-center mt-1">
                            Log in to continue solving problems
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {error && (
                                <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full rounded-lg border border-white/[0.08] bg-[#0b0f14] px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full rounded-lg border border-white/[0.08] bg-[#0b0f14] px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Logging in…" : "Login"}
                                {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>

                    {/* Footer link */}
                    <p className="mt-6 text-center text-xs text-slate-600">
                        No account yet?{" "}
                        <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
