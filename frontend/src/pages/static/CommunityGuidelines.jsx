import { Link } from "react-router-dom";
import {
    AlertTriangle,
    BadgeCheck,
    ChevronDown,
    Flag,
    Gavel,
    MessageSquareWarning,
    ShieldAlert,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const encouraged = [
    { text: "Solve independently before reading help", detail: "Build real understanding by working through problems on your own first." },
    { text: "Share hints, not full answers", detail: "Guide others toward the solution without giving it away." },
    { text: "Respect other learners", detail: "Everyone is here to grow. Be patient and constructive." },
    { text: "Report issues with clear context", detail: "Include links, usernames, and timestamps when reporting." },
];

const prohibited = [
    { text: "Posting live contest solutions", detail: "Wait until the contest ends before sharing any approach." },
    { text: "Multi-account abuse", detail: "One account per person. No alts for evasion." },
    { text: "Harassment or hate speech", detail: "Zero tolerance. Results in immediate permanent ban." },
    { text: "Automated attacks or scraping", detail: "Don't abuse the platform. Respect rate limits and terms." },
];

const enforcement = [
    { level: "L1", title: "Warning", desc: "First offense. A friendly reminder to review the rules.", color: "text-amber-400", border: "border-amber-400/20" },
    { level: "L2", title: "Temporary Ban", desc: "Repeated violations. Access suspended for a set period.", color: "text-orange-400", border: "border-orange-400/20" },
    { level: "L3", title: "Permanent Ban", desc: "Serious or repeated offenses. Account permanently removed.", color: "text-red-400", border: "border-red-400/20" },
];

const faqs = [
    { q: "Can I discuss approaches with others?", a: "Absolutely — share reasoning, thought processes, and hints. Just avoid sharing complete solutions for active contests." },
    { q: "What counts as cheating?", a: "Copied submissions, multi-account evasion, or receiving hidden assistance during evaluation." },
    { q: "How do I report misconduct?", a: "Use the Contact page. Include links, usernames, and timestamps so we can investigate effectively." },
    { q: "Can penalties be appealed?", a: "Yes. If you believe a penalty was issued in error, reach out with new context or evidence and we'll review." },
];

export default function CommunityGuidelines() {
    useDocumentHead({
        title: "Community Guidelines | CodeQuest",
        description: "CodeQuest community rules. Learn what's encouraged, what's prohibited, and how enforcement works. Play fair and learn honestly.",
    });
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
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-tech-accent mb-5">
                                <BadgeCheck className="inline h-3 w-3 mr-1.5 -mt-px" />
                                Community
                            </p>
                            <h1 className="heading-display text-4xl md:text-6xl text-white mb-6">
                                PLAY FAIR.<br />
                                <span className="text-tech-accent heading-editorial">learn honest.</span>
                            </h1>
                            <p className="text-lg text-tech-muted leading-relaxed font-light">
                                Rules that keep problem-solving honest and collaboration constructive.
                                We believe fair play is what makes practice meaningful.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Encouraged / Prohibited */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="grid gap-8 md:grid-cols-2 animate-fade-up">
                            <div className="border border-tech-border/30 bg-tech-bg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-tech-accent/[0.08] border border-tech-accent/20">
                                        <BadgeCheck className="h-4 w-4 text-tech-accent" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white uppercase tracking-wider">Encouraged</h2>
                                </div>
                                <ul className="space-y-5">
                                    {encouraged.map((item) => (
                                        <li key={item.text} className="flex items-start gap-3">
                                            <span className="text-tech-accent mt-1 text-xs shrink-0">✓</span>
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.text}</p>
                                                <p className="text-sm text-tech-muted mt-0.5 font-light">{item.detail}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border border-tech-border/30 bg-tech-bg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-400/[0.08] border border-red-400/20">
                                        <ShieldAlert className="h-4 w-4 text-red-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-white uppercase tracking-wider">Not Allowed</h2>
                                </div>
                                <ul className="space-y-5">
                                    {prohibited.map((item) => (
                                        <li key={item.text} className="flex items-start gap-3">
                                            <span className="text-red-400 mt-1 text-xs shrink-0">✕</span>
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.text}</p>
                                                <p className="text-sm text-tech-muted mt-0.5 font-light">{item.detail}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enforcement */}
                <section className="relative border-b border-tech-border/30 bg-tech-bg">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="mb-16 animate-fade-up">
                            <div className="flex items-center gap-3 mb-4">
                                <Gavel className="h-5 w-5 text-tech-muted" />
                                <h2 className="heading-display text-3xl md:text-5xl text-white">
                                    ENFORCEMENT
                                </h2>
                            </div>
                            <p className="text-lg text-tech-muted max-w-lg font-light">
                                Violations are handled proportionally. We always prefer education over punishment.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3 border-t border-tech-border/30 pt-12">
                            {enforcement.map((e, index) => (
                                <div
                                    key={e.level}
                                    className={`border ${e.border} bg-tech-panel p-8 text-center animate-fade-up`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <p className={`text-3xl font-bold ${e.color} mb-2`}>{e.level}</p>
                                    <p className="text-base font-semibold text-white mb-2 uppercase tracking-wider">{e.title}</p>
                                    <p className="text-sm text-tech-muted leading-relaxed font-light">{e.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="mb-12 animate-fade-up">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquareWarning className="h-5 w-5 text-tech-muted" />
                                <h2 className="heading-display text-3xl md:text-5xl text-white">
                                    FREQUENTLY<br />
                                    <span className="text-tech-accent heading-editorial">asked.</span>
                                </h2>
                            </div>
                            <p className="text-lg text-tech-muted max-w-lg font-light">
                                Common questions about our community policies.
                            </p>
                        </div>
                        <div className="border border-tech-border/30 overflow-hidden divide-y divide-tech-border/30 animate-fade-up" style={{ animationDelay: "150ms" }}>
                            {faqs.map((faq) => (
                                <details key={faq.q} className="group bg-tech-bg">
                                    <summary className="cursor-pointer list-none px-7 py-5 flex items-center justify-between text-base font-medium text-white hover:bg-tech-panel-inner transition-colors">
                                        {faq.q}
                                        <ChevronDown className="h-4 w-4 text-tech-muted transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="px-7 pb-5 text-sm text-tech-muted leading-relaxed font-light">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative bg-tech-bg">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-[100px]">
                        <div className="animate-fade-up flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-tech-border/30 pt-16">
                            <div>
                                <h2 className="heading-display text-3xl md:text-4xl text-white mb-2">
                                    SEE AN <span className="text-tech-accent heading-editorial">issue?</span>
                                </h2>
                                <p className="text-base text-tech-muted font-light">Report with clear evidence so we can act fast.</p>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    to="/contact"
                                    className="btn-primary"
                                >
                                    <Flag className="h-4 w-4" />
                                    Contact
                                </Link>
                                <Link
                                    to="/about"
                                    className="btn-outline"
                                >
                                    <AlertTriangle className="h-4 w-4" />
                                    About
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
