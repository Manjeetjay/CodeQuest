import { Link } from "react-router-dom";
import { ArrowRight, BookCheck, BrainCircuit, Layers, ShieldCheck, Lock, Target, Zap, BarChart3, Crosshair, Ruler, Scale } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
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
        description: "Learn about CodeQuest – a repeatable coding practice system. Discover our architecture, workflow, and principles for becoming a better programmer.",
    });
    const actionHref = isAuthenticated ? "/problems" : "/register";
    const actionLabel = isAuthenticated ? "Go to problems" : "Create account";

    return (
        <div className="min-h-screen bg-tech-bg text-tech-text overflow-hidden relative font-sans">
            <Navbar />

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] opacity-30"></div>

            <main>
                {/* Header */}
                <section className="relative border-b border-tech-border/30">
                    <div className="container mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-24">
                        <div className="max-w-3xl animate-fade-up">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-tech-accent mb-5">About CodeQuest</p>
                            <h1 className="heading-display text-4xl md:text-6xl text-white mb-6">
                                A REPEATABLE SYSTEM<br />
                                <span className="text-tech-accent heading-editorial">for better code.</span>
                            </h1>
                            <p className="text-base text-tech-muted leading-relaxed font-light mb-12">
                                CodeQuest is built around one idea: consistent practice produces real skill.
                            </p>
                        </div>

                        {/* Visual Workflow Pipeline */}
                        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 animate-fade-up" style={{ animationDelay: "200ms" }}>
                            {[
                                { step: "01", label: "Discover", desc: "Browse challenges" },
                                { step: "02", label: "Code", desc: "Write your solution" },
                                { step: "03", label: "Submit", desc: "Run against tests" },
                                { step: "04", label: "Review", desc: "Analyze feedback" },
                                { step: "05", label: "Improve", desc: "Iterate & grow" },
                            ].map((item, i, arr) => (
                                <div key={item.step} className="flex items-center flex-1 md:flex-row">
                                    <div className="flex-1 border-l-2 border-tech-accent/40 bg-white/[0.02] pl-4 pr-5 py-4 hover:bg-white/[0.04] transition-colors group">
                                        <span className="text-[10px] font-bold text-tech-accent tracking-[0.2em]">{item.step}</span>
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-1">{item.label}</h4>
                                        <p className="text-[11px] text-tech-muted font-light mt-0.5">{item.desc}</p>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <span className="hidden md:flex items-center justify-center w-8 text-tech-accent/30 text-lg shrink-0">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform architecture */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="mb-16 animate-fade-up">
                            <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">
                                PLATFORM<br />
                                <span className="text-tech-accent heading-editorial">architecture.</span>
                            </h2>
                            <p className="text-lg text-tech-muted max-w-lg font-light">
                                Four layers that work together to give you a seamless practice experience.
                            </p>
                        </div>
                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4 border-t border-tech-border/30 pt-12">
                            {platformLayers.map((layer, index) => {
                                const Icon = layer.icon;
                                return (
                                    <div
                                        key={layer.title}
                                        className="group relative animate-fade-up"
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <div className="mb-5">
                                            <Icon className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110 group-hover:text-tech-accent" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-3 tracking-wide uppercase">{layer.title}</h3>
                                        <p className="text-sm text-tech-muted leading-relaxed font-light">{layer.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="relative border-b border-tech-border/30 bg-tech-bg overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[1px] border-tech-border/20 rounded-full min-h-0 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md relative z-10">
                        <div className="max-w-2xl mb-20 animate-fade-up">
                            <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">
                                HOW IT<br />
                                <span className="text-tech-accent heading-editorial">works.</span>
                            </h2>
                            <p className="text-lg text-tech-muted leading-relaxed font-light">
                                Four steps from zero to submitted solution.
                            </p>
                        </div>

                        <div className="grid gap-y-20 md:grid-cols-1 max-w-4xl mx-auto">
                            {[
                                { num: "One", label: "Sign in", desc: "Create an account or log in via secure protocols.", icon: Lock },
                                { num: "Two", label: "Pick challenge", desc: "Browse by difficulty or topic. Target your weak points.", icon: Target },
                                { num: "Three", label: "Code & submit", desc: "Write and submit your solution within our zero-latency editor.", icon: Zap },
                                { num: "Four", label: "Analyze", desc: "Review per-test feedback to optimize future runs.", icon: BarChart3 },
                            ].map((step, index) => (
                                <div key={step.num} className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                                    <div className="md:w-1/3">
                                        <span className="heading-editorial text-4xl text-tech-muted/40 transition-colors duration-500 hover:text-white">{step.num}</span>
                                    </div>
                                    <div className="md:w-2/3 border-t border-tech-border/30 pt-4 mt-2">
                                        <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">{step.label}</h3>
                                        <p className="text-base text-tech-muted leading-relaxed font-light">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Principles */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="mb-16 animate-fade-up">
                            <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">
                                OUR<br />
                                <span className="text-tech-accent heading-editorial">principles.</span>
                            </h2>
                            <p className="text-lg text-tech-muted max-w-lg font-light">
                                The values that shape every decision we make.
                            </p>
                        </div>
                        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3 border-t border-tech-border/30 pt-12">
                            {principles.map((p, index) => {
                                const PIcon = p.icon;
                                return (
                                    <div
                                        key={p.title}
                                        className="group relative animate-fade-up"
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <div className="mb-5">
                                            <PIcon className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-110 group-hover:text-tech-accent" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-3 tracking-wide uppercase">{p.title}</h3>
                                        <p className="text-sm text-tech-muted leading-relaxed font-light">{p.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative bg-tech-bg">
                    <div className="container mx-auto px-6 py-section-y md:py-[120px]">
                        <div className="text-center max-w-4xl mx-auto animate-fade-up">
                            <h2 className="heading-display text-4xl md:text-6xl lg:text-7xl text-white mb-8">
                                READY TO<br />
                                <span className="text-tech-accent heading-editorial tracking-normal">start?</span>
                            </h2>
                            <p className="text-lg text-tech-muted max-w-md mx-auto mb-10 font-light">
                                Build momentum through consistent practice. Your next challenge is waiting.
                            </p>
                            <Link
                                to={actionHref}
                                className="btn-primary"
                            >
                                {actionLabel}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
