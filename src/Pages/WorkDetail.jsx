import { useParams, Link, Navigate } from 'react-router-dom';
import projects from '@/data/work';
import { ArrowLeft, ExternalLink } from 'lucide-react';

function WorkDetail() {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return <Navigate to="/log" replace />;
    }

    const IconComponent = project.icon;

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <Link
                to="/log"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to log
            </Link>

            <div className="flex items-start gap-4 mb-2">
                <div className={`w-12 h-12 ${project.colors.accent} rounded-xl flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-50">{project.title}</h1>
                    <p className="text-slate-400 mt-1">
                        {project.role} &middot; {project.dateRange}
                    </p>
                    {project.badge && (
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-2 ${project.colors.badge}`}>
                            {project.badge}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-10 space-y-4 text-slate-300 leading-relaxed">
                {project.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>

            {project.techStack.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className={`text-xs px-2.5 py-1 rounded-full ${project.colors.badge}`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {project.links.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm ${project.colors.text} hover:underline`}
                        >
                            {link.label}
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WorkDetail;
