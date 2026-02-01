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

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/problems', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (!password) return { score: 0, text: "", color: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 2) return { score, text: "Weak", color: "text-red-500" };
        if (score <= 3) return { score, text: "Medium", color: "text-yellow-500" };
        return { score, text: "Strong", color: "text-green-500" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update password strength when password changes
        if (name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long");
            setLoading(false);
            return;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
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
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>
                        <p className="text-gray-400 text-center mb-8">Start solving problems today</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-zinc-500"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

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
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-3 pr-12 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-zinc-500"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${passwordStrength.score <= 2 ? 'bg-red-500 w-1/3' :
                                                    passwordStrength.score <= 3 ? 'bg-yellow-500 w-2/3' :
                                                        'bg-green-500 w-full'
                                                    }`}
                                            />
                                        </div>
                                        <span className={`text-sm font-medium ${passwordStrength.color}`}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full px-4 py-3 pr-12 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-zinc-500"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? "Creating account..." : "Register"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                            <p className="text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-white font-semibold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
