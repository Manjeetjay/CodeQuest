import { Link } from "react-router-dom";
import {
    AlertTriangle,
    BadgeCheck,
    Flag,
    Gavel,
    MessageSquareWarning,
    ShieldAlert,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const encouraged = [
    "Solve independently before reading help",
    "Share hints, not full answers",
    "Respect other learners",
    "Report issues with clear context",
];

const prohibited = [
    "Posting live contest solutions",
    "Multi-account abuse",
    "Harassment or hate speech",
    "Automated attacks or scraping",
];

const enforcement = [
    { level: "L1", title: "Warning", color: "text-amber-400" },
    { level: "L2", title: "Temp Ban", color: "text-orange-400" },
    { level: "L3", title: "Permanent", color: "text-red-400" },
];

const faqs = [
    { q: "Can I discuss approaches?", a: "Yes — share reasoning and hints, not full contest solutions." },
    { q: "What counts as cheating?", a: "Copied submissions, multi-account evasion, or hidden assistance." },
    { q: "How to report misconduct?", a: "Use Contact page with links, usernames, and timestamps." },
    { q: "Can penalties be appealed?", a: "Yes, when new context or evidence is provided." },
];

export default function CommunityGuidelines() {
    useDocumentHead({
        title: "Community Guidelines | CodeQuest",
        description: "CodeQuest community rules. Learn what's encouraged, what's prohibited, and how enforcement works. Play fair and learn honestly.",
    });
    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-5xl px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">
                        <BadgeCheck className="inline h-3 w-3 mr-1.5 -mt-px" />
                        Community
                    </p>
                    <h1 className="text-3xl font-semibold text-white mb-2">Play fair. Learn honest.</h1>
                    <p className="text-sm text-slate-400 max-w-md">
                        Rules that keep solving honest and collaboration constructive.
                    </p>
                </header>

                {/* Encouraged / Prohibited */}
                <section className="grid gap-4 md:grid-cols-2 mb-12">
                    <div className="rounded-lg border border-white/[0.06] bg-[#0f141c] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <BadgeCheck className="h-4 w-4 text-emerald-400" />
                            <h2 className="text-sm font-medium text-white">Encouraged</h2>
                        </div>
                        <ul className="space-y-2">
                            {encouraged.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-xs text-slate-400">
                                    <span className="text-emerald-400 mt-px text-[10px]">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-[#0f141c] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldAlert className="h-4 w-4 text-red-400" />
                            <h2 className="text-sm font-medium text-white">Not Allowed</h2>
                        </div>
                        <ul className="space-y-2">
                            {prohibited.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-xs text-slate-400">
                                    <span className="text-red-400 mt-px text-[10px]">✕</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Enforcement */}
                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Gavel className="h-4 w-4 text-slate-500" />
                        <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500">Enforcement</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                        {enforcement.map((e) => (
                            <div key={e.level} className="bg-[#0b0f14] p-5 text-center">
                                <p className={`text-lg font-bold ${e.color}`}>{e.level}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{e.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageSquareWarning className="h-4 w-4 text-slate-500" />
                        <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500">FAQ</h2>
                    </div>
                    <div className="border border-white/[0.06] rounded-lg overflow-hidden divide-y divide-white/[0.04]">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="bg-[#0b0f14] px-5 py-3.5">
                                <summary className="cursor-pointer list-none text-xs font-medium text-white">{faq.q}</summary>
                                <p className="mt-2 text-xs text-slate-500">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="rounded-lg border border-white/[0.08] bg-[#0f141c] p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-white">See an issue?</h2>
                        <p className="text-xs text-slate-500">Report with clear evidence.</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400"
                        >
                            <Flag className="h-3 w-3" />
                            Contact
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.12] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.04]"
                        >
                            <AlertTriangle className="h-3 w-3" />
                            About
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
