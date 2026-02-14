import { useState } from 'react';
import { Download } from 'lucide-react';
import ResumeTree from './ResumeTree';
import ResumeGitGraph from './ResumeGitGraph';

const views = [
    { id: 'tree', label: 'Tree' },
    { id: 'git', label: 'Git Graph' },
];

function Resume() {
    const [view, setView] = useState('tree');

    return (
        <div className="px-6 py-12">
            {/* Header */}
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Resume</h1>
                    <p className="text-slate-400 text-sm">Professional experience and skills</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* View toggle */}
                    <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
                        {views.map(v => (
                            <button
                                key={v.id}
                                onClick={() => setView(v.id)}
                                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                                    view === v.id
                                        ? 'bg-slate-700 text-slate-200'
                                        : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {v.label}
                            </button>
                        ))}
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
            </div>

            {/* Timeline view */}
            {view === 'tree' && <ResumeTree />}
            {view === 'git' && <ResumeGitGraph />}
        </div>
    );
}

export default Resume;
