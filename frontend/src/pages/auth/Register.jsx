import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";

export default function Register() {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    useDocumentHead({ title: "Create Account | CodeQuest", description: "Sign up for CodeQuest – create your free account and start solving coding challenges today." });
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [strength, setStrength] = useState({ level: 0, label: "", color: "" });

    useEffect(() => { if (isAuthenticated) navigate("/problems", { replace: true }); }, [isAuthenticated, navigate]);

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
        return { level: s, label: "Strong", color: "bg-orange-500" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "password") setStrength(checkStrength(value));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setError(""); setLoading(true);
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) { setError("Please fill in all fields."); setLoading(false); return; }
        if (formData.username.length < 3) { setError("Username must be at least 3 characters."); setLoading(false); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError("Please enter a valid email address."); setLoading(false); return; }
        if (formData.password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
        if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); setLoading(false); return; }
        const result = await register(formData.username, formData.email, formData.password);
        if (!result.success) setError(result.error || "Service Unavailable. Try in few minutes.");
        setLoading(false);
    };

    const inputClass = "w-full border border-[#222] bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#e0e0e0] placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors rounded";

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
            <div className="fixed inset-0 bg-grid-minimal pointer-events-none opacity-30" />
            <div className="relative z-10">
                <Navbar />
                <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center min-h-[85vh]">
                    <div className="w-full max-w-sm animate-fade-up">
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-black font-bold text-lg rounded-sm">&gt;_</div>
                            <span className="text-xl font-bold text-orange-500">CodeQuest</span>
                        </div>

                        <div className="border border-[#1a1a1a] bg-[#111] p-8 rounded-lg">
                            <h1 className="text-2xl font-bold text-white text-center mb-1">Create Account</h1>
                            <p className="text-xs text-gray-500 text-center">Start solving problems today</p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {error && <div className="border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300 rounded">{error}</div>}

                                <div>
                                    <label htmlFor="username" className="block text-xs font-semibold text-gray-500 mb-2">USERNAME</label>
                                    <input type="text" id="username" name="username" className={inputClass} placeholder="johndoe" value={formData.username} onChange={handleChange} autoComplete="username" required />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-2">EMAIL</label>
                                    <input type="email" id="email" name="email" className={inputClass} placeholder="you@example.com" value={formData.email} onChange={handleChange} autoComplete="email" required />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-xs font-semibold text-gray-500 mb-2">PASSWORD</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} id="password" name="password" className={`${inputClass} pr-10`} placeholder="••••••••" value={formData.password} onChange={handleChange} autoComplete="new-password" required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors" aria-label="Toggle password">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {formData.password && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex-1 h-0.5 bg-white/[0.06] overflow-hidden rounded-full">
                                                <div className={`h-full transition-all ${strength.color}`} style={{ width: `${Math.min((strength.level / 5) * 100, 100)}%` }} />
                                            </div>
                                            <span className="text-[10px] font-semibold text-gray-500">{strength.label}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-500 mb-2">CONFIRM PASSWORD</label>
                                    <div className="relative">
                                        <input type={showConfirm ? "text" : "password"} id="confirmPassword" name="confirmPassword" className={`${inputClass} pr-10`} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors" aria-label="Toggle confirm password">
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-orange-500 text-black py-3 text-sm font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] flex items-center justify-center gap-2 disabled:opacity-50" disabled={loading}>
                                    {loading ? "Creating account…" : "Register"}{!loading && <ArrowRight className="h-3.5 w-3.5" />}
                                </button>
                            </form>
                        </div>

                        <p className="mt-6 text-center text-xs text-gray-600">
                            Already have an account? <Link to="/login" className="text-gray-400 hover:text-orange-500 transition-colors border-b border-gray-600 pb-0.5">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
