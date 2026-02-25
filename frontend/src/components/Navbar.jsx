import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Code2 } from "lucide-react";

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
        <nav className="border-b border-white/[0.06] bg-[#0b0f14] sticky top-0 z-50" aria-label="Main navigation">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-white hover:text-white transition-colors">
                        <Code2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-md font-semibold tracking-tight">CodeQuest</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated && (
                            <Link
                                to="/problems"
                                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
                            >
                                Problems
                            </Link>
                        )}

                        <div className="w-px h-5 bg-white/[0.08] mx-2" />

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-2 text-xs font-medium text-slate-300 border border-white/[0.08] rounded-md bg-white/[0.02]">
                                    {auth?.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-400 hover:bg-red-400/15 rounded-md transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-5 h-px bg-slate-400 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                        <span className={`w-5 h-px bg-slate-400 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/[0.06] py-3">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/problems"
                                        className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Problems
                                    </Link>
                                    <div className="my-1 h-px bg-white/[0.06]" />
                                    <div className="px-3 py-2 text-xs font-medium text-slate-500">
                                        {auth?.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-400 hover:bg-red-400/15 rounded-md transition-colors text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="my-1 h-px bg-white/[0.06]" />
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="mx-3 mt-1 py-2 text-xs font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors text-center"
                                    >
                                        Register
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
