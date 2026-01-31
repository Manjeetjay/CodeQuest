import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function EmailSent() {
    const email = localStorage.getItem("registrationEmail") || "your email";

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-8 h-8 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-4">
                            Check your email
                        </h1>

                        <p className="text-gray-400 mb-6">
                            We've sent a verification link to <span className="text-white font-semibold">{email}</span>
                        </p>

                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-6 text-left">
                            <p className="text-sm text-gray-300 mb-2">
                                <strong className="text-white">Next steps:</strong>
                            </p>
                            <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                                <li>Open the email we sent to your inbox</li>
                                <li>Click the verification link</li>
                                <li>Login to start solving problems</li>
                            </ol>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-200">
                                <strong>Note:</strong> The verification link will expire in 15 minutes.
                            </p>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            Didn't receive the email? Check your spam folder or contact support.
                        </p>

                        <Link
                            to="/login"
                            className="inline-block w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
