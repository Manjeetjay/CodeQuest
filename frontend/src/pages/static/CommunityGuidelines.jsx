import Navbar from "../../components/Navbar";

export default function CommunityGuidelines() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="container mx-auto px-4 py-16 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4">Community Guidelines</h1>
                    <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Code Conquest is a community built on respect, fairness, and learning
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-white text-black p-10 mb-16 text-center">
                    <p className="text-xl font-semibold leading-relaxed">
                        By using the platform, you agree to follow these guidelines
                    </p>
                </div>

                {/* What We Encourage */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">What We Encourage</h2>
                    </div>

                    <div className="space-y-6 ml-18">
                        {/* Honest Problem Solving */}
                        <div className="border-l-4 border-white pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-white mb-4">Honest Problem Solving</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Solve problems on your own</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Use discussions and editorials after attempting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Focus on learning, not just passing test cases</span>
                                </li>
                            </ul>
                        </div>

                        {/* Respectful Interaction */}
                        <div className="border-l-4 border-white pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-white mb-4">Respectful Interaction</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Be polite in discussions and comments</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Help others by explaining concepts, not by giving full solutions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Encourage beginners and learners</span>
                                </li>
                            </ul>
                        </div>

                        {/* Fair Competition */}
                        <div className="border-l-4 border-white pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-white mb-4">Fair Competition</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Compete ethically in contests</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-white mt-1 font-bold">→</span>
                                    <span>Respect platform rules and scoring systems</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* What Is Not Allowed */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">What Is Not Allowed</h2>
                    </div>

                    <div className="space-y-6 ml-18">
                        {/* Cheating & Plagiarism */}
                        <div className="border-l-4 border-red-500 pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-red-400 mb-4">Cheating & Plagiarism</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Copying solutions from others</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Sharing full solutions during contests</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Using unfair external help in competitive events</span>
                                </li>
                            </ul>
                        </div>

                        {/* Abuse or Harassment */}
                        <div className="border-l-4 border-red-500 pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-red-400 mb-4">Abuse or Harassment</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Hate speech, harassment, or personal attacks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Disrespectful language toward users or admins</span>
                                </li>
                            </ul>
                        </div>

                        {/* Platform Misuse */}
                        <div className="border-l-4 border-red-500 pl-8 py-6 bg-zinc-900">
                            <h3 className="text-2xl font-bold text-red-400 mb-4">Platform Misuse</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Attempting to exploit bugs or loopholes</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Spamming discussions or submissions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 font-bold">✕</span>
                                    <span>Creating multiple accounts for unfair advantage</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Enforcement */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Enforcement</h2>
                    </div>

                    <div className="ml-18 bg-zinc-900 border border-zinc-800 p-8">
                        <p className="text-gray-300 text-lg mb-6">Violations may result in:</p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-black border border-zinc-700">
                                <div className="text-yellow-400 font-bold text-xl mb-2">Warning</div>
                                <div className="text-gray-400 text-sm">First offense</div>
                            </div>
                            <div className="text-center p-6 bg-black border border-zinc-700">
                                <div className="text-orange-400 font-bold text-xl mb-2">Temporary Suspension</div>
                                <div className="text-gray-400 text-sm">Repeated violations</div>
                            </div>
                            <div className="text-center p-6 bg-black border border-zinc-700">
                                <div className="text-red-400 font-bold text-xl mb-2">Permanent Ban</div>
                                <div className="text-gray-400 text-sm">Serious offenses</div>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-6 text-sm">
                            The admin team reserves the right to take action to maintain platform integrity.
                        </p>
                    </div>
                </div>

                {/* Shared Responsibility */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 border-2 border-white flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">A Shared Responsibility</h2>
                    </div>

                    <div className="ml-18 bg-zinc-900 border border-zinc-800 p-8">
                        <p className="text-gray-300 text-lg mb-6">Code Conquest grows stronger when the community:</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold">1</div>
                                <span className="text-white">Learns together</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold">2</div>
                                <span className="text-white">Competes fairly</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold">3</div>
                                <span className="text-white">Respects each other</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mt-8">
                            If you notice any misuse or issues, please report them responsibly.
                        </p>
                    </div>
                </div>

                {/* Final Note */}
                <div className="bg-white text-black p-12 text-center">
                    <div className="text-3xl font-bold mb-4">Code Conquest is not just a platform</div>
                    <div className="text-3xl font-bold mb-6">— it's a learning arena</div>
                    <div className="text-2xl">Conquer problems, not principles.</div>
                </div>
            </main>
        </div>
    );
}
