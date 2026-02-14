import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Home({ autoOpenBooking = false }) {
    useEffect(() => {
        if (autoOpenBooking) {
            setTimeout(() => {
                const calButton = document.querySelector('[data-cal-link="evanjacobson"]');
                if (calButton) calButton.click();
            }, 1000);
        }
    }, [autoOpenBooking]);

    return (
        <div className="min-h-[100dvh] flex items-center justify-center px-6">
            <div className="max-w-2xl w-full py-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
                    Evan Jacobson
                </h1>
                <p className="text-lg text-slate-400 mb-10">
                    I build tools that automate the tedious so people can focus on what humans do best: think.
                </p>

                <div className="space-y-4 text-slate-300 leading-relaxed mb-12">
                    <p>
                        Right now I'm co-founding{' '}
                        <Link to="/work/orai" className="text-blue-400 hover:text-blue-300 transition-colors">OrAI</Link>,
                        where we're giving early childhood educators their time back — automating lesson plans,
                        parent communications, document tracking, and compliant scheduling so they can spend
                        less time on paperwork and more time with kids. I own everything from architecture to
                        compliance to investor strategy, because I believe engineers should be owners, not ticket-takers.
                    </p>
                    <p>
                        Before that I was the founding engineer at{' '}
                        <Link to="/work/onedeal" className="text-purple-400 hover:text-purple-300 transition-colors">OneDeal</Link>{' '}
                        (Techstars '23), where I built agentic web search from scratch — months before MCP or
                        AI web search existed. I'm obsessed with agentic AI systems: multi-agent pipelines,
                        autonomous search, AI tooling. I've been building these before the frameworks existed,
                        and I{' '}
                        <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">keep building them</Link>{' '}
                        because it's what I care about most.
                    </p>
                    <p>
                        By day I'm a Software Engineer II at Alarm.com, where I shipped one of the company's
                        first LLM-powered internal tools and led engineering for Stripe-managed subscriptions.
                        I also contribute to open source AI tooling like{' '}
                        <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">Beads</Link>{' '}
                        and{' '}
                        <Link to="/work/kilo-code" className="text-orange-400 hover:text-orange-300 transition-colors">Kilo Code</Link>.
                    </p>
                    <p>
                        I'm looking for a team where shipping fast and talking to users is the culture, not
                        the exception — where engineers own problems end-to-end and velocity is the default.
                    </p>
                </div>

                <nav className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/log"
                        className="group inline-flex items-center gap-2 text-slate-300 hover:text-slate-50 transition-colors"
                    >
                        See my log
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/toolbox"
                        className="group inline-flex items-center gap-2 text-slate-300 hover:text-slate-50 transition-colors"
                    >
                        Browse my toolbox
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Home;
