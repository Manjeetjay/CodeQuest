import { Link } from "react-router-dom";
import { Map, ExternalLink } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useDocumentHead from "../../utils/useDocumentHead";

const sections = [
    { title: "Main", links: [
        { to: "/", label: "Home", desc: "Landing page & overview" },
        { to: "/about", label: "About", desc: "How CodeQuest works" },
        { to: "/contact", label: "Contact Us", desc: "Get in touch with the team" },
        { to: "/guidelines", label: "Community Guidelines", desc: "Rules & fair-play policy" },
    ]},
    { title: "Account", links: [
        { to: "/login", label: "Login", desc: "Sign in to your account" },
        { to: "/register", label: "Register", desc: "Create a free account" },
    ]},
    { title: "Platform", links: [
        { to: "/problems", label: "Problems", desc: "Browse coding challenges", protected: true },
    ]},
];

export default function Sitemap() {
    useDocumentHead({ title: "Sitemap | CodeQuest", description: "Browse all pages on CodeQuest." });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] overflow-hidden relative">
            <div className="fixed inset-0 bg-grid-minimal pointer-events-none opacity-30" />
            <div className="relative z-10">
                <Navbar />
                <main>
                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
                            <div className="animate-fade-up">
                                <p className="text-sm font-semibold text-orange-500 mb-4 flex items-center gap-2 border border-orange-500/30 px-3 py-1 bg-orange-500/5 w-fit">
                                    <Map className="h-3.5 w-3.5" />Navigation
                                </p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">Site<span className="text-orange-500">map.</span></h1>
                                <p className="text-gray-400 max-w-md">A complete list of all pages on CodeQuest.</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b border-[#1a1a1a]">
                        <div className="max-w-7xl mx-auto px-6 py-20">
                            <div className="grid gap-6 md:grid-cols-3">
                                {sections.map((section, i) => (
                                    <div key={section.title} className="border border-[#1a1a1a] bg-[#111] p-6 rounded-lg animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <h2 className="text-sm font-bold text-orange-500 mb-5 tracking-wide">{section.title}</h2>
                                        <ul className="space-y-4">
                                            {section.links.map((link) => (
                                                <li key={link.to}>
                                                    <Link to={link.to} className="group flex items-start gap-2">
                                                        <ExternalLink className="h-3 w-3 text-gray-500 mt-1 shrink-0 group-hover:text-orange-500 transition-colors" />
                                                        <div>
                                                            <p className="text-sm font-medium text-[#e0e0e0] group-hover:text-orange-500 transition-colors">
                                                                {link.label}
                                                                {link.protected && <span className="ml-2 text-[9px] px-1.5 py-0.5 border border-[#222] text-gray-500 align-middle rounded">LOGIN</span>}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto px-6 py-20">
                        <div className="animate-fade-up border border-[#1a1a1a] bg-[#111] p-6 rounded-lg flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-white">For search engines</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Machine-readable XML sitemap for crawlers.</p>
                            </div>
                            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                                <ExternalLink className="h-3 w-3" />sitemap.xml
                            </a>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}
