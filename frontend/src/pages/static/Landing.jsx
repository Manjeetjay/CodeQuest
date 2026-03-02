import { Link } from "react-router-dom";
import {
    ArrowRight,
    Search,
    Code2,
    TestTube2,
    History,
    Filter,
    ShieldCheck,
    Terminal,
    UserPlus,
    Target,
    Zap,
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
    { text: "    Map<Integer, Integer> map = new HashMap<>();", color: "text-tech-text" },
    { text: "    for (int i = 0; i < nums.length; i++) {", color: "text-tech-text" },
    { text: "      if (map.containsKey(target - nums[i]))", color: "text-tech-accent-hover" },
    { text: '        return new int[]{map.get(target-nums[i]), i};', color: "text-tech-accent-hover" },
    { text: "      map.put(nums[i], i);", color: "text-tech-muted" },
    { text: "    }", color: "text-tech-muted" },
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
        <div>
            <div className="min-h-screen bg-tech-bg text-tech-text overflow-hidden relative font-sans">
                <Navbar />

                {/* Subtle Minimalist Background Grid */}
                <div className="absolute inset-0 bg-grid-minimal pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] opacity-30"></div>

                <main>
                    {/* Hero */}
                    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 border-b border-tech-border/30">
                        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                            <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-up">
                                {/* Beta Tag */}
                                <div className="flex justify-center mb-2">
                                    <ServerStatus />
                                </div>

                                {/* Massive Editorial Headline */}
                                <h1 className="heading-display text-[4.5rem] md:text-[7rem] lg:text-[9rem]">
                                    ALGORITHMIC<br />
                                    <span className="text-tech-accent heading-editorial">precision.</span>
                                </h1>

                                {/* Minimal Subtitle */}
                                <p className="max-w-2xl mx-auto text-lg md:text-xl text-tech-muted font-light tracking-wide leading-relaxed mt-4">
                                    The definitive workspace for logical mastery. Execute, verify, and track your progression in an environment engineered for focus.
                                </p>

                                {/* Contrast CTA */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                                    <Link
                                        to={primaryHref}
                                        className="btn-primary w-full sm:w-auto"
                                    >
                                        <span>{primaryLabel}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        to={secondaryHref}
                                        className="inline-flex items-center gap-2 border-b border-tech-muted pb-1 text-sm font-semibold uppercase tracking-[0.1em] text-tech-muted transition-all hover:text-white hover:border-white w-full sm:w-auto justify-center mt-4 sm:mt-0"
                                    >
                                        {secondaryLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features (Editorial Grid) */}
                    <section className="relative border-b border-tech-border/30 bg-tech-panel">
                        <div className="container mx-auto px-6 py-section-y md:py-section-y-md relative z-10">
                            <div className="max-w-3xl mb-20 animate-fade-up">
                                <h2 className="heading-display text-4xl md:text-6xl text-white mb-8">
                                    SYSTEMATIC<br />
                                    <span className="text-tech-accent heading-editorial">architecture.</span>
                                </h2>
                                <p className="text-xl text-tech-muted leading-relaxed font-light">
                                    An environment engineered to eliminate friction, providing you with everything necessary to analyze, construct, and verify logic.
                                </p>
                            </div>
                            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 border-t border-tech-border/30 pt-16">
                                {featureCards.map((f, index) => {
                                    const Icon = f.icon;
                                    return (
                                        <div
                                            key={f.title}
                                            className="group relative animate-fade-up"
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            <div className="mb-6">
                                                <Icon className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110 group-hover:text-tech-accent" strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide uppercase">{f.title}</h3>
                                            <p className="text-base text-tech-muted leading-relaxed font-light">{f.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Workflow (Editorial Steps) */}
                    <section className="relative border-b border-tech-border/30 bg-tech-bg overflow-hidden">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[1px] border-tech-border/20 rounded-full min-h-0 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="container mx-auto px-6 py-section-y md:py-section-y-md relative z-10">
                            <div className="max-w-2xl mb-24 animate-fade-up">
                                <h2 className="heading-display text-4xl md:text-6xl text-white mb-8">
                                    EXECUTION<br />
                                    <span className="text-tech-accent heading-editorial">flow.</span>
                                </h2>
                                <p className="text-xl text-tech-muted leading-relaxed font-light">
                                    A systematic sequence designed for rapid iteration and continuous scaling of your technical abilities.
                                </p>
                            </div>

                            <div className="grid gap-y-24 md:grid-cols-1 max-w-4xl mx-auto">
                                {[
                                    { num: "One", label: "Initialize", desc: "Instantiate your account in seconds and log in via secure protocols." },
                                    { num: "Two", label: "Select Target", desc: "Filter algorithms by specific parameters. Target your weak points." },
                                    { num: "Three", label: "Execute", desc: "Compile code within our zero-latency editor and transmit for validation." },
                                    { num: "Four", label: "Analyze", desc: "Process real-time feedback data to optimize future compilation runs." },
                                ].map((step, index) => {
                                    return (
                                        <div key={step.num} className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                                            <div className="md:w-1/3">
                                                <span className="heading-editorial text-4xl text-tech-muted/40 transition-colors duration-500 hover:text-white">{step.num}</span>
                                            </div>
                                            <div className="md:w-2/3 border-t border-tech-border/30 pt-4 mt-2">
                                                <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">{step.label}</h3>
                                                <p className="text-lg text-tech-muted leading-relaxed font-light">{step.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* CTA (Minimalist High-Contrast) */}
                    <section className="relative bg-tech-bg border-b border-tech-border/30">
                        <div className="container mx-auto px-6 py-section-y md:py-[150px]">
                            <div className="text-center max-w-4xl mx-auto">
                                <h3 className="heading-display text-5xl md:text-7xl lg:text-8xl text-white mb-10">
                                    READY TO<br />
                                    <span className="text-tech-accent heading-editorial tracking-normal">initiate?</span>
                                </h3>
                                <div className="flex justify-center mt-12">
                                    <Link
                                        to={primaryHref}
                                        className="btn-primary"
                                    >
                                        {primaryLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-tech-border/30 py-12 md:py-20 bg-[#000000]" aria-label="Site footer">
                    <div className="container mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-12 md:flex-row">
                        <div>
                            <h4 className="heading-editorial text-2xl text-tech-accent mb-2">CodeQuest.</h4>
                            <p className="text-sm text-tech-muted font-light">© 2026 Logical mastery workspace.</p>
                        </div>
                        <div className="flex gap-10 text-xs font-bold uppercase tracking-[0.15em] text-tech-muted">
                            <Link to="/about" className="hover:text-white transition-colors">About</Link>
                            <Link to="/guidelines" className="hover:text-white transition-colors">Guidelines</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}