import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Don't redirect while auth is still loading
        if (loading) return;

        // If user is authenticated, redirect to problems page
        if (isAuthenticated) {
            navigate('/problems', { replace: true });
            return;
        }

        // For non-authenticated users, show countdown and then redirect to home
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/', { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isAuthenticated, loading, navigate]);

    // Show nothing while loading or redirecting
    if (loading || isAuthenticated) {
        return null;
    }

    // For non-authenticated users, show 404 with countdown
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                    Page not found
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-500">
                    The page you're looking for doesn't exist.
                </p>
                <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                    Redirecting to home in {countdown} seconds...
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go back home now
                </Link>
            </div>
        </div>
    );
}
