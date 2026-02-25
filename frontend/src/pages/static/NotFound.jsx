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
        <div className="min-h-screen bg-[#0b0f14] text-slate-100 flex items-center justify-center px-4">
            <div className="rounded-lg border border-white/[0.08] bg-[#0f141c] p-10 text-center max-w-sm">
                <div className="text-5xl font-bold text-white mb-2">404</div>
                <p className="text-sm text-slate-400 mb-1">Page not found</p>
                <p className="text-xs text-slate-600 mb-6">
                    Redirecting in {countdown}s
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}
