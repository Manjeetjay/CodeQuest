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

const featureCards = [
    { title: "Smart Search", desc: "Filter by difficulty, search by title.", icon: Search },
    { title: "Multi-Language", desc: "Code templates in the editor.", icon: Code2 },
    { title: "Live Feedback", desc: "Per-test pass/fail details.", icon: TestTube2 },
    { title: "History", desc: "Reload past submissions.", icon: History },
    { title: "Structured Practice", desc: "Easy → Medium → Hard tracks.", icon: Filter },
    { title: "Fair Play", desc: "Consistent, honest standards.", icon: ShieldCheck },
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
                    <div className="container mx-auto px-6 pt-20 pb-16">
                        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* when someone hovers on it this should show the text "Server Status" */}
                                    <ServerStatus />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight">
                                    Code. Submit.{" "}
                                    <span className="text-emerald-400">Improve.</span>
                                </h1>
                                <p className="max-w-md text-base text-slate-400 leading-relaxed">
                                    A focused workspace for solving coding challenges with real-time feedback.
                                </p>
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <Link
                                        to={primaryHref}
                                        className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                                    >
                                        {primaryLabel}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        to={secondaryHref}
                                        className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04]"
                                    >
                                        {secondaryLabel}
                                    </Link>
                                </div>
                            </div>

                            {/* Code terminal */}
                            <div className="rounded-lg border border-white/[0.08] bg-[#0d1117] overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                    </div>
                                    <span className="ml-2 text-[10px] text-slate-500 font-code">Solution.java</span>
                                </div>
                                <div className="p-4 font-code text-xs leading-relaxed">
                                    {codeLines.map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="w-6 text-right mr-4 text-slate-600 select-none">{i + 1}</span>
                                            <span className={line.color}>{line.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#161b22] flex items-center gap-2">
                                    <Terminal className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[10px] text-emerald-400 font-code">✓ All test cases passed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="border-b border-white/[0.06]">
                    <div className="container mx-auto px-6 py-16">
                        <h2 className="text-2xl font-semibold text-white mb-1">Everything you need</h2>
                        <p className="text-sm text-slate-500 mb-8">Discover, code, submit, review — all in one loop.</p>
                        <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3 bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                            {featureCards.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div key={f.title} className="bg-[#0b0f14] p-5 flex items-start gap-4">
                                        <div className="shrink-0 mt-0.5 text-slate-500">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-white">{f.title}</h3>
                                            <p className="mt-0.5 text-xs text-slate-500">{f.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Workflow */}
                <section className="border-b border-white/[0.06]">
                    <div className="container mx-auto px-6 py-16">
                        <h2 className="text-2xl font-semibold text-white mb-8">How it works</h2>
                        <div className="grid gap-px md:grid-cols-4 bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                            {[
                                { num: "01", label: "Sign up", icon: UserPlus },
                                { num: "02", label: "Pick a problem", icon: Target },
                                { num: "03", label: "Code & submit", icon: Zap },
                                { num: "04", label: "Review results", icon: CheckCircle2 },
                            ].map((step) => {
                                const StepIcon = step.icon;
                                return (
                                    <div key={step.num} className="bg-[#0b0f14] p-6 text-center">
                                        <StepIcon className="h-5 w-5 text-slate-500 mx-auto mb-3" />
                                        <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest mb-1">{step.num}</p>
                                        <p className="text-sm font-medium text-white">{step.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section>
                    <div className="container mx-auto px-6 py-16">
                        <div className="rounded-lg border border-white/[0.08] bg-[#0f141c] p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Ready to start?</h3>
                                <p className="mt-1 text-sm text-slate-500">Solve one problem at a time. Build real momentum.</p>
                            </div>
                            <Link
                                to={primaryHref}
                                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                            >
                                {primaryLabel}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/[0.06] py-6">
                <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs text-slate-600">© 2026 CodeQuest</p>
                    <div className="flex gap-6 text-xs text-slate-600">
                        <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
                        <Link to="/guidelines" className="hover:text-slate-300 transition-colors">Guidelines</Link>
                        <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
