import { PageHeader } from '@/Components/Shared/PageHeader';
import {
    Bot, Cloud, Zap, ExternalLink, Terminal, GitBranch,
    BarChart3, TestTube, CreditCard, Container, Database,
    Workflow, Play, Code, MousePointerClick, Layers,
    LayoutDashboard, Sparkles, Mail
} from 'lucide-react';

const statusStyles = {
    'daily-driver': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'contributor': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'semi-retired': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'self-hosted': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    'essential': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

const sectionColors = {
    agents: { gradient: 'from-emerald-500 to-emerald-600', icon: 'bg-emerald-500', text: 'text-emerald-400' },
    cloud: { gradient: 'from-blue-500 to-blue-600', icon: 'bg-blue-500', text: 'text-blue-400' },
    automation: { gradient: 'from-orange-500 to-orange-600', icon: 'bg-orange-500', text: 'text-orange-400' },
    devtools: { gradient: 'from-cyan-500 to-cyan-600', icon: 'bg-cyan-500', text: 'text-cyan-400' },
};

function ToolCard({ name, icon: Icon, status, statusLabel, description, url, color }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:bg-slate-800/70 hover:border-slate-600/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color.gradient} rounded-t-2xl`}></div>

            <div className="flex items-start gap-4 mb-3">
                <div className={`w-10 h-10 ${color.icon} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-50 group-hover:text-white transition-colors">{name}</h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyles[status]}`}>
                            {statusLabel}
                        </span>
                    </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0 mt-1" />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed flex-1">{description}</p>
        </a>
    );
}

function SectionHeader({ icon: Icon, title, subtitle, color }) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 ${color.icon} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${color.text}`}>{title}</h2>
            </div>
            <p className="text-slate-400 text-sm ml-11">{subtitle}</p>
        </div>
    );
}

function GuestPassCard() {
    return (
        <div className="relative bg-gradient-to-br from-emerald-500/10 via-slate-800/50 to-purple-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-emerald-500 rounded-t-2xl"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-50 mb-1">Want to try Claude Code?</h3>
                    <p className="text-sm text-slate-300">
                        As a Max subscriber, I get guest passes that give you a free week of Claude Pro — including Claude Code,
                        all models, and higher usage limits. If I have one left, it's yours. No catch.
                    </p>
                </div>
                <a
                    href="mailto:contact@evanjacobson.io?subject=Claude Code Guest Pass"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                    <Mail className="w-4 h-4" />
                    Ask Me
                </a>
            </div>
        </div>
    );
}

const agents = [
    {
        name: 'Claude Code',
        icon: Bot,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://claude.com/claude-code',
        description: "The agent that writes most of my code. I describe what I want, review the output, and ship. This website? Claude Code wrote about 95% of it. I'm starting to think I'm the copilot.",
    },
    {
        name: 'GasTown',
        icon: Terminal,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://github.com/steveyegge/gastown',
        description: "Steve Yegge's multi-agent swarm manager. When one Claude Code agent isn't enough, Gas Town runs 20–30 of them in parallel with persistent memory. Like managing a very fast, very junior dev team — except they don't need coffee.",
    },
    {
        name: 'Beads',
        icon: GitBranch,
        status: 'contributor',
        statusLabel: 'Contributor',
        url: 'https://github.com/cyanheads/beads',
        description: "Git-backed issue tracking designed for AI agents. Solves the \"wait, what was I doing?\" problem that plagues every coding agent after context resets. I'm a core contributor — so yes, I'm building the tools that build my tools. Turtles all the way down.",
    },
    {
        name: 'Kilo Code',
        icon: Code,
        status: 'contributor',
        statusLabel: 'Contributor',
        url: 'https://kilo.ai/',
        description: "Open-source AI coding agent for VS Code. 500+ models, zero markup on inference costs, and a CLI that syncs across devices. The Swiss Army knife when I need a different model or a different vibe. I also contribute to the project.",
    },
    {
        name: 'Cursor',
        icon: MousePointerClick,
        status: 'semi-retired',
        statusLabel: 'Semi-Retired',
        url: 'https://cursor.com/',
        description: "My first AI editor love. We had a good run. These days it handles quick edits and small fixes while Claude Code runs the show. Think of it as the reliable backup quarterback — always ready, rarely starting.",
    },
];

const cloud = [
    {
        name: 'Cloudflare Workers',
        icon: Cloud,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://workers.cloudflare.com/',
        description: "Edge-first serverless compute. OrAI runs entirely on Workers — no cold starts, no origin servers, just code at the edge in 300+ cities. Paired with Wrangler CLI for deploys that take seconds, not minutes.",
    },
    {
        name: 'Cloudflare AI',
        icon: Sparkles,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://ai.cloudflare.com/',
        description: "AI Search (AutoRAG) for document retrieval and AI Gateway for routing, caching, and observability across AI providers. The backbone of OrAI's knowledge system — semantic search with tenant isolation baked in.",
    },
    {
        name: 'Supabase',
        icon: Database,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://supabase.com/',
        description: "Postgres, auth, storage, and realtime in one platform. The backend for OrAI. Row-level security means I sleep at night knowing tenant data stays isolated. The DX is absurdly good.",
    },
    {
        name: 'AWS',
        icon: Cloud,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://aws.amazon.com/',
        description: "Lambda, API Gateway, S3, CloudFront, EC2 — the full buffet. Trade Intel's entire backend runs on AWS. Sometimes you need the enterprise cloud, and when you do, nothing else comes close.",
    },
    {
        name: 'Terraform',
        icon: Layers,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://www.terraform.io/',
        description: "Infrastructure as code that keeps me from clicking buttons in the AWS console at 2am. Three environments (dev, stage, prod) from a single codebase. \"But it worked in staging\" hits different when your infra is version-controlled.",
    },
];

const automation = [
    {
        name: 'n8n',
        icon: Workflow,
        status: 'self-hosted',
        statusLabel: 'Self-Hosted',
        url: 'https://n8n.io/',
        description: "Self-hosted workflow automation running on EC2. Ingests financial newsletters via Gmail, routes them through multi-agent extraction pipelines, and delivers structured data to Trade Intel. Like Zapier, but I own the server and the data.",
    },
    {
        name: 'GitHub Actions',
        icon: Play,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://github.com/features/actions',
        description: "CI/CD that runs tests, lints code, deploys infrastructure, and pushes to production — all triggered by a git push. The glue that holds everything together. OIDC auth with AWS means no stored credentials.",
    },
    {
        name: 'Stripe',
        icon: CreditCard,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://stripe.com/',
        description: "Payment processing for OrAI subscriptions. Free, Basic, and Premium tiers with usage-based quotas, referral rewards, and credit purchases. The Stripe CLI makes local webhook testing almost pleasant.",
    },
];

const devtools = [
    {
        name: 'Playwright',
        icon: TestTube,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://playwright.dev/',
        description: "End-to-end browser testing for OrAI. Three test personas (teacher, director, admin), mobile viewport testing, and auth state persistence. Catches the bugs I'd never find manually — and I never find them manually.",
    },
    {
        name: 'PostHog',
        icon: BarChart3,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://posthog.com/',
        description: "Product analytics and LLM tracing. Tracks user behavior, monitors AI response quality, and shows which features actually get used. The @posthog/ai middleware traces every LLM call so I know exactly what the AI is doing (and costing).",
    },
    {
        name: 'Streamlit',
        icon: LayoutDashboard,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://streamlit.io/',
        description: "Python dashboards for when I need answers fast. Conversation analysis, keyword extraction, teacher engagement metrics — spin up a dashboard in 20 minutes, get insights that would take days to build in React.",
    },
    {
        name: 'Graphite',
        icon: GitBranch,
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://graphite.dev/',
        description: "Git stacking done right. Stack PRs on top of each other, review them independently, and merge in order. Once you try stacked diffs, the \"one massive PR\" workflow feels like driving with the parking brake on.",
    },
    {
        name: 'Docker',
        icon: Container,
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://www.docker.com/',
        description: "Containers for local dev and production deploys. PostgreSQL for Trade Intel, n8n for workflow automation, all running in isolated containers. Because \"it works on my machine\" stopped being acceptable a decade ago.",
    },
];

function Toolbox() {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <PageHeader
                    title="Toolbox"
                    description="The tools, platforms, and questionable number of AI agents I use to ship software"
                />

                <div className="mt-8 mb-12 max-w-3xl mx-auto">
                    <p className="text-slate-400 text-center text-sm sm:text-base leading-relaxed">
                        I believe the best tools are the ones you don't fight with. Everything here has earned its spot
                        by making me faster, not by being trendy. Some of these tools I use daily. Some I contributed to.
                        One I'm semi-breaking up with. Here's the honest rundown.
                    </p>
                </div>

                <div className="space-y-16 pb-20">
                    {/* Guest Pass CTA */}
                    <GuestPassCard />

                    {/* AI Agents */}
                    <section>
                        <SectionHeader
                            icon={Bot}
                            title="AI Agents & Copilots"
                            subtitle="The team that writes most of the code (I just review it and take the credit)"
                            color={sectionColors.agents}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {agents.map((tool) => (
                                <ToolCard key={tool.name} {...tool} color={sectionColors.agents} />
                            ))}
                        </div>
                    </section>

                    {/* Cloud & Infrastructure */}
                    <section>
                        <SectionHeader
                            icon={Cloud}
                            title="Cloud & Infrastructure"
                            subtitle="Where the code actually runs (spoiler: mostly at the edge)"
                            color={sectionColors.cloud}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cloud.map((tool) => (
                                <ToolCard key={tool.name} {...tool} color={sectionColors.cloud} />
                            ))}
                        </div>
                    </section>

                    {/* Automation */}
                    <section>
                        <SectionHeader
                            icon={Zap}
                            title="Automation & Workflows"
                            subtitle="The robots behind the robots"
                            color={sectionColors.automation}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {automation.map((tool) => (
                                <ToolCard key={tool.name} {...tool} color={sectionColors.automation} />
                            ))}
                        </div>
                    </section>

                    {/* Dev Tools */}
                    <section>
                        <SectionHeader
                            icon={Zap}
                            title="Dev Experience"
                            subtitle="The supporting cast that keeps everything from falling apart"
                            color={sectionColors.devtools}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {devtools.map((tool) => (
                                <ToolCard key={tool.name} {...tool} color={sectionColors.devtools} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Toolbox;
