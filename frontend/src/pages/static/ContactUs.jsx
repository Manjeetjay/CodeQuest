import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeHelp, Bug, Handshake, MessageCircle, ShieldAlert, MessagesSquare, Github, Megaphone } from "lucide-react";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const channels = [
    {
        id: "support",
        label: "Product Support",
        icon: BadgeHelp,
        email: "support@codequest.dev",
        sla: "24–48h",
        checklist: ["Account email", "Problem ID / URL", "Error summary", "Screenshot"],
    },
    {
        id: "safety",
        label: "Safety Reports",
        icon: ShieldAlert,
        email: "safety@codequest.dev",
        sla: "< 24h",
        checklist: ["Username(s)", "Timestamps / links", "Rule violated", "Evidence"],
    },
    {
        id: "partners",
        label: "Partnerships",
        icon: Handshake,
        email: "partners@codequest.dev",
        sla: "2–4 days",
        checklist: ["Org & role", "Collab idea", "Audience size", "Contact details"],
    },
];

const faqs = [
    { q: "Can't submit code?", a: "Share problem ID, language, and exact error message." },
    { q: "Suspicious behavior?", a: "Use Safety reports with links & timestamps." },
    { q: "Request new topics?", a: "Send ideas via Product Support with difficulty level." },
];

export default function ContactUs() {
    const [activeId, setActiveId] = useState(channels[0].id);
    useDocumentHead({
        title: "Contact Us | CodeQuest",
        description: "Get in touch with CodeQuest. Reach our product support, safety team, or partnership channels. Find quick answers to common questions.",
    });
    const active = channels.find((c) => c.id === activeId) || channels[0];
    const Icon = active.icon;

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-5xl px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">
                        <MessageCircle className="inline h-3 w-3 mr-1.5 -mt-px" />
                        Contact
                    </p>
                    <h1 className="text-3xl font-semibold text-white mb-2">Get in touch.</h1>
                    <p className="text-sm text-slate-400 max-w-md">
                        Pick the right channel and include key details for a fast response.
                    </p>
                </header>

                {/* Channel selector */}
                <div className="grid grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden mb-8">
                    {channels.map((ch) => {
                        const ChIcon = ch.icon;
                        const isActive = ch.id === activeId;
                        return (
                            <button
                                key={ch.id}
                                onClick={() => setActiveId(ch.id)}
                                className={`bg-[#0b0f14] p-4 text-left transition-colors ${isActive ? "bg-[#0f141c]" : "hover:bg-[#0d1219]"
                                    }`}
                            >
                                <ChIcon className={`h-4 w-4 mb-2 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                                <p className={`text-xs font-medium ${isActive ? "text-white" : "text-slate-400"}`}>{ch.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Active channel detail */}
                <div className="grid gap-4 lg:grid-cols-2 mb-12">
                    <div className="rounded-lg border border-white/[0.06] bg-[#0f141c] p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-slate-500" />
                                <h2 className="text-sm font-medium text-white">{active.label}</h2>
                            </div>
                            <span className="text-[10px] text-slate-600">{active.sla}</span>
                        </div>
                        <a
                            href={`mailto:${active.email}`}
                            className="inline-block text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            {active.email}
                        </a>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-[#0f141c] p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Bug className="h-3.5 w-3.5 text-slate-500" />
                            <h3 className="text-xs font-medium uppercase tracking-widest text-slate-500">Include</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {active.checklist.map((item) => (
                                <span
                                    key={item}
                                    className="px-2.5 py-1 text-[11px] rounded border border-white/[0.06] bg-white/[0.02] text-slate-400"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Community */}
                <section className="mb-12">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Community</h2>
                    <div className="grid grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                        {[
                            { name: "Discord", href: "https://discord.gg/codequest", icon: MessagesSquare },
                            { name: "GitHub", href: "https://github.com/codequest", icon: Github },
                            { name: "X / Twitter", href: "https://twitter.com/codequest", icon: Megaphone },
                        ].map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#0b0f14] p-5 text-center hover:bg-[#0d1219] transition-colors"
                                >
                                    <LinkIcon className="h-4 w-4 text-slate-500 mx-auto mb-2" />
                                    <p className="text-xs font-medium text-white">{link.name}</p>
                                </a>
                            );
                        })}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-12">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Quick Answers</h2>
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
                        <h2 className="text-base font-semibold text-white">Need policy details?</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Review community rules first.</p>
                    </div>
                    <Link
                        to="/guidelines"
                        className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.04]"
                    >
                        Read guidelines
                    </Link>
                </section>
            </main>
        </div>
    );
}
