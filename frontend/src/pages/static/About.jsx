import { Link } from "react-router-dom";
import {
    ArrowRight,
    BookCheck,
    BrainCircuit,
    Layers,
    ShieldCheck,
    Lock,
    Target,
    Zap,
    BarChart3,
    Crosshair,
    Ruler,
    Scale,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentHead from "../../utils/useDocumentHead";

const platformLayers = [
    {
        title: "Identity & Access",
        desc: "Secure authentication and account management so you can focus on solving.",
        icon: ShieldCheck,
    },
    {
        title: "Problem Discovery",
        desc: "Browse, search, and filter a curated library of coding challenges.",
        icon: Layers,
    },
    {
        title: "Solving Workspace",
        desc: "A distraction-free code editor with language templates and syntax highlighting.",
        icon: BrainCircuit,
    },
    {
        title: "Submission Feedback",
        desc: "Instant, per-test-case results so you know exactly where you stand.",
        icon: BookCheck,
    },
];

const principles = [
    {
        icon: Crosshair,
        title: "Learning over shortcuts",
        desc: "We reward understanding, not copy-pasting. Every feature is designed to help you actually learn.",
    },
    {
        icon: Ruler,
        title: "Signal over noise",
        desc: "No gamification gimmicks. Clean UI, clear feedback, and tools that get out of your way.",
    },
    {
        icon: Scale,
        title: "Fairness over hype",
        desc: "Consistent, transparent evaluation. The same rules and standards apply to everyone.",
    },
];

export default function About() {
    const { isAuthenticated } = useAuth();
    useDocumentHead({
        title: "About | CodeQuest",
        description:
            "Learn about CodeQuest – a repeatable coding practice system. Discover our architecture, workflow, and principles for becoming a better programmer.",
    });
    const actionHref = isAuthenticated ? "/problems" : "/register";
    const actionLabel = isAuthenticated ? "Go to problems" : "Create account";

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
            {/* Subtle Background Grid */}
            <div className="fixed inset-0 bg-grid-minimal pointer-events-none opacity-30" />

            <div className="relative z-10">
                <Navbar />

                <main>
                    {/* Header */}
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-24">
                            <div className="max-w-3xl animate-fade-up">
                                <p className="text-sm font-semibold text-orange-500 mb-4 flex items-center gap-2 border border-orange-500/30 px-3 py-1 bg-orange-500/5 w-fit">
                                    About CodeQuest
                                </p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    A Repeatable System
                                    <br />
                                    <span className="text-orange-500">for Better Code.</span>
                                </h1>
                                <p className="text-lg text-gray-400 leading-relaxed mb-12">
                                    CodeQuest is built around one idea: consistent practice
                                    produces real skill.
                                </p>
                            </div>

                            {/* Visual Workflow Pipeline */}
                            <div
                                className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 animate-fade-up"
                                style={{ animationDelay: "200ms" }}
                            >
                                {[
                                    { step: "01", label: "Discover", desc: "Browse challenges" },
                                    { step: "02", label: "Code", desc: "Write your solution" },
                                    { step: "03", label: "Submit", desc: "Run against tests" },
                                    { step: "04", label: "Review", desc: "Analyze feedback" },
                                    { step: "05", label: "Improve", desc: "Iterate & grow" },
                                ].map((item, i, arr) => (
                                    <div
                                        key={item.step}
                                        className="flex items-center flex-1 md:flex-row"
                                    >
                                        <div className="flex-1 border-l-2 border-orange-500/40 bg-[#111] pl-4 pr-5 py-4 hover:bg-[#1a1a1a] transition-colors group">
                                            <span className="text-[10px] font-bold text-orange-500 tracking-widest">
                                                {item.step}
                                            </span>
                                            <h4 className="text-sm font-bold uppercase tracking-wider mt-1">
                                                {item.label}
                                            </h4>
                                            <p className="text-[11px] text-gray-500 mt-0.5">
                                                {item.desc}
                                            </p>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <span className="hidden md:flex items-center justify-center w-8 text-orange-500/30 text-lg shrink-0">
                                                →
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Platform architecture */}
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="mb-16 animate-fade-up">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Platform{" "}
                                    <span className="text-orange-500">Architecture</span>
                                </h2>
                                <p className="text-lg text-gray-400 max-w-lg">
                                    Four layers that work together to give you a seamless
                                    practice experience.
                                </p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {platformLayers.map((layer, index) => {
                                    const Icon = layer.icon;
                                    return (
                                        <div
                                            key={layer.title}
                                            className="group bg-[#111] border border-[#1a1a1a] p-6 rounded-lg hover:border-orange-500/50 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.1)] animate-fade-up"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                                                <Icon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2">
                                                {layer.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {layer.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* How it works */}
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="max-w-2xl mb-16 animate-fade-up">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    How It <span className="text-orange-500">Works</span>
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    Four steps from zero to submitted solution.
                                </p>
                            </div>

                            <div className="space-y-8 max-w-4xl">
                                {[
                                    {
                                        num: "01",
                                        label: "Sign in",
                                        desc: "Create an account or log in via secure protocols.",
                                        icon: Lock,
                                    },
                                    {
                                        num: "02",
                                        label: "Pick challenge",
                                        desc: "Browse by difficulty or topic. Target your weak points.",
                                        icon: Target,
                                    },
                                    {
                                        num: "03",
                                        label: "Code & submit",
                                        desc: "Write and submit your solution within our zero-latency editor.",
                                        icon: Zap,
                                    },
                                    {
                                        num: "04",
                                        label: "Analyze",
                                        desc: "Review per-test feedback to optimize future runs.",
                                        icon: BarChart3,
                                    },
                                ].map((step, index) => (
                                    <div
                                        key={step.num}
                                        className="flex items-start gap-6 group bg-[#111] border border-[#1a1a1a] p-6 rounded-lg hover:border-orange-500/50 transition-all animate-fade-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="text-3xl font-bold text-orange-500/40 group-hover:text-orange-500 transition-colors shrink-0">
                                            {step.num}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                                                {step.label}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Principles */}
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="mb-16 animate-fade-up">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Our <span className="text-orange-500">Principles</span>
                                </h2>
                                <p className="text-lg text-gray-400 max-w-lg">
                                    The values that shape every decision we make.
                                </p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-3">
                                {principles.map((p, index) => {
                                    const PIcon = p.icon;
                                    return (
                                        <div
                                            key={p.title}
                                            className="group bg-[#111] border border-[#1a1a1a] p-6 rounded-lg hover:border-orange-500/50 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.1)] animate-fade-up"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                                                <PIcon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {p.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="max-w-7xl mx-auto px-6 py-20">
                        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-lg p-12 text-center relative overflow-hidden animate-fade-up">
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    Ready to <span className="text-orange-500">Start?</span>
                                </h2>
                                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                                    Build momentum through consistent practice. Your next
                                    challenge is waiting.
                                </p>
                                <Link
                                    to={actionHref}
                                    className="bg-orange-500 text-black px-10 py-4 text-lg font-semibold hover:bg-orange-400 transition-all hover:shadow-[0_0_40px_rgba(255,165,0,0.8)] inline-flex items-center gap-2"
                                >
                                    {actionLabel}
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
