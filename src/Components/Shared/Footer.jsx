import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Calendar } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export function Footer({
    title = "Ready to Start a Conversation?",
    text = "I'm looking to build more cool stuff! If you would like to discuss an idea or make a connection, please reach out!"
}) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize Cal.com
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: {
                    branding: { brandColor: "#10b981" }, // emerald-500
                },
            });
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);

        try {
            const workerUrl = 'https://portfolio-email-subscription.evanjacobson.workers.dev/';

            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setEmail('');
            } else {
                console.error('Failed to subscribe', response);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section id="footer" className="bg-gradient-to-br from-blue-600 to-emerald-500 p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {text}
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-8 sm:mb-12">
                <button
                    data-cal-link="evanjacobson"
                    data-cal-config='{"theme":"dark"}'
                    className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:border-white/40"
                >
                    <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                    Book a Call
                </button>

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
                {isSubmitted ? (
                    <div className="bg-white/20 border border-white/30 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white font-medium">Thanks! You're all set.</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-3 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 text-sm sm:text-base"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !email.trim()}
                            className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
