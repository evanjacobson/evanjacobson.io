import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import ResumeGitGraph from './ResumeGitGraph';
import ProjectContent from '@/Components/ProjectContent';
import projects from '@/data/work';

const HOME_LAYOUT = 'graphHome'; // 'graphHome' | 'graphDrawer'
const DETAIL_MODE = 'drawer'; // 'replace' | 'drawer'

const THESIS_PARAGRAPHS = [
    <>Traditional collaboration is dead for engineers. AI coding agents are now powerful enough that multiple hands on a project has shifted from a necessity to a burden. But the common thread across all of my work has been confronting fundamental issues with agent reliability. How do you give agents what they need to make the right choices on open-ended problems? There's an entire layer that continues to cause friction in the pursuit of real speed.</>,
    <>Current agentic systems fail to replicate the critical, foundational, and often asynchronous processes that teach engineers how to build things the right way. So the question is: how do you enforce quality controls at the planning and implementation levels? I don't have all the answers yet, but I can see the gaps. The agentic versions of those voices exist, but they aren't mature — they're mostly synchronously-applied band-aids focused on reviewing what's already been built. Critically, these review agents do not yet <em>teach</em> the coding agents to grow in the way human engineers do when exposed to the same processes. And they aren't optimizing for cost.</>,
    <>Some of this work belongs to specialized agents, but much of it can be enforced entirely through structure, feedback loops, and ensuring every agent is the chief prosecutor against its own claims. I've been tinkering with this infrastructure as a result of the burdens I face in everything else I build, and it's become what I'm by far most passionate about. I'm ready to dedicate myself fully to this problem.</>,
];

const ABOUT_PARAGRAPHS = [
    <>Very excited to start my journey as a Software Engineer at <Link to="/?project=kilo-code" className="text-yellow-400 hover:text-yellow-300 transition-colors">Kilo Code</Link>, where we're building the most popular open-source agentic development platform. We are also the best place to use hosted OpenClaw (KiloClaw)!</>,
    <>Where time permits, I'm also a technical cofounder of <Link to="/?project=orai" className="text-blue-400 hover:text-blue-300 transition-colors">OrAI</Link>, where I own everything from investor strategy to architecture to compliance, with agent teams handling the design, implementation, review, and audit of code and architecture. It's a sharp contrast to my time as founding engineer at <Link to="/?project=onedeal" className="text-purple-400 hover:text-purple-300 transition-colors">OneDeal</Link> (Techstars '23), where I built agentic web search from scratch — months before MCP or AI web search existed — but the development itself was still largely manual.</>
];

function GraphHomeHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Evan Jacobson</h1>
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
                    {ABOUT_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
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

            <div className="max-w-4xl mx-auto px-4 mb-12">
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                    {THESIS_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                </div>
            </div>

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
                mobileDrawerContent={activeProject ? (
                    isAbout ? (
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            {ABOUT_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    ) : project ? (
                        <ProjectContent project={project} compact />
                    ) : null
                ) : null}
            />
        </div>
    );
}

export default Home;
