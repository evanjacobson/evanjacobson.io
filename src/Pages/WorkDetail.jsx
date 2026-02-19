import { useParams, Link, Navigate } from 'react-router-dom';
import projects from '@/data/work';
import { ArrowLeft } from 'lucide-react';
import ProjectContent from '@/Components/ProjectContent';

function WorkDetail() {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </Link>

            <ProjectContent project={project} />
        </div>
    );
}

export default WorkDetail;
