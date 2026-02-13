import { Link } from 'react-router-dom';
import projects from '@/data/work';
import { ArrowRight } from 'lucide-react';

function ProjectCard({ project }) {
    const IconComponent = project.icon;

    return (
        <Link
            to={`/work/${project.slug}`}
            className="group block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 ${project.colors.accent} rounded-lg flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-slate-50 group-hover:text-white transition-colors">
                            {project.title}
                        </h3>
                        {project.badge && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${project.colors.badge}`}>
                                {project.badge}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {project.role} &middot; {project.dateRange}
                    </p>
                </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {project.cardDescription}
            </p>

            <span className={`inline-flex items-center gap-1.5 text-sm ${project.colors.text} group-hover:gap-2.5 transition-all`}>
                Read more
                <ArrowRight className="w-3.5 h-3.5" />
            </span>
        </Link>
    );
}

function Work() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Work</h1>
            <p className="text-slate-400 mb-10">Things I've built, shipped, and contributed to.</p>

            <div className="space-y-4">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Work;
