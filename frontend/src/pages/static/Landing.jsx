import { Link } from "react-router-dom";
import {
    ArrowRight,
    Code2,
    Filter,
    History,
    Search,
    ShieldCheck,
    Sparkles,
    TestTube2,
    Terminal,
    Zap,
    UserPlus,
    Target,
    CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import ServerStatus from "./ServerStatus";
import useDocumentHead from "../../utils/useDocumentHead";

const featureCards = [
    {
        title: "Smart Search",
        desc: "Find exactly what you need. Filter problems by difficulty, search by title, and jump straight into solving.",
        icon: Search,
    },
    {
        title: "Multi-Language",
        desc: "Write solutions in your preferred language with built-in code templates and syntax highlighting.",
        icon: Code2,
    },
    {
        title: "Live Feedback",
        desc: "See pass/fail results for each test case instantly. Know exactly where your solution stands.",
        icon: TestTube2,
    },
    {
        title: "Submission History",
        desc: "Every solution you submit is saved. Revisit, compare, and track your improvement over time.",
        icon: History,
    },
    {
        title: "Structured Practice",
        desc: "Organized difficulty tracks from Easy to Hard so you can build skills progressively.",
        icon: Filter,
    },
    {
        title: "Fair Play",
        desc: "Consistent evaluation standards across all problems. No gotchas, no hidden test cases.",
        icon: ShieldCheck,
    },
];

const codeLines = [
    { text: "class Solution {", color: "text-purple-400" },
    { text: "  public int[] solve(int[] nums) {", color: "text-sky-300" },
    { text: "    Map<Integer, Integer> map = new HashMap<>();", color: "text-slate-300" },
    { text: "    for (int i = 0; i < nums.length; i++) {", color: "text-slate-300" },
    { text: "      if (map.containsKey(target - nums[i]))", color: "text-emerald-300" },
    { text: '        return new int[]{map.get(target-nums[i]), i};', color: "text-emerald-300" },
    { text: "      map.put(nums[i], i);", color: "text-slate-400" },
    { text: "    }", color: "text-slate-400" },
    { text: "  }", color: "text-sky-300" },
    { text: "}", color: "text-purple-400" },
];

export default function Landing() {
    const { isAuthenticated } = useAuth();
    useDocumentHead({
        title: "CodeQuest – Practice Coding Challenges & Improve Skills",
        description: "A focused workspace for solving coding challenges with real-time feedback. Filter by difficulty, code in multiple languages, and track your progress.",
    });
    const primaryHref = isAuthenticated ? "/problems" : "/register";
    const primaryLabel = isAuthenticated ? "Open Problems" : "Start Free";
    const secondaryHref = isAuthenticated ? "/about" : "/login";
    const secondaryLabel = isAuthenticated ? "How it works" : "Sign in";

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main>
                {/* Hero */}
                <section className="border-b border-white/[0.06]">
                    <div className="container mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
                        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <ServerStatus />
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                                    Code. Submit.{" "}
                                    <span className="text-emerald-400">Improve.</span>
                                </h1>
                                <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                                    A focused workspace for solving coding challenges with real-time feedback.
                                    Filter by difficulty, code in multiple languages, and track your progress.
                                </p>
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <Link
                                        to={primaryHref}
                                        className="inline-flex items-center gap-2.5 rounded-lg bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                                    >
                                        {primaryLabel}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        to={secondaryHref}
                                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] px-7 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:border-white/[0.2]"
                                    >
                                        {secondaryLabel}
                                    </Link>
                                </div>
                            </div>

                            {/* Code terminal */}
                            <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/40">
                                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                                    </div>
                                    <span className="ml-3 text-[11px] text-slate-500 font-code">Solution.java</span>
                                </div>
                                <div className="p-5 font-code text-[13px] leading-relaxed">
                                    {codeLines.map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="w-7 text-right mr-5 text-slate-600 select-none">{i + 1}</span>
                                            <span className={line.color}>{line.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-5 py-3 border-t border-white/[0.06] bg-[#161b22] flex items-center gap-2.5">
                                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-[11px] text-emerald-400 font-code">✓ All test cases passed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="border-b border-white/[0.06]">
                    <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
                        <div className="max-w-xl mb-14">
                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mb-4">
                                <Sparkles className="inline h-3 w-3 mr-1.5 -mt-px" />
                                Features
                            </p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                                Everything you need to practice
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                Discover, code, submit, review — all in one streamlined loop designed to build real problem-solving skills.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {featureCards.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div
                                        key={f.title}
                                        className="group rounded-xl border border-white/[0.06] bg-[#0f141c] p-7 transition-all hover:border-white/[0.12] hover:bg-[#111820]"
                                    >
                                        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-emerald-400/30 group-hover:bg-emerald-400/[0.06] transition-colors">
                                            <Icon className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                                        </div>
                                        <h3 className="text-base font-medium text-white mb-2">{f.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Workflow */}
                <section className="border-b border-white/[0.06]">
                    <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
                        <div className="max-w-xl mb-14">
                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mb-4">
                                Workflow
                            </p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                                Four steps to better code
                            </h2>
                            <p className="text-base text-slate-400 leading-relaxed">
                                A simple, repeatable cycle that helps you improve with every problem you solve.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-4">
                            {[
                                { num: "01", label: "Sign up", desc: "Create your free account in seconds.", icon: UserPlus },
                                { num: "02", label: "Pick a problem", desc: "Browse by difficulty or search by topic.", icon: Target },
                                { num: "03", label: "Code & submit", desc: "Write your solution and submit for grading.", icon: Zap },
                                { num: "04", label: "Review results", desc: "See per-test feedback and improve.", icon: CheckCircle2 },
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
                    </div>
                </section>

                {/* CTA */}
                <section>
                    <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
                        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f141c] to-[#0b1018] p-10 md:p-14 text-center">
                            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">Ready to start?</h3>
                            <p className="text-base text-slate-400 max-w-md mx-auto mb-8">
                                Solve one problem at a time. Build real momentum. Your first challenge is waiting.
                            </p>
                            <Link
                                to={primaryHref}
                                className="inline-flex items-center gap-2.5 rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                            >
                                {primaryLabel}
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/[0.06] py-8" aria-label="Site footer">
                <div className="container mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-slate-600">© 2026 CodeQuest</p>
                    <div className="flex gap-8 text-sm text-slate-600">
                        <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
                        <Link to="/guidelines" className="hover:text-slate-300 transition-colors">Guidelines</Link>
                        <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
                        <Link to="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
