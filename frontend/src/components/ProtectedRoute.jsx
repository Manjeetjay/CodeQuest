import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0f14] text-slate-100 flex items-center justify-center">
                <div className="text-xl font-semibold text-slate-200">Loading...</div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
