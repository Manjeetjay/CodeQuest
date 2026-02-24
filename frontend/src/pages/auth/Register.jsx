import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { Eye, EyeOff } from "lucide-react";

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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", color: "" });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/problems", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const checkPasswordStrength = (password) => {
        if (!password) return { score: 0, text: "", color: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 2) return { score, text: "Weak", color: "text-red-400" };
        if (score <= 3) return { score, text: "Medium", color: "text-yellow-400" };
        return { score, text: "Strong", color: "text-emerald-300" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }

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
            setError("Username must be at least 3 characters long.");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const result = await register(formData.username, formData.email, formData.password);

        if (result.success) {
            navigate("/problems");
        } else {
            setError(result.error || "Registration failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <div className="container mx-auto px-6 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="glass-card rounded-2xl p-8">
                        <h1 className="text-3xl font-semibold text-white text-center">Create account</h1>
                        <p className="text-slate-300 text-center mt-2">Start solving problems today.</p>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            {error && (
                                <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="username" className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${passwordStrength.score <= 2
                                                    ? "bg-red-500 w-1/3"
                                                    : passwordStrength.score <= 3
                                                        ? "bg-yellow-400 w-2/3"
                                                        : "bg-emerald-300 w-full"
                                                    }`}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                                        placeholder="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? "Creating account..." : "Register"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-white font-semibold hover:text-emerald-200">
                                Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
