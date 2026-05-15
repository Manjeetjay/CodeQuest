import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-[#1a1a1a] mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-black font-bold text-sm rounded-sm">
                                &gt;_
                            </div>
                            <span className="font-bold text-[#e0e0e0]">CodeQuest</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Practice makes permanent. Make every rep count.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm text-[#e0e0e0]">Practice</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/problems" className="hover:text-orange-500 transition-colors">All Problems</Link></li>
                            <li><Link to="/about" className="hover:text-orange-500 transition-colors">Study Plans</Link></li>
                            <li><Link to="/guidelines" className="hover:text-orange-500 transition-colors">Guidelines</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm text-[#e0e0e0]">Community</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/guidelines" className="hover:text-orange-500 transition-colors">Community Rules</Link></li>
                            <li><Link to="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm text-[#e0e0e0]">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About</Link></li>
                            <li><Link to="/server-status" className="hover:text-orange-500 transition-colors">Status</Link></li>
                            <li><Link to="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>© 2026 CodeQuest. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Made with &#123;precision&#125; for developers</p>
                </div>
            </div>
        </footer>
    );
}
