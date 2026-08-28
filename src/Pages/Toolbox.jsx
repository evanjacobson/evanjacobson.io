import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Cloud,
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
import tools, { categories } from "@/data/toolbox";

function KiloCrab({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13.66,14.7h4.65c2.61,0,4.73,2.12,4.73,4.73v.77c0,3.12-2.54,5.66-5.66,5.66h-2.79c-3.12,0-5.66-2.54-5.66-5.66v-.77c0-2.61,2.12-4.73,4.73-4.73Z"/>
      <circle cx="11.42" cy="11.39" r="1.22"/>
      <path d="M11.42,12.61s-.13,1.7.85,2.29"/>
      <path d="M9.87,23.3c-1.91.34-3.59,2.17-3.59,4.22"/>
      <path d="M8.9,19.95h0c-2.65,0-4.85,1.98-5.7,4.8"/>
      <path d="M12.6,25.49c-1.27,0-2.29,1.09-2.29,2.35v.17"/>
      <path d="M22.06,23.3c1.91.34,3.59,2.17,3.59,4.22"/>
      <path d="M23.03,19.95h0c2.65,0,4.85,1.98,5.7,4.8"/>
      <path d="M19.33,25.49c1.27,0,2.29,1.09,2.29,2.35v.17"/>
      <path d="M30.73,6.82v1.47c0,1.57-1.27,2.84-2.83,2.84h-.39c-1.45,0-2.62-1.17-2.62-2.62h2.62V3.99h.39c1.56,0,2.83,1.27,2.83,2.83Z"/>
      <path d="M27.51,11.13c0,2.83-.13,3.53-2.53,4.8l-2.47,1.36"/>
      <path d="M1.18,6.82v1.47c0,1.57,1.27,2.84,2.83,2.84h.39c1.45,0,2.62-1.17,2.62-2.62h-2.62V3.99s-.39,0-.39,0c-1.56,0-2.83,1.27-2.83,2.83Z"/>
      <path d="M4.41,11.13c0,2.83.13,3.53,2.53,4.8l2.47,1.36"/>
      <circle cx="20.56" cy="11.39" r="1.22"/>
      <path d="M20.56,12.61s.13,1.7-.85,2.29"/>
      <path d="M19.1,17.56l-.85.9c-.54.57-.83,1.33-.83,2.11v2.72"/>
      <path d="M12.87,17.56l.85.9c.54.57.83,1.33.83,2.11v2.72"/>
    </svg>
  );
}

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

const toolIcons = {
  kilo: Code,
  kiloclaw: KiloCrab,
  beads: GitBranch,
  "claude-code": Bot,
  "gas-town": Terminal,
  cursor: MousePointerClick,
  supabase: Database,
  "cloudflare-workers": Cloud,
  "cloudflare-ai": Sparkles,
  aws: Cloud,
  terraform: Layers,
  n8n: Workflow,
  "github-actions": Play,
  stripe: CreditCard,
  playwright: TestTube,
  posthog: BarChart3,
  streamlit: LayoutDashboard,
  graphite: GitBranch,
  docker: Container,
};

function ToolCard({ slug, name, icon: Icon, status, statusLabel, description }) {
  return (
    <Link
      to={`/toolbox/${slug}`}
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
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-8">
        {description}
      </p>
    </Link>
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

function ToolSection({ category }) {
  return (
    <section>
      <SectionHeader
        title={categories[category].title}
        subtitle={categories[category].subtitle}
        color={sectionColors[category]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools
          .filter((tool) => tool.category === category)
          .map((tool) => (
            <ToolCard key={tool.slug} icon={toolIcons[tool.slug]} {...tool} />
          ))}
      </div>
    </section>
  );
}

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

        <ToolSection category="agents" />
        <ToolSection category="cloud" />
        <ToolSection category="automation" />
        <ToolSection category="devtools" />
      </div>
    </div>
  );
}

export default Toolbox;
