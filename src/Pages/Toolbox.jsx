import {
  Bot,
  Cloud,
  Zap,
  ExternalLink,
  Terminal,
  GitBranch,
  BarChart3,
  TestTube,
  CreditCard,
  Container,
  Database,
  Workflow,
  Play,
  Code,
  MousePointerClick,
  Layers,
  LayoutDashboard,
  Sparkles,
  Mail,
} from "lucide-react";

const statusStyles = {
  "daily-driver":
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  contributor:
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  "semi-retired":
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "self-hosted":
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  essential:
    "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
};

const sectionColors = {
  agents: { text: "text-emerald-400" },
  cloud: { text: "text-blue-400" },
  automation: { text: "text-orange-400" },
  devtools: { text: "text-cyan-400" },
};

function ToolCard({ name, icon: Icon, status, statusLabel, description, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors"
    >
      <div className="flex items-start gap-3 mb-2">
        <Icon className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-slate-200">
              {name}
            </h3>
            <span
              className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyles[status]}`}
            >
              {statusLabel}
            </span>
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-8">
        {description}
      </p>
    </a>
  );
}

function SectionHeader({ title, subtitle, color }) {
  return (
    <div className="mb-6">
      <h2 className={`text-lg font-semibold ${color.text}`}>{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}

function GuestPassCard() {
  return (
    <div className="border border-slate-800 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-200 mb-1">
            Want to try Claude Code?
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            As a Max subscriber, I get guest passes that give you a free week of
            Claude Pro -- including Claude Code, all models, and higher usage
            limits. If I have one left, it's yours.
          </p>
        </div>
        <a
          href="mailto:contact@evanjacobson.io?subject=Claude Code Guest Pass"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
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
    name: "Claude Code",
    icon: Bot,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://claude.com/claude-code",
    description:
      "The agent that writes most of my code. I describe what I want, review the output, and ship. This website? Claude Code wrote about 95% of it.",
  },
  {
    name: "GasTown",
    icon: Terminal,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://github.com/steveyegge/gastown",
    description:
      "Steve Yegge's multi-agent swarm manager. When one Claude Code agent isn't enough, Gas Town runs 20-30 of them in parallel with persistent memory.",
  },
  {
    name: "Beads",
    icon: GitBranch,
    status: "contributor",
    statusLabel: "Contributor",
    url: "https://github.com/cyanheads/beads",
    description:
      "Git-backed issue tracking designed for AI agents. Solves the context reset problem. I'm a core contributor.",
  },
  {
    name: "Kilo Code",
    icon: Code,
    status: "contributor",
    statusLabel: "Contributor",
    url: "https://kilo.ai/",
    description:
      "Open-source AI coding agent for VS Code. 500+ models, zero markup on inference costs. The Swiss Army knife when I need a different model.",
  },
  {
    name: "Cursor",
    icon: MousePointerClick,
    status: "semi-retired",
    statusLabel: "Semi-Retired",
    url: "https://cursor.com/",
    description:
      "My first AI editor love. These days it handles quick edits while Claude Code runs the show.",
  },
];

const cloud = [
  {
    name: "Cloudflare Workers",
    icon: Cloud,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://workers.cloudflare.com/",
    description:
      "Edge-first serverless compute. OrAI runs entirely on Workers -- no cold starts, no origin servers, just code at the edge in 300+ cities.",
  },
  {
    name: "Cloudflare AI",
    icon: Sparkles,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://ai.cloudflare.com/",
    description:
      "AI Search (AutoRAG) for document retrieval and AI Gateway for routing, caching, and observability across AI providers.",
  },
  {
    name: "Supabase",
    icon: Database,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://supabase.com/",
    description:
      "Postgres, auth, storage, and realtime in one platform. The backend for OrAI. Row-level security means tenant data stays isolated.",
  },
  {
    name: "AWS",
    icon: Cloud,
    status: "essential",
    statusLabel: "Essential",
    url: "https://aws.amazon.com/",
    description:
      "Lambda, API Gateway, S3, CloudFront, EC2. Trade Intel's entire backend runs on AWS.",
  },
  {
    name: "Terraform",
    icon: Layers,
    status: "essential",
    statusLabel: "Essential",
    url: "https://www.terraform.io/",
    description:
      "Infrastructure as code. Three environments (dev, stage, prod) from a single codebase.",
  },
];

const automation = [
  {
    name: "n8n",
    icon: Workflow,
    status: "self-hosted",
    statusLabel: "Self-Hosted",
    url: "https://n8n.io/",
    description:
      "Self-hosted workflow automation running on EC2. Ingests financial newsletters via Gmail and routes them through multi-agent extraction pipelines.",
  },
  {
    name: "GitHub Actions",
    icon: Play,
    status: "essential",
    statusLabel: "Essential",
    url: "https://github.com/features/actions",
    description:
      "CI/CD that runs tests, lints code, deploys infrastructure, and pushes to production. OIDC auth with AWS means no stored credentials.",
  },
  {
    name: "Stripe",
    icon: CreditCard,
    status: "essential",
    statusLabel: "Essential",
    url: "https://stripe.com/",
    description:
      "Payment processing for OrAI subscriptions. Free, Basic, and Premium tiers with usage-based quotas and referral rewards.",
  },
];

const devtools = [
  {
    name: "Playwright",
    icon: TestTube,
    status: "essential",
    statusLabel: "Essential",
    url: "https://playwright.dev/",
    description:
      "End-to-end browser testing for OrAI. Three test personas, mobile viewport testing, and auth state persistence.",
  },
  {
    name: "PostHog",
    icon: BarChart3,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://posthog.com/",
    description:
      "Product analytics and LLM tracing. The @posthog/ai middleware traces every LLM call.",
  },
  {
    name: "Streamlit",
    icon: LayoutDashboard,
    status: "essential",
    statusLabel: "Essential",
    url: "https://streamlit.io/",
    description:
      "Python dashboards for when I need answers fast. Spin up a dashboard in 20 minutes, get insights that would take days in React.",
  },
  {
    name: "Graphite",
    icon: GitBranch,
    status: "daily-driver",
    statusLabel: "Daily Driver",
    url: "https://graphite.dev/",
    description:
      "Git stacking done right. Stack PRs, review them independently, and merge in order.",
  },
  {
    name: "Docker",
    icon: Container,
    status: "essential",
    statusLabel: "Essential",
    url: "https://www.docker.com/",
    description:
      "Containers for local dev and production deploys. PostgreSQL, n8n, all running in isolated containers.",
  },
];

function Toolbox() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
        Toolbox
      </h1>
      <p className="mt-3 text-slate-500 leading-relaxed">
        The tools, platforms, and questionable number of AI agents I use to ship
        software. Everything here has earned its spot by making me faster, not by
        being trendy.
      </p>

      <div className="mt-12 space-y-14">
        <GuestPassCard />

        <section>
          <SectionHeader
            title="AI Agents & Copilots"
            subtitle="The team that writes most of the code"
            color={sectionColors.agents}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Cloud & Infrastructure"
            subtitle="Where the code actually runs"
            color={sectionColors.cloud}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cloud.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Automation & Workflows"
            subtitle="The robots behind the robots"
            color={sectionColors.automation}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automation.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Dev Experience"
            subtitle="The supporting cast"
            color={sectionColors.devtools}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devtools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Toolbox;
