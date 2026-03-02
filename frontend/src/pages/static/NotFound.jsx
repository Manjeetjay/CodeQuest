import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import useDocumentHead from "../../utils/useDocumentHead";

export default function NotFound() {
    const { isAuthenticated, loading } = useAuth();
    useDocumentHead({ title: "Page Not Found | CodeQuest" });
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (loading) return;

        if (isAuthenticated) {
            navigate("/problems", { replace: true });
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/", { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isAuthenticated, loading, navigate]);

    if (loading || isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-tech-bg text-tech-text flex items-center justify-center px-4 overflow-hidden relative">
            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] opacity-30"></div>

            <div className="text-center max-w-md animate-fade-up">
                <div className="heading-display text-[8rem] md:text-[12rem] text-white leading-none mb-4">
                    4<span className="text-tech-accent heading-editorial">0</span>4
                </div>
                <p className="text-lg text-tech-muted mb-2 font-light">Page not found</p>
                <p className="text-sm text-tech-muted/60 mb-10">
                    Redirecting in {countdown}s
                </p>
                <Link
                    to="/"
                    className="btn-primary"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}
