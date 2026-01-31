import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Navbar from "../../components/Navbar";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying"); // verifying, success, error
    const [message, setMessage] = useState("");
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Invalid verification link. No token provided.");
                return;
            }

            try {
                const response = await axiosInstance.get(`/api/auth/verify?token=${token}`);
                setStatus("success");
                setMessage(response.data || "Email verified successfully!");
            } catch (error) {
                setStatus("error");
                setMessage(
                    error.response?.data ||
                    error.message ||
                    "Verification failed. The link may be expired or invalid."
                );
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                        {status === "verifying" && (
                            <>
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-6"></div>
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    Verifying your email...
                                </h1>
                                <p className="text-gray-400">
                                    Please wait while we verify your email address.
                                </p>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    Email Verified!
                                </h1>
                                <p className="text-gray-400 mb-8">{message}</p>
                                <Link
                                    to="/login"
                                    className="inline-block w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                                >
                                    Login to your account
                                </Link>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    Verification Failed
                                </h1>
                                <p className="text-gray-400 mb-8">{message}</p>
                                <div className="space-y-3">
                                    <Link
                                        to="/register"
                                        className="inline-block w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                                    >
                                        Try registering again
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-block w-full px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-semibold"
                                    >
                                        Back to login
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
