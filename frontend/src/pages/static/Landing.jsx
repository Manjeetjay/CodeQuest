import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Code2,
    Zap,
    Trophy,
    BarChart3,
    CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServerStatus from "./ServerStatus";
import useDocumentHead from "../../utils/useDocumentHead";

const features = [
    {
        icon: Code2,
        title: "Real-Time Feedback",
        desc: "Instant validation as you code. Know immediately if your solution works.",
    },
    {
        icon: BarChart3,
        title: "Track Progress",
        desc: "Visualize your growth across topics and difficulty levels.",
    },
    {
        icon: Zap,
        title: "Multi-Language",
        desc: "Code in Python, Java, JavaScript, C++, and more.",
    },
    {
        icon: Trophy,
        title: "Structured Path",
        desc: "Curated problem sets that build from fundamentals to advanced.",
    },
];

const challenges = [
    { name: "Two Sum", difficulty: "Easy", solved: 1247 },
    { name: "Binary Tree Traversal", difficulty: "Medium", solved: 892 },
    { name: "Dynamic Programming", difficulty: "Hard", solved: 423 },
];

export default function Landing() {
    const { isAuthenticated } = useAuth();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useDocumentHead({
        title: "CodeQuest – Practice Coding Challenges & Improve Skills",
        description:
            "A focused workspace for solving coding challenges with real-time feedback. Filter by difficulty, code in multiple languages, and track your progress.",
    });

    const primaryHref = isAuthenticated ? "/problems" : "/register";
    const primaryLabel = isAuthenticated ? "Open Problems" : "Start Your Journey";

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
            {/* Animated grid background */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 165, 0, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 165, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    transition: "transform 0.5s ease-out",
                }}
            />

            {/* Glowing orb effect */}
            <div
                className="fixed top-1/4 -right-48 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-20 pointer-events-none"
                style={{
                    transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                    transition: "transform 0.8s ease-out",
                }}
            />

            <div className="relative z-10">
                <Navbar />

                <main>
                    {/* Hero Section */}
                    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 animate-fade-up">
                                {/* Server status + badge */}
                                <div className="flex items-center gap-3">
                                    <ServerStatus />
                                    <div className="text-orange-500 text-sm font-semibold flex items-center gap-2 border border-orange-500/30 px-3 py-1 bg-orange-500/5">
                                        <span className="animate-pulse">●</span>
                                        <span>500+ CHALLENGES LIVE</span>
                                    </div>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                    Think.
                                    <br />
                                    <span className="text-orange-500">Code.</span>
                                    <br />
                                    Conquer.
                                </h1>

                                <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                                    Master algorithms and data structures through deliberate
                                    practice. Real-time feedback. Multiple languages. Your path
                                    from novice to expert.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        to={primaryHref}
                                        className="group bg-orange-500 text-black px-8 py-4 text-base font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] flex items-center gap-2"
                                    >
                                        {primaryLabel}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to={isAuthenticated ? "/about" : "/login"}
                                        className="border border-gray-700 px-8 py-4 text-base font-semibold hover:border-orange-500 hover:text-orange-500 transition-all"
                                    >
                                        {isAuthenticated ? "How it works" : "Sign In"}
                                    </Link>
                                </div>

                                <div className="flex items-center gap-8 pt-4 text-sm">
                                    <div>
                                        <div className="text-2xl font-bold text-orange-500">50K+</div>
                                        <div className="text-gray-500">Active Users</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-500">500+</div>
                                        <div className="text-gray-500">Problems</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-500">10+</div>
                                        <div className="text-gray-500">Languages</div>
                                    </div>
                                </div>
                            </div>

                            {/* Code Terminal Mockup */}
                            <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
                                <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-orange-500/10">
                                    <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-[#222]">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <span className="text-xs text-gray-500 ml-4">solution.py</span>
                                    </div>
                                    <div className="p-6 space-y-3 text-sm">
                                        <div>
                                            <span className="text-purple-400">def</span>{" "}
                                            <span className="text-blue-400">twoSum</span>
                                            <span className="text-gray-400">(</span>
                                            <span className="text-orange-400">nums</span>,{" "}
                                            <span className="text-orange-400">target</span>
                                            <span className="text-gray-400">)</span>:
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-orange-400">seen</span> ={" "}
                                            <span className="text-gray-400">&#123;&#125;</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-purple-400">for</span>{" "}
                                            <span className="text-orange-400">i</span>,{" "}
                                            <span className="text-orange-400">num</span>{" "}
                                            <span className="text-purple-400">in</span>{" "}
                                            <span className="text-blue-400">enumerate</span>
                                            <span className="text-gray-400">(</span>
                                            <span className="text-orange-400">nums</span>
                                            <span className="text-gray-400">)</span>:
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-orange-400">complement</span> ={" "}
                                            <span className="text-orange-400">target</span> -{" "}
                                            <span className="text-orange-400">num</span>
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-purple-400">if</span>{" "}
                                            <span className="text-orange-400">complement</span>{" "}
                                            <span className="text-purple-400">in</span>{" "}
                                            <span className="text-orange-400">seen</span>:
                                        </div>
                                        <div className="pl-12">
                                            <span className="text-purple-400">return</span> [
                                            <span className="text-orange-400">seen</span>[
                                            <span className="text-orange-400">complement</span>],{" "}
                                            <span className="text-orange-400">i</span>]
                                        </div>
                                        <div className="pl-8">
                                            <span className="text-orange-400">seen</span>[
                                            <span className="text-orange-400">num</span>] ={" "}
                                            <span className="text-orange-400">i</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-[#222] text-green-400 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>All test cases passed • Runtime: 52ms</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating stats */}
                                <div className="absolute -left-4 top-1/4 bg-[#111] border border-[#222] p-4 rounded shadow-xl animate-float">
                                    <div className="text-xs text-gray-500">Time Complexity</div>
                                    <div className="text-lg font-bold text-green-400">O(n)</div>
                                </div>
                                <div className="absolute -right-4 top-2/3 bg-[#111] border border-[#222] p-4 rounded shadow-xl animate-float-slow">
                                    <div className="text-xs text-gray-500">Space</div>
                                    <div className="text-lg font-bold text-blue-400">O(n)</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
                        <div className="text-center mb-16 animate-fade-up">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Built for <span className="text-orange-500">Serious</span> Practice
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Every feature designed to accelerate your learning and track
                                meaningful progress.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-[#111] border border-[#1a1a1a] p-6 rounded-lg hover:border-orange-500/50 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.1)] animate-fade-up"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                                        <feature.icon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Popular Challenges */}
                    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
                        <div className="flex items-center justify-between mb-8 animate-fade-up">
                            <h2 className="text-3xl font-bold">Trending Challenges</h2>
                            <Link
                                to={isAuthenticated ? "/problems" : "/register"}
                                className="text-orange-500 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {challenges.map((challenge, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#111] border border-[#1a1a1a] p-5 rounded-lg hover:border-orange-500/50 transition-all cursor-pointer group animate-fade-up"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-gray-500 text-sm">
                                                {String(idx + 1).padStart(2, "0")}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold group-hover:text-orange-500 transition-colors">
                                                    {challenge.name}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded ${
                                                            challenge.difficulty === "Easy"
                                                                ? "bg-green-500/10 text-green-400"
                                                                : challenge.difficulty === "Medium"
                                                                ? "bg-yellow-500/10 text-yellow-400"
                                                                : "bg-red-500/10 text-red-400"
                                                        }`}
                                                    >
                                                        {challenge.difficulty}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {challenge.solved.toLocaleString()} solved
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="max-w-7xl mx-auto px-6 py-20">
                        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg p-12 text-center relative overflow-hidden animate-fade-up">
                            <div
                                className="absolute inset-0 opacity-50 pointer-events-none"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(rgba(255, 165, 0, 0.05) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255, 165, 0, 0.05) 1px, transparent 1px)
                                    `,
                                    backgroundSize: "30px 30px",
                                }}
                            ></div>
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    Ready to Level Up?
                                </h2>
                                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                    Join thousands of developers sharpening their skills. Start
                                    solving, start growing.
                                </p>
                                <Link
                                    to={primaryHref}
                                    className="bg-orange-500 text-black px-10 py-4 text-lg font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_40px_rgba(255,165,0,0.8)] inline-flex items-center gap-2"
                                >
                                    {isAuthenticated ? "Go to Problems" : "Create Free Account"}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}