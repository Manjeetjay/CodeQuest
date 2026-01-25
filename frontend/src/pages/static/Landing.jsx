import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Landing() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <main className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center py-32">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Code Conquest
                        </h1>
                        <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            A problem-solving and competitive coding platform built for developers
                            who want to sharpen their skills through real challenges
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap mt-12">
                        <Link to="/register">
                            <button className="px-10 py-4 bg-white text-black rounded font-semibold text-lg hover:bg-gray-200 transition-all transform hover:scale-105">
                                Start Solving
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className="px-10 py-4 bg-transparent text-white border-2 border-white rounded font-semibold text-lg hover:bg-white hover:text-black transition-all">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-4xl mx-auto mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-zinc-800">
                        <div className="bg-black p-8 text-center border-r border-zinc-800">
                            <div className="text-5xl font-bold text-white mb-3">500+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Curated Problems</div>
                        </div>
                        <div className="bg-black p-8 text-center border-r border-zinc-800">
                            <div className="text-5xl font-bold text-white mb-3">10K+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Active Coders</div>
                        </div>
                        <div className="bg-black p-8 text-center">
                            <div className="text-5xl font-bold text-white mb-3">100%</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">Free Access</div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto pb-32">
                    <h2 className="text-3xl font-bold text-white text-center mb-16 uppercase tracking-wide">
                        What You Can Do
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Solve Problems</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Curated coding problems across difficulty levels to build strong fundamentals
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Compete</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Participate in contests and challenges to test your skills against others
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Track Progress</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Monitor your journey with detailed analytics and performance metrics
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Learn Consistently</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Build habits through consistent practice and structured learning paths
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Fair Platform</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Compete ethically with transparent scoring and fair evaluation systems
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-white transition-all">
                            <div className="mb-6">
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Join Community</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Connect with learners and developers in a respectful coding community
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-gray-500 text-sm">
                            © 2026 Code Conquest. Learning over shortcuts. Growth over rankings.
                        </div>
                        <div className="flex gap-8">
                            <Link to="/about" className="text-gray-500 hover:text-white transition-colors text-sm">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Contact
                            </Link>
                            <Link to="/guidelines" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Guidelines
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
