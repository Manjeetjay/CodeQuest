import { Link } from "react-router-dom";
import { Map, ExternalLink } from "lucide-react";
import Navbar from "../../components/Navbar";
import useDocumentHead from "../../utils/useDocumentHead";

const sections = [
    {
        title: "Main",
        links: [
            { to: "/", label: "Home", desc: "Landing page & overview" },
            { to: "/about", label: "About", desc: "How CodeQuest works" },
            { to: "/contact", label: "Contact Us", desc: "Get in touch with the team" },
            { to: "/guidelines", label: "Community Guidelines", desc: "Rules & fair-play policy" },
        ],
    },
    {
        title: "Account",
        links: [
            { to: "/login", label: "Login", desc: "Sign in to your account" },
            { to: "/register", label: "Register", desc: "Create a free account" },
        ],
    },
    {
        title: "Platform",
        links: [
            { to: "/problems", label: "Problems", desc: "Browse coding challenges", protected: true },
        ],
    },
];

export default function Sitemap() {
    useDocumentHead({
        title: "Sitemap | CodeQuest",
        description: "Browse all pages on CodeQuest. Find coding challenges, learn about the platform, and get in touch.",
    });

    return (
        <div className="min-h-screen bg-[#0b0f14] text-slate-100">
            <Navbar />

            <main className="container mx-auto max-w-5xl px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">
                        <Map className="inline h-3 w-3 mr-1.5 -mt-px" />
                        Navigation
                    </p>
                    <h1 className="text-3xl font-semibold text-white mb-2">Sitemap</h1>
                    <p className="text-sm text-slate-400 max-w-md">
                        A complete list of all pages on CodeQuest.
                    </p>
                </header>

                {/* Sections */}
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            className="rounded-lg border border-white/[0.06] bg-[#0f141c] p-5"
                        >
                            <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="group flex items-start gap-2"
                                        >
                                            <ExternalLink className="h-3 w-3 text-slate-600 mt-1 shrink-0 group-hover:text-emerald-400 transition-colors" />
                                            <div>
                                                <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                                                    {link.label}
                                                    {link.protected && (
                                                        <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded border border-white/[0.08] text-slate-500 align-middle">
                                                            LOGIN
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {link.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* XML Sitemap reference */}
                <section className="rounded-lg border border-white/[0.08] bg-[#0f141c] p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-white">For search engines</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Machine-readable XML sitemap for crawlers.
                        </p>
                    </div>
                    <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.04]"
                    >
                        <ExternalLink className="h-3 w-3" />
                        sitemap.xml
                    </a>
                </section>
            </main>
        </div>
    );
}
