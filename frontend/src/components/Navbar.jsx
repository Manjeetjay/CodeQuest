import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, auth, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
        setMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-white hover:opacity-70 transition-opacity">
                        Code Conquest
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                            Contact Us
                        </Link>
                        <Link to="/guidelines" className="text-gray-300 hover:text-white transition-colors">
                            Guidelines
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/problems"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Problems
                                </Link>
                                <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded text-sm font-medium text-white">
                                    {auth?.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="px-4 py-2 bg-zinc-900 text-white border border-zinc-700 rounded hover:border-zinc-500 transition-colors font-medium">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-0.5 bg-white transition-all"></span>
                        <span className="w-6 h-0.5 bg-white transition-all"></span>
                        <span className="w-6 h-0.5 bg-white transition-all"></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-zinc-800 py-4">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/about"
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/guidelines"
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Guidelines
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/problems"
                                        className="text-gray-300 hover:text-white transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Problems
                                    </Link>
                                    <div className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm font-medium text-white text-center">
                                        {auth?.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMobileMenu}>
                                        <button className="w-full px-4 py-2 bg-zinc-900 text-white border border-zinc-700 rounded hover:border-zinc-500 transition-colors font-medium">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register" onClick={closeMobileMenu}>
                                        <button className="w-full px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-medium">
                                            Register
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
