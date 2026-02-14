import { Download } from 'lucide-react';
import ResumeGitGraph from './ResumeGitGraph';

function Resume() {
    return (
        <div className="px-6 py-12">
            {/* Header */}
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Log</h1>
                    <p className="text-slate-400 text-sm">Professional experience and skills</p>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </a>
            </div>

            <ResumeGitGraph />
        </div>
    );
}

export default Resume;
