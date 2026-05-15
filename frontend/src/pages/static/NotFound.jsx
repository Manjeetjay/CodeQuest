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
        if (isAuthenticated) { navigate("/problems", { replace: true }); return; }
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) { clearInterval(timer); navigate("/", { replace: true }); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isAuthenticated, loading, navigate]);

    if (loading || isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] flex items-center justify-center px-4 overflow-hidden relative">
            <div className="fixed inset-0 bg-grid-minimal pointer-events-none opacity-30" />
            <div className="text-center max-w-md animate-fade-up relative z-10">
                <div className="text-[8rem] md:text-[12rem] font-bold leading-none mb-4">
                    4<span className="text-orange-500">0</span>4
                </div>
                <p className="text-lg text-gray-400 mb-2">Page not found</p>
                <p className="text-sm text-gray-600 mb-10">Redirecting in {countdown}s</p>
                <Link to="/" className="bg-orange-500 text-black px-8 py-4 text-sm font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_30px_rgba(255,165,0,0.5)] inline-flex items-center gap-2">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
