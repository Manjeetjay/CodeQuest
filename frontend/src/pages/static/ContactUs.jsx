import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeHelp, Bug, Handshake, MessageCircle, ShieldAlert, ChevronDown, Mail, Clock } from "lucide-react";
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
                                <MessageCircle className="inline h-3 w-3 mr-1.5 -mt-px" />
                                Contact
                            </p>
                            <h1 className="heading-display text-4xl md:text-6xl text-white mb-6">
                                GET IN<br />
                                <span className="text-tech-accent heading-editorial">touch.</span>
                            </h1>
                            <p className="text-lg text-tech-muted leading-relaxed font-light">
                                Pick the right channel and include key details for a fast response.
                                We read every message and respond within the listed SLA.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Channel selector */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="grid gap-4 md:grid-cols-3 mb-10 animate-fade-up">
                            {channels.map((ch, index) => {
                                const ChIcon = ch.icon;
                                const isActive = ch.id === activeId;
                                return (
                                    <button
                                        key={ch.id}
                                        onClick={() => setActiveId(ch.id)}
                                        className={`border p-6 text-left transition-all animate-fade-up ${isActive
                                            ? "border-tech-accent/30 bg-tech-bg"
                                            : "border-tech-border/30 bg-tech-bg/50 hover:border-tech-border hover:bg-tech-bg"
                                            }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`mb-3 inline-flex items-center justify-center w-10 h-10 border transition-colors ${isActive
                                            ? "bg-tech-accent/[0.08] border-tech-accent/30"
                                            : "bg-white/[0.04] border-tech-border/30"
                                            }`}>
                                            <ChIcon className={`h-5 w-5 transition-colors ${isActive ? "text-tech-accent" : "text-tech-muted"}`} />
                                        </div>
                                        <p className={`text-base font-semibold mb-1 uppercase tracking-wider ${isActive ? "text-white" : "text-tech-text"}`}>{ch.label}</p>
                                        <p className="text-sm text-tech-muted font-light">{ch.desc}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active channel detail */}
                        <div className="grid gap-6 lg:grid-cols-2 animate-fade-up" style={{ animationDelay: "300ms" }}>
                            <div className="border border-tech-border/30 bg-tech-bg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5 text-tech-accent" />
                                        <h2 className="text-lg font-semibold text-white uppercase tracking-wider">{active.label}</h2>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-tech-muted">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="text-xs">{active.sla}</span>
                                    </div>
                                </div>
                                <a
                                    href={`mailto:${active.email}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-tech-accent hover:text-tech-accent-hover transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {active.email}
                                </a>
                            </div>

                            <div className="border border-tech-border/30 bg-tech-bg p-8">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <Bug className="h-4 w-4 text-tech-muted" />
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-tech-muted">Include in your message</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {active.checklist.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3.5 py-2 text-sm border border-tech-border/30 bg-white/[0.02] text-tech-text"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="relative border-b border-tech-border/30 bg-tech-bg">
                    <div className="container mx-auto max-w-6xl px-6 py-section-y md:py-section-y-md">
                        <div className="mb-12 animate-fade-up">
                            <h2 className="heading-display text-3xl md:text-5xl text-white mb-4">
                                QUICK<br />
                                <span className="text-tech-accent heading-editorial">answers.</span>
                            </h2>
                            <p className="text-lg text-tech-muted max-w-lg font-light">
                                Common questions before you reach out.
                            </p>
                        </div>
                        <div className="border border-tech-border/30 overflow-hidden divide-y divide-tech-border/30 animate-fade-up" style={{ animationDelay: "150ms" }}>
                            {faqs.map((faq) => (
                                <details key={faq.q} className="group bg-tech-panel">
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
                                    NEED POLICY <span className="text-tech-accent heading-editorial">details?</span>
                                </h2>
                                <p className="text-base text-tech-muted font-light">Review our community rules before reaching out.</p>
                            </div>
                            <Link
                                to="/guidelines"
                                className="btn-outline shrink-0"
                            >
                                Read guidelines
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
