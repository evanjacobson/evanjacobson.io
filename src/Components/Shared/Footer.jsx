import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

export function Footer({ 
    title = "Ready to Start a Conversation?",
    text = "Whether you have an exciting project, a startup opportunity, or just want to chat about technology, I'd love to hear from you."
}) {
    return (
        <section className="bg-gradient-to-br from-emerald-500 to-blue-500 p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {text}
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-8 sm:mb-12">
                <a
                    href="mailto:contact@evanjacobson.io"
                    className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:border-white/40"
                >
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                    Email Me
                </a>

                <a
                    href="https://linkedin.com/in/evanjacobson3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:border-white/40"
                >
                    <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
                    LinkedIn
                </a>
            </div>

            {/* Email signup */}
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl max-w-lg mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                    Stay Updated
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-3 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 text-sm sm:text-base"
                    />
                    <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto whitespace-nowrap text-sm sm:text-base">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
}
