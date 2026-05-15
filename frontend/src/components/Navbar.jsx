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

    const navLinks = [
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/guidelines", label: "Guidelines" },
    ];

    return (
        <nav className="border-b border-[#1a1a1a] backdrop-blur-sm bg-[#0a0a0a]/80 sticky top-0 z-50" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-black font-bold text-lg rounded-sm">
                            &gt;_
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#e0e0e0]">CodeQuest</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-8 text-sm">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isAuthenticated && (
                                <Link
                                    to="/problems"
                                    className="text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    Problems
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1.5 text-sm text-[#e0e0e0] border border-[#222] bg-[#111] rounded">
                                        {auth?.username}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/login"
                                        className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-orange-500 text-black px-5 py-2 text-sm font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.5)]"
                                    >
                                        Start Coding
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-5 h-px bg-gray-400 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                        <span className={`w-5 h-px bg-gray-400 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#1a1a1a] py-4">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="px-3 py-2.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/problems"
                                        className="px-3 py-2.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Problems
                                    </Link>
                                    <div className="my-2 h-px bg-[#1a1a1a]" />
                                    <div className="px-3 py-2 text-sm text-gray-500">
                                        {auth?.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="my-2 h-px bg-[#1a1a1a]" />
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="px-3 py-2.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="mx-3 mt-1 py-2.5 text-sm font-semibold text-black bg-orange-500 hover:bg-orange-400 transition-all text-center"
                                    >
                                        Start Coding
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
