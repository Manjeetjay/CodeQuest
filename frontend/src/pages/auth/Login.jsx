import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ArrowRight } from "lucide-react";
import useDocumentHead from "../../utils/useDocumentHead";

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    useDocumentHead({ title: "Login | CodeQuest", description: "Log in to your CodeQuest account to access coding challenges and track your progress." });
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (isAuthenticated) navigate("/problems", { replace: true }); }, [isAuthenticated, navigate]);

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(""); };

    const handleSubmit = async (e) => {
        e.preventDefault(); setError(""); setLoading(true);
        if (!formData.email || !formData.password) { setError("Please fill in all fields."); setLoading(false); return; }
        const result = await login(formData.email, formData.password);
        if (!result.success) setError(result.error || "Service Unavailable. Try in few minutes.");
        setLoading(false);
    };

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
                            <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h1>
                            <p className="text-xs text-gray-500 text-center">Log in to continue solving problems</p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {error && <div className="border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-xs text-red-300 rounded">{error}</div>}

                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-2">EMAIL</label>
                                    <input type="email" id="email" name="email"
                                        className="w-full border border-[#222] bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#e0e0e0] placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors rounded"
                                        placeholder="you@example.com" value={formData.email} onChange={handleChange} autoComplete="email" required />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-xs font-semibold text-gray-500 mb-2">PASSWORD</label>
                                    <input type="password" id="password" name="password"
                                        className="w-full border border-[#222] bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#e0e0e0] placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors rounded"
                                        placeholder="••••••••" value={formData.password} onChange={handleChange} autoComplete="current-password" required />
                                </div>

                                <button type="submit" className="w-full bg-orange-500 text-black py-3 text-sm font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] flex items-center justify-center gap-2 disabled:opacity-50" disabled={loading}>
                                    {loading ? "Logging in…" : "Login"}{!loading && <ArrowRight className="h-3.5 w-3.5" />}
                                </button>
                            </form>
                        </div>

                        <p className="mt-6 text-center text-xs text-gray-600">
                            No account yet? <Link to="/register" className="text-gray-400 hover:text-orange-500 transition-colors border-b border-gray-600 pb-0.5">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
