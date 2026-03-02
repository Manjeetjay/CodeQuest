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
        <div className="min-h-screen bg-tech-bg text-tech-text overflow-hidden relative font-sans">
            <Navbar />

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-grid-minimal pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)] opacity-30"></div>

            <main>
                {/* Header */}
                <section className="relative border-b border-tech-border/30">
                    <div className="container mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
                        <div className="animate-fade-up">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-tech-accent mb-5">
                                <Map className="inline h-3 w-3 mr-1.5 -mt-px" />
                                Navigation
                            </p>
                            <h1 className="heading-display text-4xl md:text-6xl text-white mb-4">
                                SITE<span className="text-tech-accent heading-editorial">map.</span>
                            </h1>
                            <p className="text-base text-tech-muted max-w-md font-light">
                                A complete list of all pages on CodeQuest.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sections */}
                <section className="relative border-b border-tech-border/30 bg-tech-panel">
                    <div className="container mx-auto max-w-5xl px-6 py-section-y md:py-section-y-md">
                        <div className="grid gap-8 md:grid-cols-3">
                            {sections.map((section, index) => (
                                <div
                                    key={section.title}
                                    className="border border-tech-border/30 bg-tech-bg p-6 animate-fade-up"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-tech-accent mb-5">
                                        {section.title}
                                    </h2>
                                    <ul className="space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.to}>
                                                <Link
                                                    to={link.to}
                                                    className="group flex items-start gap-2"
                                                >
                                                    <ExternalLink className="h-3 w-3 text-tech-muted mt-1 shrink-0 group-hover:text-tech-accent transition-colors" />
                                                    <div>
                                                        <p className="text-sm font-medium text-tech-text group-hover:text-tech-accent transition-colors">
                                                            {link.label}
                                                            {link.protected && (
                                                                <span className="ml-2 text-[9px] px-1.5 py-0.5 border border-tech-border/30 text-tech-muted align-middle">
                                                                    LOGIN
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-tech-muted mt-0.5 font-light">
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
                    </div>
                </section>

                {/* XML Sitemap reference */}
                <section className="relative bg-tech-bg">
                    <div className="container mx-auto max-w-5xl px-6 py-section-y">
                        <div className="animate-fade-up border border-tech-border/30 bg-tech-panel p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-white uppercase tracking-wider">For search engines</h2>
                                <p className="text-xs text-tech-muted mt-0.5 font-light">
                                    Machine-readable XML sitemap for crawlers.
                                </p>
                            </div>
                            <a
                                href="/sitemap.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline btn-sm"
                            >
                                <ExternalLink className="h-3 w-3" />
                                sitemap.xml
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
