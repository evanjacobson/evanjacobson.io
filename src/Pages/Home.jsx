import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, ChevronDown, X } from 'lucide-react';
import ResumeGitGraph from './ResumeGitGraph';
import ProjectContent from '@/Components/ProjectContent';
import projects from '@/data/work';

const HOME_LAYOUT = 'graphDrawer'; // 'graphHome' | 'graphDrawer'
const DETAIL_MODE = 'spine'; // 'none' | 'spine' | 'alongside' | 'replace'

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
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
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

            {/* Bio preview / drawer */}
            <div className="relative">
                <div
                    className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                    style={{ maxHeight: expanded ? '600px' : '3.2em' }}
                >
                    <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                        {BIO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>

                {/* Fade overlay when collapsed */}
                {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                )}

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1"
                >
                    {expanded ? 'Less' : 'More'}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
}

function Home({ autoOpenBooking = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeProject = DETAIL_MODE !== 'none' ? searchParams.get('project') : null;
    const project = activeProject ? projects.find(p => p.slug === activeProject) : null;

    const handleSelectProject = (slug) => {
        setSearchParams({ project: slug });
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

    const isCompressed = DETAIL_MODE === 'spine' && !!activeProject;
    const isAlongside = DETAIL_MODE === 'alongside' && !!activeProject;

    return (
        <div className="py-12">
            {HOME_LAYOUT === 'graphHome' && <GraphHomeHeader />}
            {HOME_LAYOUT === 'graphDrawer' && <GraphDrawerHeader />}

            <div className={`${activeProject && DETAIL_MODE === 'alongside' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4`}>
                <div className="flex gap-0 transition-all duration-500 ease-in-out">
                    {/* Graph column */}
                    <div className={`transition-all duration-500 ease-in-out ${
                        isCompressed ? 'w-[200px] shrink-0' :
                        isAlongside ? 'shrink-0' :
                        'flex-1 max-w-4xl mx-auto'
                    }`}>
                        <ResumeGitGraph
                            activeProject={activeProject}
                            onSelectProject={DETAIL_MODE !== 'none' ? handleSelectProject : null}
                            detailMode={DETAIL_MODE}
                            detailContent={DETAIL_MODE === 'replace' && project ? (
                                <div>
                                    <button
                                        onClick={handleCloseProject}
                                        className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Close
                                    </button>
                                    <ProjectContent project={project} />
                                </div>
                            ) : null}
                        />
                    </div>

                    {/* Detail panel (spine mode) */}
                    {DETAIL_MODE === 'spine' && (
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${activeProject ? 'flex-1 opacity-100 ml-6' : 'w-0 opacity-0'}`}
                        >
                            {project && (
                                <div className="sticky top-8">
                                    <button
                                        onClick={handleCloseProject}
                                        className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Close
                                    </button>
                                    <ProjectContent project={project} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Detail panel (alongside mode) */}
                    {DETAIL_MODE === 'alongside' && activeProject && project && (
                        <div className="flex-1 opacity-100 ml-6 min-w-[400px] max-w-xl transition-all duration-500 ease-in-out overflow-y-auto">
                            <div className="sticky top-8">
                                <button
                                    onClick={handleCloseProject}
                                    className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Close
                                </button>
                                <ProjectContent project={project} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
