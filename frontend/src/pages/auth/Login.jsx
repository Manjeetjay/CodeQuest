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

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/problems', { replace: true });
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
            setError("Please fill in all fields");
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
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-center mb-8">Log in to continue your coding journey</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-zinc-500"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-zinc-500"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-white font-semibold hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
