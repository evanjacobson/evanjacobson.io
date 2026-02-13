import { PageHeader } from '@/Components/Shared/PageHeader';
import { ProjectComponent } from '@/Components/Shared/ProjectComponent';
import { Zap, Brain, Search, Github, Code } from 'lucide-react';

function Projects() {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <PageHeader
                    title="Projects"
                    description="AI-powered products, multi-agent systems, and open source tools I've built and co-founded"
                />

                <div className="mt-12 pb-20">
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ProjectComponent
                            title="OrAI"
                            status="AI Tools for Early Childhood Educators & Administrators"
                            description="Co-founded a SaaS platform that gives early childhood educators and administrators their time back. OrAI automates the tedious deliverables that drive quality outcomes — lesson planning, parent communications, document tracking & review, and compliant staff scheduling — so educators can spend less time on paperwork and more time with kids."
                            techStack={["TypeScript", "React", "Cloudflare Workers", "Cloudflare AI Search", "Cloudflare AI Gateway", "Supabase", "OpenAI API", "Vercel AI SDK", "assistant-ui", "Stripe", "Playwright"]}
                            accentColor="blue"
                            icon={Brain}
                            date="August 2025 – Present"
                            buttons={[
                                {
                                    text: "Visit OrAI",
                                    href: "https://www.oraieducator.com/"
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="Trade Intel"
                            status="Multi-Agent Financial Intelligence Pipeline"
                            description="An email extraction pipeline that converts long-form financial newsletters into structured data — securities, sentiment, and recommendations. After hitting context window limits with a single-agent approach, organically discovered multi-agent decomposition as the solution, splitting work across specialized agents (split, verify, classify, extract, union) to eliminate needle-in-a-haystack failures."
                            techStack={["C#/.NET 8", "React", "AWS Lambda", "PostgreSQL", "Terraform", "CloudFront", "n8n", "GitHub Actions"]}
                            accentColor="red"
                            icon={Zap}
                            date="August 2025 – Present"
                            buttons={[
                                {
                                    text: "Launch Trade Intel",
                                    href: "https://app.evanjacobson.io/"
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="OneDeal"
                            status="Agentic Business Sourcing Platform"
                            subtitle="Techstars '23"
                            description="Built agentic scouts from scratch that autonomously source off-market businesses matching investor criteria — ~80 sourced/hour vs. 4/week manually. Designed and shipped the full agentic pipeline months before MCP or AI web search existed. Shipped a production web platform for PE firms and SMB investors."
                            techStack={["TypeScript", "OpenAI API", "Bright Data", "Playwright", "DynamoDB", "Docker", "ECS"]}
                            accentColor="purple"
                            icon={Search}
                            date="October 2024 – October 2025"
                            buttons={[
                                {
                                    text: "Visit OneDeal",
                                    href: "https://onedealapp.com"
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="Beads"
                            status="Open Source Agent Memory Framework"
                            description="Contributor to Beads, a structured memory and context management framework for AI coding agents. Applies engineering task decomposition (epics, stories, tasks, dependencies) to agent memory — solving the cross-session persistence gap in agentic development. Integrated Dolt (Git-for-data SQL database) CLI tooling and shipped bug fixes to unblock the Gastown agent framework."
                            techStack={["TypeScript", "Dolt", "Git"]}
                            accentColor="green"
                            icon={Github}
                            date="January 2026 – Present"
                            buttons={[
                                {
                                    text: "GitHub",
                                    href: "https://github.com/cyanheads/beads",
                                    icon: Github
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="Kilo Code"
                            status="Open Source AI Coding Agent"
                            description="Contributor to Kilo Code, the most popular open-source AI coding agent. A VS Code extension and CLI with 500+ models, zero markup on inference, and cross-device sync. Used by 1.5M+ developers and processing 25T+ tokens."
                            techStack={["TypeScript", "VS Code Extension", "CLI"]}
                            accentColor="orange"
                            icon={Code}
                            date="2026 – Present"
                            buttons={[
                                {
                                    text: "Website",
                                    href: "https://kilo.ai/"
                                },
                                {
                                    text: "GitHub",
                                    href: "https://github.com/Kilo-Org/kilocode",
                                    icon: Github,
                                    colorOverride: "slate"
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
