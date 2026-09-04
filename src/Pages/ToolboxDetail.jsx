import { useParams, Link, Navigate } from 'react-router-dom';
import tools, { categories } from '@/data/toolbox';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const statusStyles = {
    'daily-driver': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    contributor: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    'semi-retired': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    'self-hosted': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    essential: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
};

function ToolboxDetail() {
    const { slug } = useParams();
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <Link
                to="/toolbox"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </Link>

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {categories[tool.category].title}
            </p>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-50">{tool.name}</h1>
                <span
                    className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyles[tool.status]}`}
                >
                    {tool.statusLabel}
                </span>
            </div>

            <p className="mt-6 text-base text-slate-300 leading-relaxed">
                {tool.description}
            </p>

            {tool.body && (
                <div className="mt-8 space-y-4 text-slate-300 leading-relaxed text-sm">
                    {tool.body.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
                <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                >
                    Visit {tool.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}

export default ToolboxDetail;
