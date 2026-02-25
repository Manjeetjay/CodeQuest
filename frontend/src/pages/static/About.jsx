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
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-6xl px-6">
                {/* Header */}
                <header className="pt-24 pb-20 md:pt-32 md:pb-24 max-w-2xl">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mb-5">About CodeQuest</p>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
                        A repeatable system{" "}
                        <span className="text-emerald-400">for better code.</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Discover → Code → Submit → Review → Improve. That's the loop.
                        CodeQuest is built around one idea: consistent practice produces real skill.
                    </p>
                </header>

                {/* Platform architecture */}
                <section className="pb-24 md:pb-32">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">Platform architecture</h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            Four layers that work together to give you a seamless practice experience.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {platformLayers.map((layer) => {
                            const Icon = layer.icon;
                            return (
                                <div key={layer.title} className="group rounded-xl border border-white/[0.06] bg-[#0f141c] p-7 transition-all hover:border-white/[0.12] hover:bg-[#111820]">
                                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-emerald-400/30 group-hover:bg-emerald-400/[0.06] transition-colors">
                                        <Icon className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <h3 className="text-base font-medium text-white mb-2">{layer.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{layer.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* How it works */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">How it works</h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            Four steps from zero to submitted solution.
                        </p>
                    </div>
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
                        {[
                            { num: "01", label: "Sign in", desc: "Create an account or log in.", icon: Lock },
                            { num: "02", label: "Pick challenge", desc: "Browse by difficulty or topic.", icon: Target },
                            { num: "03", label: "Code & submit", desc: "Write and submit your solution.", icon: Zap },
                            { num: "04", label: "Analyze", desc: "Review per-test feedback.", icon: BarChart3 },
                        ].map((step) => {
                            const StepIcon = step.icon;
                            return (
                                <div key={step.num} className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-7 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5">
                                        <StepIcon className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <p className="text-[10px] text-emerald-400/60 font-semibold uppercase tracking-[0.25em] mb-2">{step.num}</p>
                                    <p className="text-base font-medium text-white mb-2">{step.label}</p>
                                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Principles */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">Our principles</h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            The values that shape every decision we make.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {principles.map((p) => {
                            const PIcon = p.icon;
                            return (
                                <div key={p.title} className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-8">
                                    <div className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                                        <PIcon className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <h3 className="text-base font-medium text-white mb-2">{p.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="pb-24 md:pb-32">
                    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f141c] to-[#0b1018] p-10 md:p-14 text-center">
                        <h2 className="text-3xl font-semibold text-white mb-4">Ready to start?</h2>
                        <p className="text-base text-slate-400 max-w-md mx-auto mb-8">
                            Build momentum through consistent practice. Your next challenge is waiting.
                        </p>
                        <Link
                            to={actionHref}
                            className="inline-flex items-center gap-2.5 rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            {actionLabel}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
