import Navbar from "../../components/Navbar";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8 pb-6 border-b border-zinc-800">
                    Contact Us
                </h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            We'd love to hear from you. Whether you have questions, feedback,
                            or suggestions for new features, feel free to reach out to us.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-3">Email</h3>
                            <p className="text-lg font-semibold text-white mb-2">
                                <a href="mailto:support@codequest.dev" className="hover:text-gray-300 transition-colors">
                                    support@codequest.dev
                                </a>
                            </p>
                            <p className="text-sm text-gray-400">
                                For general inquiries, technical support, or partnership opportunities.
                            </p>
                        </div>

                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-3">Community</h3>
                            <p className="text-lg font-semibold text-white mb-2">
                                <a href="https://discord.gg/codequest" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                    Join our Discord
                                </a>
                            </p>
                            <p className="text-sm text-gray-400">
                                Connect with fellow developers, share solutions, and get help from the community.
                            </p>
                        </div>

                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-3">GitHub</h3>
                            <p className="text-lg font-semibold text-white mb-2">
                                <a href="https://github.com/codequest" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                    @codequest
                                </a>
                            </p>
                            <p className="text-sm text-gray-400">
                                Contribute to our open-source projects, report bugs, or request features.
                            </p>
                        </div>

                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>
                            <p className="text-lg font-semibold text-white mb-2">
                                <a href="https://twitter.com/codequest" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                    @codequest
                                </a>
                            </p>
                            <p className="text-sm text-gray-400">
                                Follow us for updates, tips, and announcements about new problems.
                            </p>
                        </div>
                    </div>

                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Response Time</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We aim to respond to all inquiries within 24-48 hours. For urgent
                            technical issues, please include "URGENT" in your email subject line.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
