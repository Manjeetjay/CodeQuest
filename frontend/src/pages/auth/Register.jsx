import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { Code2, ArrowRight, Eye, EyeOff } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    useDocumentHead({
        title: "Create Account | CodeQuest",
        description: "Sign up for CodeQuest – create your free account and start solving coding challenges today.",
    });
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [strength, setStrength] = useState({ level: 0, label: "", color: "" });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/problems", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const checkStrength = (pw) => {
        if (!pw) return { level: 0, label: "", color: "" };
        let s = 0;
        if (pw.length >= 8) s++;
        if (pw.length >= 12) s++;
        if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
        if (/\d/.test(pw)) s++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pw)) s++;
        if (s <= 2) return { level: s, label: "Weak", color: "bg-red-500" };
        if (s <= 3) return { level: s, label: "Medium", color: "bg-yellow-500" };
        return { level: s, label: "Strong", color: "bg-tech-accent" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "password") setStrength(checkStrength(value));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }
        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters.");
            setLoading(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const result = await register(formData.username, formData.email, formData.password);
        if (!result.success) {
            setError(result.error || "Registration failed. Please try again.");
        }
        setLoading(false);
    };

    const inputClass =
        "w-full border border-tech-border/30 bg-tech-bg px-3.5 py-2.5 text-sm text-tech-text placeholder-slate-600 focus:outline-none focus:border-tech-accent/30 transition-colors";

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
                        <h1 className="heading-display text-2xl text-white text-center mb-1">CREATE ACCOUNT</h1>
                        <p className="text-xs text-tech-muted text-center font-light">
                            Start solving problems today
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {error && (
                                <div className="border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300">
                                    {error}
                                </div>
                            )}

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={inputClass}
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={inputClass}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className={`${inputClass} pr-10`}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-tech-muted transition-colors"
                                        aria-label="Toggle password"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-0.5 bg-white/[0.06] overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${strength.color}`}
                                                style={{ width: `${Math.min((strength.level / 5) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-tech-muted uppercase tracking-wider">{strength.label}</span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-tech-muted mb-2">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className={`${inputClass} pr-10`}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-tech-muted transition-colors"
                                        aria-label="Toggle confirm password"
                                    >
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary justify-center disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Creating account…" : "Register"}
                                {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>

                    {/* Footer link */}
                    <p className="mt-6 text-center text-xs text-tech-muted/60">
                        Already have an account?{" "}
                        <Link to="/login" className="text-tech-muted hover:text-white transition-colors border-b border-tech-muted/30 pb-0.5">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
