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
        <nav className="border-b border-tech-border bg-tech-bg/95 backdrop-blur-md sticky top-0 z-50" aria-label="Main navigation">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-white hover:text-white transition-colors">
                        <img src="/favicon.png" alt="CodeQuest" className="h-8 w-8" />
                        <span className="heading-editorial text-lg text-tech-accent">CodeQuest.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isAuthenticated && (
                            <Link
                                to="/problems"
                                className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                            >
                                Problems
                            </Link>
                        )}

                        <div className="w-px h-5 bg-tech-border mx-2" />

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-text border border-tech-border bg-white/[0.02]">
                                    {auth?.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400 hover:bg-red-400/10 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-black bg-white hover:bg-neutral-200 transition-colors"
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
                        <span className={`w-5 h-px bg-tech-muted transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                        <span className={`w-5 h-px bg-tech-muted transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-tech-border py-3">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/problems"
                                        className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Problems
                                    </Link>
                                    <div className="my-1 h-px bg-tech-border/30" />
                                    <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted">
                                        {auth?.username}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400 hover:bg-red-400/10 transition-colors text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="my-1 h-px bg-tech-border/30" />
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-tech-muted hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="mx-3 mt-1 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black bg-white hover:bg-neutral-200 transition-colors text-center"
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
