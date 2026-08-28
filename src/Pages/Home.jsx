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
    <>Some of this work belongs to specialized agents, but much of it can be enforced entirely through structure, feedback loops, and ensuring every agent is the chief prosecutor against its own claims. I've been tinkering with this infrastructure as a result of the burdens I face in everything else I build, and it's become what I'm by far most passionate about.</>,
];

const INTRO_PARAGRAPHS = [
    <>I'm a Denver-based AI engineer focused on making agentic systems reliable in production. I build LLM applications, multi-agent workflows, AI coding-agent infrastructure, and the full-stack products around them for remote and distributed teams.</>,
    <>I'm a software engineer at <a href="https://kilo.ai/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">Kilo</a>, where I build and support KiloClaw, and technical cofounder of <a href="https://www.oraieducator.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">OrAI</a>. Previously, I built OneDeal's autonomous sourcing pipeline, increasing throughput from roughly four businesses per week to 80 per hour.</>,
];

const FEATURED_PROJECTS = projects.filter((project) =>
    ['onedeal', 'trade-intel', 'beads', 'orai', 'kilo'].includes(project.slug)
);

const ABOUT_PARAGRAPHS = [
    <>Based in Denver, CO with my girlfriend Hayley and my orange tabby, Sampson.</>,
    <>My focus is agentic engineering — specifically the reliability and quality-control layer that sits between a capable model and a trustworthy system. When I'm not building, I'm usually skiing, camping, or traveling.</>,
    <>Links in the footer if you want to connect.</>,
];

function GraphHomeHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Evan Jacobson</h1>
                    <p className="text-sm text-emerald-400">Agentic AI engineer in Denver</p>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    Resume (PDF)
                </a>
            </div>
        </div>
    );
}

function GraphDrawerHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50">Evan Jacobson</h1>
                    <p className="text-sm text-emerald-400 mt-1">Agentic AI engineer in Denver</p>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    Resume (PDF)
                </a>
            </div>
        </div>
    );
}

function Home({ autoOpenBooking = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedProject = searchParams.get('project');
    const [showDefaultAbout, setShowDefaultAbout] = useState(DETAIL_MODE === 'drawer' && !requestedProject);
    const activeProject = requestedProject || (showDefaultAbout ? 'about' : null);
    const project = activeProject ? projects.find(p => p.slug === activeProject) : null;

    const handleSelectProject = (slug) => {
        setShowDefaultAbout(false);
        if (slug === activeProject) {
            // Toggle off if clicking the same row
            setSearchParams({});
        } else {
            setSearchParams({ project: slug });
        }
    };

    const handleCloseProject = () => {
        setShowDefaultAbout(false);
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
                <section aria-labelledby="intro-heading" className="mb-10">
                    <h2 id="intro-heading" className="text-lg font-semibold text-slate-100 mb-4">
                        Reliable AI systems, beyond the demo
                    </h2>
                    <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                        {INTRO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </section>

                <section aria-labelledby="featured-work-heading" className="mb-10">
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                        <h2 id="featured-work-heading" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Selected AI engineering work
                        </h2>
                        <Link to="/work" className="text-xs text-emerald-400 hover:text-emerald-300">
                            View all case studies
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {FEATURED_PROJECTS.map((featuredProject) => (
                            <Link
                                key={featuredProject.slug}
                                to={`/work/${featuredProject.slug}`}
                                className="text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-colors"
                            >
                                {featuredProject.title}: {featuredProject.subtitle}
                            </Link>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="perspective-heading">
                    <h2 id="perspective-heading" className="text-lg font-semibold text-slate-100 mb-4">
                        What I'm exploring: reliable AI agents
                    </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                    {THESIS_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                </section>
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
