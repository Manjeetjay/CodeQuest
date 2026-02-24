import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/problems", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

        if (result.success) {
            navigate("/problems");
        } else {
            setError(result.error || "Login failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <div className="container mx-auto px-6 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="glass-card rounded-2xl p-8">
                        <h1 className="text-3xl font-semibold text-white text-center">Welcome back</h1>
                        <p className="text-slate-300 text-center mt-2">
                            Log in to continue your coding journey.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            {error && (
                                <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

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
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-300/60"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
                            No account yet?{" "}
                            <Link to="/register" className="text-white font-semibold hover:text-emerald-200">
                                Register here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
