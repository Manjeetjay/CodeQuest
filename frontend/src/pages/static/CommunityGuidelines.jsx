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
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-6xl px-6">
                {/* Header */}
                <header className="pt-24 pb-20 md:pt-32 md:pb-24 max-w-2xl">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mb-5">
                        <BadgeCheck className="inline h-3 w-3 mr-1.5 -mt-px" />
                        Community
                    </p>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
                        Play fair.{" "}
                        <span className="text-emerald-400">Learn honest.</span>
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Rules that keep problem-solving honest and collaboration constructive.
                        We believe fair play is what makes practice meaningful.
                    </p>
                </header>

                {/* Encouraged / Prohibited */}
                <section className="grid gap-6 md:grid-cols-2 pb-24 md:pb-32">
                    <div className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-400/[0.08] border border-emerald-400/20">
                                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                            </div>
                            <h2 className="text-lg font-medium text-white">Encouraged</h2>
                        </div>
                        <ul className="space-y-5">
                            {encouraged.map((item) => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <span className="text-emerald-400 mt-1 text-xs shrink-0">✓</span>
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.text}</p>
                                        <p className="text-sm text-slate-500 mt-0.5">{item.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-400/[0.08] border border-red-400/20">
                                <ShieldAlert className="h-4 w-4 text-red-400" />
                            </div>
                            <h2 className="text-lg font-medium text-white">Not Allowed</h2>
                        </div>
                        <ul className="space-y-5">
                            {prohibited.map((item) => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1 text-xs shrink-0">✕</span>
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.text}</p>
                                        <p className="text-sm text-slate-500 mt-0.5">{item.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Enforcement */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Gavel className="h-5 w-5 text-slate-500" />
                            <h2 className="text-2xl font-semibold text-white">Enforcement</h2>
                        </div>
                        <p className="text-base text-slate-400 max-w-lg">
                            Violations are handled proportionally. We always prefer education over punishment.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {enforcement.map((e) => (
                            <div key={e.level} className={`rounded-xl border ${e.border} bg-[#0f141c] p-8 text-center`}>
                                <p className={`text-3xl font-bold ${e.color} mb-2`}>{e.level}</p>
                                <p className="text-base font-medium text-white mb-2">{e.title}</p>
                                <p className="text-sm text-slate-500 leading-relaxed">{e.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-3">
                            <MessageSquareWarning className="h-5 w-5 text-slate-500" />
                            <h2 className="text-2xl font-semibold text-white">Frequently asked</h2>
                        </div>
                        <p className="text-base text-slate-400 max-w-lg">
                            Common questions about our community policies.
                        </p>
                    </div>
                    <div className="rounded-xl border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="group bg-[#0f141c]">
                                <summary className="cursor-pointer list-none px-7 py-5 flex items-center justify-between text-base font-medium text-white hover:bg-[#111820] transition-colors">
                                    {faq.q}
                                    <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
                                </summary>
                                <p className="px-7 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="pb-24 md:pb-32">
                    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f141c] to-[#0b1018] p-10 md:p-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-2">See an issue?</h2>
                            <p className="text-base text-slate-400">Report with clear evidence so we can act fast.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
                            >
                                <Flag className="h-4 w-4" />
                                Contact
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:border-white/[0.2]"
                            >
                                <AlertTriangle className="h-4 w-4" />
                                About
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
