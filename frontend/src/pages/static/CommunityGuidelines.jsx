import { Link } from "react-router-dom";
import { AlertTriangle, BadgeCheck, ChevronDown, Flag, Gavel, MessageSquareWarning, ShieldAlert } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
    useDocumentHead({ title: "Community Guidelines | CodeQuest", description: "CodeQuest community rules. Learn what's encouraged, what's prohibited, and how enforcement works." });

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
                                    <BadgeCheck className="h-3.5 w-3.5" />Community
                                </p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">Play Fair.<br /><span className="text-orange-500">Learn Honest.</span></h1>
                                <p className="text-lg text-gray-400 leading-relaxed">Rules that keep problem-solving honest and collaboration constructive. We believe fair play is what makes practice meaningful.</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="grid gap-6 md:grid-cols-2 animate-fade-up">
                                <div className="border border-[#1a1a1a] bg-[#111] p-8 rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center">
                                            <BadgeCheck className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <h2 className="text-lg font-bold text-white">Encouraged</h2>
                                    </div>
                                    <ul className="space-y-5">
                                        {encouraged.map((item) => (
                                            <li key={item.text} className="flex items-start gap-3">
                                                <span className="text-orange-500 mt-1 text-xs shrink-0">✓</span>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{item.text}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{item.detail}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border border-[#1a1a1a] bg-[#111] p-8 rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-red-400/10 border border-red-400/20 rounded-lg flex items-center justify-center">
                                            <ShieldAlert className="h-5 w-5 text-red-400" />
                                        </div>
                                        <h2 className="text-lg font-bold text-white">Not Allowed</h2>
                                    </div>
                                    <ul className="space-y-5">
                                        {prohibited.map((item) => (
                                            <li key={item.text} className="flex items-start gap-3">
                                                <span className="text-red-400 mt-1 text-xs shrink-0">✕</span>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{item.text}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{item.detail}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="mb-16 animate-fade-up">
                                <div className="flex items-center gap-3 mb-4">
                                    <Gavel className="h-5 w-5 text-gray-500" />
                                    <h2 className="text-3xl md:text-4xl font-bold">Enforcement</h2>
                                </div>
                                <p className="text-lg text-gray-400 max-w-lg">Violations are handled proportionally. We always prefer education over punishment.</p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-3">
                                {enforcement.map((e, i) => (
                                    <div key={e.level} className={`border ${e.border} bg-[#111] p-8 text-center rounded-lg animate-fade-up`} style={{ animationDelay: `${i * 100}ms` }}>
                                        <p className={`text-3xl font-bold ${e.color} mb-2`}>{e.level}</p>
                                        <p className="text-base font-semibold text-white mb-2">{e.title}</p>
                                        <p className="text-sm text-gray-400 leading-relaxed">{e.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="mb-12 animate-fade-up">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently <span className="text-orange-500">Asked</span></h2>
                                <p className="text-lg text-gray-400 max-w-lg">Common questions about our community policies.</p>
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
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">See An <span className="text-orange-500">Issue?</span></h2>
                                <p className="text-gray-400">Report with clear evidence so we can act fast.</p>
                            </div>
                            <div className="flex gap-3">
                                <Link to="/contact" className="btn-primary"><Flag className="h-4 w-4" />Contact</Link>
                                <Link to="/about" className="btn-outline"><AlertTriangle className="h-4 w-4" />About</Link>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
