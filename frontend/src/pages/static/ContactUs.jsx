import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeHelp, Bug, Handshake, MessageCircle, ShieldAlert, ChevronDown, Mail, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentHead from "../../utils/useDocumentHead";

const channels = [
    { id: "support", label: "Product Support", desc: "Having trouble with the platform? We're here to help.", icon: BadgeHelp, email: "[EMAIL_ADDRESS]", sla: "24–48h", checklist: ["Account email", "Problem ID / URL", "Error summary", "Screenshot"] },
    { id: "safety", label: "Safety Reports", desc: "Report misconduct, cheating, or abuse to our safety team.", icon: ShieldAlert, email: "[EMAIL_ADDRESS]", sla: "< 24h", checklist: ["Username(s)", "Timestamps / links", "Rule violated", "Evidence"] },
    { id: "partners", label: "Partnerships", desc: "Interested in collaborating? Let's talk.", icon: Handshake, email: "[EMAIL_ADDRESS]", sla: "2–4 days", checklist: ["Org & role", "Collab idea", "Audience size", "Contact details"] },
];

const faqs = [
    { q: "Can't submit code?", a: "Share the problem ID, your programming language, and the exact error message so we can troubleshoot quickly." },
    { q: "Spotted suspicious behavior?", a: "Use the Safety Reports channel above with screenshots, links, and timestamps." },
    { q: "Want to request new topics?", a: "Send your ideas via Product Support. Include the difficulty level and topic area." },
];

export default function ContactUs() {
    const [activeId, setActiveId] = useState(channels[0].id);
    useDocumentHead({ title: "Contact Us | CodeQuest", description: "Get in touch with CodeQuest. Reach our product support, safety team, or partnership channels." });
    const active = channels.find((c) => c.id === activeId) || channels[0];
    const Icon = active.icon;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
            <div className="fixed inset-0 bg-grid-minimal pointer-events-none opacity-30" />
            <div className="relative z-10">
                <Navbar />
                <main>
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-24">
                            <div className="max-w-3xl animate-fade-up">
                                <p className="text-sm font-semibold text-orange-500 mb-4 flex items-center gap-2 border border-orange-500/30 px-3 py-1 bg-orange-500/5 w-fit">
                                    <MessageCircle className="h-3.5 w-3.5" />Contact
                                </p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In <span className="text-orange-500">Touch.</span></h1>
                                <p className="text-lg text-gray-400 leading-relaxed">Pick the right channel and include key details for a fast response. We read every message and respond within the listed SLA.</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="grid gap-4 md:grid-cols-3 mb-10 animate-fade-up">
                                {channels.map((ch, i) => {
                                    const ChIcon = ch.icon;
                                    const isActive = ch.id === activeId;
                                    return (
                                        <button key={ch.id} onClick={() => setActiveId(ch.id)}
                                            className={`border p-6 text-left transition-all rounded-lg ${isActive ? "border-orange-500/50 bg-[#111] shadow-[0_0_20px_rgba(255,165,0,0.1)]" : "border-[#1a1a1a] bg-[#111]/50 hover:border-[#333]"}`}
                                            style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className={`mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${isActive ? "bg-orange-500/10 border border-orange-500/30" : "bg-white/[0.04] border border-[#222]"}`}>
                                                <ChIcon className={`h-5 w-5 ${isActive ? "text-orange-500" : "text-gray-500"}`} />
                                            </div>
                                            <p className={`text-base font-semibold mb-1 ${isActive ? "text-white" : "text-[#e0e0e0]"}`}>{ch.label}</p>
                                            <p className="text-sm text-gray-500">{ch.desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="grid gap-6 lg:grid-cols-2 animate-fade-up" style={{ animationDelay: "300ms" }}>
                                <div className="border border-[#1a1a1a] bg-[#111] p-8 rounded-lg">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-orange-500" />
                                            <h2 className="text-lg font-semibold text-white">{active.label}</h2>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Clock className="h-3.5 w-3.5" /><span className="text-xs">{active.sla}</span>
                                        </div>
                                    </div>
                                    <a href={`mailto:${active.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">
                                        <Mail className="h-4 w-4" />{active.email}
                                    </a>
                                </div>
                                <div className="border border-[#1a1a1a] bg-[#111] p-8 rounded-lg">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <Bug className="h-4 w-4 text-gray-500" />
                                        <h3 className="text-sm font-semibold text-gray-500">Include in your message</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {active.checklist.map((item) => (
                                            <span key={item} className="px-3.5 py-2 text-sm border border-[#222] bg-[#0a0a0a] text-[#e0e0e0] rounded">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="mb-12 animate-fade-up">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick <span className="text-orange-500">Answers</span></h2>
                                <p className="text-lg text-gray-400 max-w-lg">Common questions before you reach out.</p>
                            </div>
                            <div className="border border-[#1a1a1a] overflow-hidden divide-y divide-[#1a1a1a] rounded-lg animate-fade-up">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="group bg-[#111]">
                                        <summary className="cursor-pointer list-none px-7 py-5 flex items-center justify-between text-base font-medium text-white hover:bg-[#1a1a1a] transition-colors">
                                            {faq.q}<ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" />
                                        </summary>
                                        <p className="px-7 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto px-6 py-20">
                        <div className="animate-fade-up flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-[#111] border border-[#1a1a1a] rounded-lg p-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Policy <span className="text-orange-500">Details?</span></h2>
                                <p className="text-gray-400">Review our community rules before reaching out.</p>
                            </div>
                            <Link to="/guidelines" className="btn-outline shrink-0">Read Guidelines</Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
