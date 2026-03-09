import { ExternalLink } from 'lucide-react';

export default function ProjectContent({ project, compact = false }) {
    const IconComponent = project.icon;

    return (
        <>
            {!compact && (
                <div className="flex items-start gap-4 mb-2">
                    <div className={`w-12 h-12 ${project.colors.accent} rounded-xl flex items-center justify-center shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${project.colors.iconText || 'text-slate-950'}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-50">{project.title}</h2>
                        <p className="text-slate-400 mt-1 text-sm">
                            {project.role} &middot; {project.dateRange}
                        </p>
                        {project.badge && (
                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-2 ${project.colors.badge}`}>
                                {project.badge}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {compact && project.badge && (
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${project.colors.badge}`}>
                    {project.badge}
                </span>
            )}

            <div className={`${compact ? '' : 'mt-8 '}space-y-4 text-slate-300 leading-relaxed text-sm`}>
                {project.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>

            {project.techStack.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h3>
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
                <div className="mt-8 flex flex-wrap gap-4">
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
        </>
    );
}
