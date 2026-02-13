import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

const experience = [
    {
        title: 'Technical Cofounder',
        company: 'OrAI',
        dateRange: '08/2025 – Present',
        slug: 'orai',
        color: 'text-blue-400',
        dot: 'bg-blue-500',
        description: 'Co-founded a SaaS platform for early childhood educators. Own the full product and business — architecture, implementation, compliance, investor strategy. Built on Cloudflare Workers, Supabase, OpenAI API, and Stripe.',
    },
    {
        title: 'Open Source Contributor',
        company: 'Beads & Kilo Code',
        dateRange: '01/2026 – Present',
        slug: 'beads',
        color: 'text-green-400',
        dot: 'bg-green-500',
        description: 'Contributor to Beads (agent memory framework) and Kilo Code (open source AI coding agent). Shipped Dolt CLI integration and bug fixes for cross-session agent persistence.',
    },
    {
        title: 'Personal Project',
        company: 'Trade Intel',
        dateRange: '08/2025 – Present',
        slug: 'trade-intel',
        color: 'text-red-400',
        dot: 'bg-red-500',
        description: 'Multi-agent extraction pipeline converting financial newsletters into structured data. Built with .NET 8, AWS Lambda, PostgreSQL, Terraform, and n8n.',
    },
    {
        title: 'Founding Engineer',
        company: 'OneDeal',
        dateRange: '10/2024 – 10/2025',
        slug: 'onedeal',
        color: 'text-purple-400',
        dot: 'bg-purple-500',
        badge: "Techstars '23",
        description: 'Built agentic scouts that autonomously source off-market businesses — ~80 sourced/hour vs. 4/week manually. Months before MCP or AI web search existed.',
    },
    {
        title: 'Software Engineer I → II',
        company: 'Alarm.com',
        dateRange: '08/2021 – Present',
        color: 'text-emerald-400',
        dot: 'bg-emerald-500',
        description: 'Built an LLM-powered refactoring tool (8x productivity), Handoff Bot for PR documentation, led Stripe subscription engineering, and shipped internal DevEx tooling. C#/.NET, SQL, TypeScript.',
    },
];

const skills = [
    { category: 'Languages & Frameworks', items: ['TypeScript', 'Node.js', 'React', 'Tailwind CSS', 'C#/.NET', 'Python'] },
    { category: 'AI & Agents', items: ['OpenAI API', 'Amazon Bedrock', 'Multi-Agent Pipelines', 'Prompt Engineering', 'n8n'] },
    { category: 'Cloud & Infra', items: ['AWS (ECS, Lambda, DynamoDB)', 'Supabase', 'Cloudflare Workers', 'Azure', 'Terraform', 'Docker'] },
    { category: 'Data', items: ['PostgreSQL', 'DynamoDB', 'SQL Server', 'Dolt'] },
    { category: 'Product', items: ['Customer Discovery', 'User Research', 'Analytics (PostHog)', 'Go-to-Market', 'Compliance'] },
    { category: 'Leadership', items: ['Cross-Team Coordination', 'Mentorship', 'Technical Writing', 'Open Source'] },
];

function Resume() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Resume</h1>
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

            {/* Experience Timeline */}
            <section className="mb-16">
                <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Experience</h2>
                <div className="space-y-8">
                    {experience.map((role, i) => (
                        <div key={i} className="relative pl-6 border-l border-slate-800">
                            <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ${role.dot} -translate-x-[5.5px]`} />
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                                <div>
                                    <h3 className={`font-semibold ${role.color}`}>{role.title}</h3>
                                    <p className="text-slate-300 text-sm">
                                        {role.company}
                                        {role.badge && (
                                            <span className="ml-2 text-xs text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded-full">
                                                {role.badge}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-500 shrink-0">{role.dateRange}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{role.description}</p>
                            {role.slug && (
                                <Link
                                    to={`/work/${role.slug}`}
                                    className={`inline-block text-xs mt-2 ${role.color} hover:underline`}
                                >
                                    Read case study →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-16">
                <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Education</h2>
                <div className="pl-6 border-l border-slate-800 relative">
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 -translate-x-[5.5px]" />
                    <h3 className="font-semibold text-blue-400">B.S. in Computer Science, Minor in Mathematics</h3>
                    <p className="text-sm text-slate-300">University of Miami</p>
                    <p className="text-xs text-slate-500">May 2021 &middot; GPA 3.96</p>
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {skills.map((group) => (
                        <div key={group.category}>
                            <h3 className="text-sm font-medium text-slate-300 mb-2">{group.category}</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {group.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Resume;
