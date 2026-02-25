import { Link } from "react-router-dom";
import { ArrowRight, BookCheck, BrainCircuit, Layers, ShieldCheck, Lock, Target, Zap, BarChart3, Crosshair, Ruler, Scale } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const platformLayers = [
    { title: "Identity & Access", icon: ShieldCheck },
    { title: "Problem Discovery", icon: Layers },
    { title: "Solving Workspace", icon: BrainCircuit },
    { title: "Submission Feedback", icon: BookCheck },
];

const principles = [
    { icon: Crosshair, text: "Learning over shortcuts" },
    { icon: Ruler, text: "Signal over noise" },
    { icon: Scale, text: "Fairness over hype" },
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

            <main className="container mx-auto max-w-5xl px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">About CodeQuest</p>
                    <h1 className="text-3xl font-semibold text-white mb-2">
                        A repeatable solving system.
                    </h1>
                    <p className="text-sm text-slate-400 max-w-lg">
                        Discover → Code → Submit → Review → Improve. That's the loop.
                    </p>
                </header>

                {/* Platform architecture */}
                <section className="mb-12">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Architecture</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                        {platformLayers.map((layer) => {
                            const Icon = layer.icon;
                            return (
                                <div key={layer.title} className="bg-[#0b0f14] p-5 text-center">
                                    <Icon className="h-5 w-5 text-slate-500 mx-auto mb-3" />
                                    <h3 className="text-xs font-medium text-white">{layer.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* How it works */}
                <section className="mb-12">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">How it works</h2>
                    <div className="grid grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                        {[
                            { num: "01", label: "Sign in", icon: Lock },
                            { num: "02", label: "Pick challenge", icon: Target },
                            { num: "03", label: "Code & submit", icon: Zap },
                            { num: "04", label: "Analyze", icon: BarChart3 },
                        ].map((step) => {
                            const StepIcon = step.icon;
                            return (
                                <div key={step.num} className="bg-[#0b0f14] p-5 text-center">
                                    <StepIcon className="h-4 w-4 text-slate-500 mx-auto mb-2" />
                                    <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">{step.num}</p>
                                    <p className="text-xs font-medium text-white mt-0.5">{step.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Principles */}
                <section className="mb-12">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Principles</h2>
                    <div className="grid grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                        {principles.map((p) => {
                            const PIcon = p.icon;
                            return (
                                <div key={p.text} className="bg-[#0b0f14] p-5 text-center">
                                    <PIcon className="h-4 w-4 text-slate-500 mx-auto mb-2" />
                                    <p className="text-xs font-medium text-slate-300">{p.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="rounded-lg border border-white/[0.08] bg-[#0f141c] p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Ready to start?</h2>
                        <p className="mt-1 text-xs text-slate-500">Build momentum through consistent practice.</p>
                    </div>
                    <Link
                        to={actionHref}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                    >
                        {actionLabel}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </section>
            </main>
        </div>
    );
}
