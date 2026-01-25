import Navbar from "../../components/Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="container mx-auto px-4 py-16 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-bold text-white mb-4">About Code Conquest</h1>
                    <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        A problem-solving and competitive coding platform built for learners, developers,
                        and competitive programmers who want to sharpen their skills through real challenges
                    </p>
                </div>

                {/* Mission Card */}
                <div className="bg-zinc-900 border-2 border-white p-12 mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                    </div>
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        <p>Our goal is simple: help you become a better problem solver by practicing meaningful problems in a structured and competitive environment.</p>
                        <ul className="space-y-3 ml-6">
                            <li className="flex items-start gap-3">
                                <span className="text-white mt-1">▸</span>
                                <span>Make coding practice accessible and structured</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-white mt-1">▸</span>
                                <span>Encourage logical thinking and clean solutions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-white mt-1">▸</span>
                                <span>Provide a fair platform for learning, competing, and improving</span>
                            </li>
                        </ul>
                        <p className="pt-4">
                            Whether you're preparing for interviews, improving your DSA skills, or just enjoy
                            solving problems, Code Conquest is designed to support your journey.
                        </p>
                    </div>
                </div>

                {/* What You Can Do */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <div className="w-12 h-12 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        What You Can Do on Code Conquest
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 ml-16">
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-white transition-all">
                            <div className="text-white font-semibold mb-2">Solve curated coding problems across difficulty levels</div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-white transition-all">
                            <div className="text-white font-semibold mb-2">Participate in contests and challenges</div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-white transition-all">
                            <div className="text-white font-semibold mb-2">Track your progress and performance</div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-white transition-all">
                            <div className="text-white font-semibold mb-2">Compete on leaderboards</div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-white transition-all md:col-span-2">
                            <div className="text-white font-semibold mb-2">Learn through consistent practice</div>
                        </div>
                    </div>
                </div>

                {/* For Everyone */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <div className="w-12 h-12 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        For Everyone
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 ml-16">
                        <div className="bg-zinc-900 border border-zinc-800 p-8">
                            <div className="text-2xl font-bold text-white mb-3">Students</div>
                            <p className="text-gray-400">building strong fundamentals</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-8">
                            <div className="text-2xl font-bold text-white mb-3">Developers</div>
                            <p className="text-gray-400">preparing for interviews</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-8">
                            <div className="text-2xl font-bold text-white mb-3">Competitive Programmers</div>
                            <p className="text-gray-400">who love challenges</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-8">
                            <div className="text-2xl font-bold text-white mb-3">Educators</div>
                            <p className="text-gray-400">looking to guide learners (future scope)</p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-black border-2 border-white p-12 text-center">
                    <div className="text-4xl font-bold text-white mb-6">Our Values</div>
                    <div className="grid md:grid-cols-2 gap-8 text-xl text-gray-300 max-w-3xl mx-auto">
                        <div>
                            <span className="text-white font-bold">Learning</span> over shortcuts
                        </div>
                        <div>
                            <span className="text-white font-bold">Growth</span> over rankings
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
