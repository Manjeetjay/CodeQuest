import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function NotFound() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is authenticated, redirect to problems page instead of showing 404
        if (user) {
            navigate('/problems', { replace: true });
        }
    }, [user, navigate]);

    // For non-authenticated users, show 404 and redirect to home
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
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
