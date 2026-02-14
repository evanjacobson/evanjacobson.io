import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import ResumeGitGraph from './ResumeGitGraph';
import ProjectContent from '@/Components/ProjectContent';
import projects from '@/data/work';

const HOME_LAYOUT = 'graphHome'; // 'graphHome' | 'graphDrawer'
const DETAIL_MODE = 'drawer'; // 'replace' | 'drawer'

const BIO_PARAGRAPHS = [
    <>Right now I'm co-founding <Link to="/work/orai" className="text-blue-400 hover:text-blue-300 transition-colors">OrAI</Link>, where we're giving early childhood educators their time back — automating lesson plans, parent communications, document tracking, and compliant scheduling so they can spend less time on paperwork and more time with kids. I own everything from architecture to compliance to investor strategy, because I believe engineers should be owners, not ticket-takers.</>,
    <>Before that I was the founding engineer at <Link to="/work/onedeal" className="text-purple-400 hover:text-purple-300 transition-colors">OneDeal</Link> (Techstars '23), where I built agentic web search from scratch — months before MCP or AI web search existed. I'm obsessed with agentic AI systems: multi-agent pipelines, autonomous search, AI tooling. I've been building these before the frameworks existed, and I <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">keep building them</Link> because it's what I care about most.</>,
    <>By day I'm a Software Engineer II at Alarm.com, where I shipped one of the company's first LLM-powered internal tools and led engineering for Stripe-managed subscriptions. I also contribute to open source AI tooling like <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">Beads</Link> and <Link to="/work/kilo-code" className="text-orange-400 hover:text-orange-300 transition-colors">Kilo Code</Link>.</>,
    <>I'm looking for a team where shipping fast and talking to users is the culture, not the exception — where engineers own problems end-to-end and velocity is the default.</>,
];

function GraphHomeHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Evan Jacobson</h1>
                    <p className="text-slate-400 text-sm">
                        I build tools that automate the tedious so people can focus on what humans do best: think.
                    </p>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </a>
            </div>
        </div>
    );
}

function GraphDrawerHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-50">Evan Jacobson</h1>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </a>
            </div>
        </div>
    );
}

function Home({ autoOpenBooking = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeProject = searchParams.get('project');
    const project = activeProject ? projects.find(p => p.slug === activeProject) : null;

    // In drawer mode, auto-expand the bio ("about") on first load when no project is selected
    const [autoExpanded, setAutoExpanded] = useState(false);
    useEffect(() => {
        if (DETAIL_MODE === 'drawer' && !activeProject && !autoExpanded) {
            setAutoExpanded(true);
            setSearchParams({ project: 'about' });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectProject = (slug) => {
        if (slug === activeProject) {
            // Toggle off if clicking the same row
            setSearchParams({});
        } else {
            setSearchParams({ project: slug });
        }
    };

    const handleCloseProject = () => {
        setSearchParams({});
    };

    useEffect(() => {
        if (autoOpenBooking) {
            setTimeout(() => {
                const calButton = document.querySelector('[data-cal-link="evanjacobson"]');
                if (calButton) calButton.click();
            }, 1000);
        }
    }, [autoOpenBooking]);

    const isReplace = DETAIL_MODE === 'replace';
    const isDrawer = DETAIL_MODE === 'drawer';
    const isAbout = activeProject === 'about';

    // Shared detail panel content (used by both replace and drawer modes)
    const detailInner = activeProject ? (
        <>
            <button
                onClick={handleCloseProject}
                className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
                <X className="w-4 h-4" />
                Close
            </button>
            {isAbout ? (
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                    {BIO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                </div>
            ) : project ? (
                <ProjectContent project={project} />
            ) : null}
        </>
    ) : null;

    return (
        <div className="py-12">
            {HOME_LAYOUT === 'graphHome' && <GraphHomeHeader />}
            {HOME_LAYOUT === 'graphDrawer' && <GraphDrawerHeader />}

            <ResumeGitGraph
                activeProject={activeProject}
                onSelectProject={handleSelectProject}
                detailContent={isReplace && detailInner ? (
                    <div>{detailInner}</div>
                ) : null}
                drawerContent={isDrawer && detailInner ? (
                    <div className="border border-slate-800 rounded-lg p-6 mt-2">
                        {detailInner}
                    </div>
                ) : null}
            />
        </div>
    );
}

export default Home;
