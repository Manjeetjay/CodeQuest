import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeHelp, Bug, Handshake, MessageCircle, ShieldAlert, MessagesSquare, Github, Megaphone, ChevronDown, Mail, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const channels = [
    {
        id: "support",
        label: "Product Support",
        desc: "Having trouble with the platform? We're here to help.",
        icon: BadgeHelp,
        email: "[EMAIL_ADDRESS]",
        sla: "24–48h",
        checklist: ["Account email", "Problem ID / URL", "Error summary", "Screenshot"],
    },
    {
        id: "safety",
        label: "Safety Reports",
        desc: "Report misconduct, cheating, or abuse to our safety team.",
        icon: ShieldAlert,
        email: "[EMAIL_ADDRESS]",
        sla: "< 24h",
        checklist: ["Username(s)", "Timestamps / links", "Rule violated", "Evidence"],
    },
    {
        id: "partners",
        label: "Partnerships",
        desc: "Interested in collaborating? Let's talk.",
        icon: Handshake,
        email: "[EMAIL_ADDRESS]",
        sla: "2–4 days",
        checklist: ["Org & role", "Collab idea", "Audience size", "Contact details"],
    },
];

const faqs = [
    { q: "Can't submit code?", a: "Share the problem ID, your programming language, and the exact error message so we can troubleshoot quickly." },
    { q: "Spotted suspicious behavior?", a: "Use the Safety Reports channel above with screenshots, links, and timestamps." },
    { q: "Want to request new topics?", a: "Send your ideas via Product Support. Include the difficulty level and topic area." },
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

            <main className="container mx-auto max-w-6xl px-6">
                {/* Header */}
                <header className="pt-24 pb-20 md:pt-32 md:pb-24 max-w-2xl">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400 mb-5">
                        <MessageCircle className="inline h-3 w-3 mr-1.5 -mt-px" />
                        Contact
                    </p>
                    <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">Get in touch.</h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Pick the right channel and include key details for a fast response.
                        We read every message and respond within the listed SLA.
                    </p>
                </header>

                {/* Channel selector */}
                <section className="pb-16">
                    <div className="grid gap-4 md:grid-cols-3 mb-8">
                        {channels.map((ch) => {
                            const ChIcon = ch.icon;
                            const isActive = ch.id === activeId;
                            return (
                                <button
                                    key={ch.id}
                                    onClick={() => setActiveId(ch.id)}
                                    className={`rounded-xl border p-6 text-left transition-all ${isActive
                                            ? "border-emerald-400/30 bg-[#0f141c]"
                                            : "border-white/[0.06] bg-[#0f141c] hover:border-white/[0.12] hover:bg-[#111820]"
                                        }`}
                                >
                                    <div className={`mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${isActive
                                            ? "bg-emerald-400/[0.08] border-emerald-400/30"
                                            : "bg-white/[0.04] border-white/[0.06]"
                                        }`}>
                                        <ChIcon className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                                    </div>
                                    <p className={`text-base font-medium mb-1 ${isActive ? "text-white" : "text-slate-300"}`}>{ch.label}</p>
                                    <p className="text-sm text-slate-500">{ch.desc}</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active channel detail */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 text-emerald-400" />
                                    <h2 className="text-lg font-medium text-white">{active.label}</h2>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span className="text-xs">{active.sla}</span>
                                </div>
                            </div>
                            <a
                                href={`mailto:${active.email}`}
                                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                {active.email}
                            </a>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-[#0f141c] p-8">
                            <div className="flex items-center gap-2.5 mb-5">
                                <Bug className="h-4 w-4 text-slate-500" />
                                <h3 className="text-sm font-medium uppercase tracking-widest text-slate-500">Include in your message</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {active.checklist.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3.5 py-2 text-sm rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">Join the community</h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            Connect with other developers, share ideas, and stay updated.
                        </p>
                    </div>
                    {/* <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { name: "Discord", desc: "Chat with other developers in real-time.", href: "https://discord.gg/codequest", icon: MessagesSquare },
                            { name: "GitHub", desc: "Contribute, report issues, and follow updates.", href: "https://github.com/codequest", icon: Github },
                            { name: "X / Twitter", desc: "Follow for announcements and tips.", href: "https://twitter.com/codequest", icon: Megaphone },
                        ].map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-xl border border-white/[0.06] bg-[#0f141c] p-7 transition-all hover:border-white/[0.12] hover:bg-[#111820]"
                                >
                                    <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-emerald-400/30 group-hover:bg-emerald-400/[0.06] transition-colors">
                                        <LinkIcon className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <p className="text-base font-medium text-white mb-1">{link.name}</p>
                                    <p className="text-sm text-slate-500">{link.desc}</p>
                                </a>
                            );
                        })}
                    </div> */}
                </section>

                {/* FAQ */}
                <section className="pb-24 md:pb-32 border-t border-white/[0.06] pt-24 md:pt-32">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">Quick answers</h2>
                        <p className="text-base text-slate-400 max-w-lg">
                            Common questions before you reach out.
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
                            <h2 className="text-2xl font-semibold text-white mb-2">Need policy details?</h2>
                            <p className="text-base text-slate-400">Review our community rules before reaching out.</p>
                        </div>
                        <Link
                            to="/guidelines"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] px-7 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:border-white/[0.2] shrink-0"
                        >
                            Read guidelines
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
