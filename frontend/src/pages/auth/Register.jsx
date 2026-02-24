import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { Code2, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
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
        return { level: s, label: "Strong", color: "bg-emerald-500" };
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
        "w-full rounded-lg border border-white/[0.08] bg-[#0b0f14] px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 transition-colors";

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
                        <h1 className="text-lg font-semibold text-white text-center">Create account</h1>
                        <p className="text-xs text-slate-500 text-center mt-1">
                            Start solving problems today
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {error && (
                                <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300">
                                    {error}
                                </div>
                            )}

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
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
                                <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
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
                                <label htmlFor="password" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                                        aria-label="Toggle password"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${strength.color}`}
                                                style={{ width: `${Math.min((strength.level / 5) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-500">{strength.label}</span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2">
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                                        aria-label="Toggle confirm password"
                                    >
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Creating account…" : "Register"}
                                {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>

                    {/* Footer link */}
                    <p className="mt-6 text-center text-xs text-slate-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
