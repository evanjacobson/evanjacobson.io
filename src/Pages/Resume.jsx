import { PageHeader } from '@/Components/Shared/PageHeader';
import { Card, CardHeader, CardContent } from '@/Components/ui/Card';
import { Icon } from '@/Components/ui/Icon';
import { ExperienceItem, ExperienceList } from '@/Components/ui/ExperienceItem';
import { TechStackCategory, TechStackGrid } from '@/Components/ui/TechStackCategory';
import { Briefcase, GraduationCap, Code, Download } from 'lucide-react';

function Resume() {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">
      <div className="container mx-auto px-4 py-8 w-full max-w-full overflow-hidden">
        <PageHeader
          title="My Resume"
          description="Professional experience, education, and technical skills"
        />

        {/* Download Link */}
        <div className="mt-8 text-center">
          <a
            href="/files/Evan Jacobson Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download PDF Resume
          </a>
        </div>

        {/* Main Content */}
        <div className="space-y-8 lg:space-y-12 pb-20">
          {/* Personal Statement */}
          <Card accentColor="emerald-500" padding="p-10" className="mt-12">
            <CardContent>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-6">
                Personal Statement
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                I'm a product-minded engineer obsessed with making AI do real engineering work. For the past 15 months, I've built an agentic web search engine from scratch at OneDeal (before MCP or AI web search existed), co-founded OrAI where I own everything from code to compliance to investor strategy, contributed to open source AI tooling, and shipped multi-agent systems across every project. I believe humans shouldn't be writing code anymore — that this will be mainstream by end of year, the norm by end of next — and I'm already helping to build the tools that make it happen. I'm looking for a team that treats engineers as owners, not ticket-takers, and where shipping fast and talking to users is the culture, not the exception.
              </p>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card accentColor="purple-500" padding="p-10">
            <CardHeader
              icon={<Icon icon={Briefcase} />}
              title="Experience"
              accentColor="purple-500"
            />
            <CardContent>
              <ExperienceList>
                <ExperienceItem
                  title="Technical Cofounder"
                  company="OrAI"
                  dateRange="08/2025 – Present"
                  description={[
                    "Co-founded an early childhood education SaaS company. Own the full product and business: architecture, implementation, legal (ToS, privacy policy, pilot contracts), compliance alignment, mentor network development, and angel investor identification. Built with TypeScript, React, Tailwind CSS, shadcn/ui, Supabase, and OpenAI API.",
                    "Expanding platform from AI-powered assistant into document management, policy collision resolution across state childcare regulations, and automated compliance scheduling.",
                    "Sole technical decision-maker: handle product roadmap, user research, analytics (PostHog), competitive analysis, and go-to-market strategy alongside all engineering work."
                  ]}
                  skills={[
                    "TypeScript",
                    "React",
                    "Tailwind CSS",
                    "shadcn/ui",
                    "Supabase",
                    "OpenAI API",
                    "PostHog"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Open Source Contributor"
                  company="Beads (Agent Memory Framework)"
                  dateRange="01/2026 – Present"
                  description={[
                    "Core contributor to Beads, a structured memory and context management framework for AI coding agents that applies engineering task decomposition (epics, stories, tasks, dependencies) to agent memory — solving the cross-session persistence gap in agentic development.",
                    "Integrated Dolt (Git-for-data SQL database) CLI tooling and shipped critical bug fixes to unblock the Gastown agent framework after its storage layer migration."
                  ]}
                  skills={[
                    "Open Source",
                    "Dolt",
                    "Agent Memory",
                    "AI Tooling"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Personal Project"
                  company="Trade Intel"
                  dateRange="08/2025 – Present"
                  description={[
                    "Built an email extraction pipeline that converts long-form financial newsletters into structured data (securities, sentiment, recommendations). After hitting context window limits with a single-agent approach, organically discovered multi-agent decomposition as the solution — splitting work across specialized agents (split, verify, classify, extract, union) to eliminate needle-in-a-haystack failures. Built with C# Lambda, React, AWS, DynamoDB, and n8n orchestration."
                  ]}
                  skills={[
                    "C# Lambda",
                    "React",
                    "AWS",
                    "DynamoDB",
                    "n8n",
                    "Multi-Agent Pipelines"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Founding Engineer"
                  company="OneDeal (Techstars '23)"
                  dateRange="10/2024 – 10/2025"
                  description={[
                    "Built agentic scouts from scratch that autonomously source off-market businesses matching investor criteria — ~80 sourced/hour vs. 4/week manually. Designed and shipped the full agentic pipeline months before MCP or AI web search existed. Tech: TypeScript, SERP API, OpenAI API, Bright Data, Playwright, DynamoDB, Docker, ECS.",
                    "Shipped a production web platform for PE firms and SMB investors using React.js, TypeScript, and DynamoDB."
                  ]}
                  skills={[
                    "TypeScript",
                    "OpenAI API",
                    "Bright Data",
                    "Playwright",
                    "DynamoDB",
                    "Docker",
                    "ECS"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Software Engineer I → II"
                  company="Alarm.com"
                  dateRange="08/2021 – Present | Centennial, CO"
                  description={[
                    "Built an LLM-powered, self-validating refactoring tool (Sept 2023) that modernizes legacy database code and autonomously generates sanity tests to verify its own output — increasing maintenance productivity ~8x. One of the earliest AI adopters at the company. Built with C#, .NET 8, VSIX, GPT-4o.",
                    "Built Handoff Bot, a GitHub App (later ported to a Claude skill) that reviews PR changes and generates structured documentation for Quality Engineers: high-level summary, testing guidance, and risk assessment — streamlining the formal ticket handoff process.",
                    "Led engineering for Stripe Customer-Managed Subscriptions: resource planning, spec refinement, design, implementation, and cross-team coordination. C#/.NET Core, SQL, Ember.js, TypeScript.",
                    "Shipped internal DevEx tooling (Chrome extensions, 2FA microservice, gamification). Filed a provisional patent in IoT/smart-security."
                  ]}
                  skills={[
                    "C#/.NET",
                    ".NET 8",
                    "SQL",
                    "Ember.js",
                    "TypeScript",
                    "GPT-4o",
                    "GitHub Apps"
                  ]}
                  accentColor="purple-500"
                  showBorder={false}
                />
              </ExperienceList>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card accentColor="blue-500" padding="p-10">
            <CardHeader
              icon={<Icon icon={GraduationCap} />}
              title="Education"
              accentColor="blue-500"
            />
            <CardContent>
              <ExperienceItem
                title="B.S in Computer Science, Minor in Mathematics"
                company="University of Miami"
                dateRange="05/2021 | Coral Gables, FL | GPA 3.96"
                description={[]}
                skills={["Computer Science", "Mathematics"]}
                accentColor="blue-500"
                showBorder={false}
              />
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card accentColor="cyan-500" padding="p-10">
            <CardHeader
              icon={<Icon icon={Code} />}
              title="Skills"
              accentColor="cyan-500"
            />
            <CardContent>
              <TechStackGrid>
                <TechStackCategory
                  title="Languages & Frameworks"
                  skills={["TypeScript", "Node.js", "React", "Tailwind CSS", "shadcn/ui", "C#/.NET", "Python"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="AI & Agents"
                  skills={["OpenAI API", "Amazon Bedrock", "Cursor", "Multi-Agent Pipelines", "Prompt Engineering", "n8n"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Cloud & Infra"
                  skills={["AWS (ECS, Lambda, DynamoDB)", "Supabase", "Cloudflare Workers", "Azure", "Terraform", "Docker"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Data"
                  skills={["PostgreSQL", "DynamoDB", "SQL Server", "Dolt"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Product"
                  skills={["Customer Discovery", "User Research", "Analytics (PostHog)", "Go-to-Market", "Compliance"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Leadership"
                  skills={["Cross-Team Coordination", "Mentorship", "Technical Writing", "Open Source Contribution"]}
                  accentColor="cyan-500"
                />
              </TechStackGrid>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Resume;
