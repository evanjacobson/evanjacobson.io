import { useEffect } from 'react';
import { Calendar, Mail, Linkedin, Github, Download } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export function Footer() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: {
                    branding: { brandColor: "#10b981" },
                },
            });
        })();
    }, []);

    return (
        <footer className="border-t border-slate-800">
            <div className="max-w-2xl mx-auto px-6 py-12 text-center">
                <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
                    <button
                        data-cal-link="evanjacobson"
                        data-cal-config='{"theme":"dark"}'
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        Book a Call
                    </button>
                    <a
                        href="mailto:contact@evanjacobson.io"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        Email
                    </a>
                    <a
                        href="https://linkedin.com/in/evanjacobson3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/evanjacobson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                    <Download className="w-3.5 h-3.5" />
                    Resume (PDF)
                </a>
            </div>
        </footer>
    );
}
