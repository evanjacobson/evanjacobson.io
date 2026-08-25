import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import projects from '@/data/work';

function Projects() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <header className="max-w-2xl mb-12">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400 mb-3">
                    AI engineering portfolio
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
                    Production AI systems and engineering work
                </h1>
                <p className="mt-4 text-slate-400 leading-relaxed">
                    Case studies across agentic AI, multi-agent workflows, LLM applications, coding-agent infrastructure, and the full-stack products around them.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => {
                    const Icon = project.icon;
                    return (
                        <article key={project.slug} className="border border-slate-800 rounded-xl p-5 flex flex-col">
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 ${project.colors.accent} rounded-lg flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 ${project.colors.iconText || 'text-slate-950'}`} />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-100">{project.title}</h2>
                                    <p className="text-xs text-slate-500 mt-1">{project.role} · {project.dateRange}</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed mt-4 flex-1">
                                {project.cardDescription}
                            </p>

                            {project.techStack.length > 0 && (
                                <p className="text-xs text-slate-600 mt-4 line-clamp-2">
                                    {project.techStack.join(' · ')}
                                </p>
                            )}

                            <Link
                                to={`/work/${project.slug}`}
                                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 mt-5"
                            >
                                Read case study
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Projects;
