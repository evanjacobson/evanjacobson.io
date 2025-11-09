import { PageHeader } from '@/Components/Shared/PageHeader';
import { Card, CardHeader, CardContent } from '@/Components/ui/Card';
import { Icon } from '@/Components/ui/Icon';
import { ExperienceItem, ExperienceList } from '@/Components/ui/ExperienceItem';
import { TechStackCategory, TechStackGrid } from '@/Components/ui/TechStackCategory';
import { Briefcase, GraduationCap, Code, Download, Users } from 'lucide-react';

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
                I'm a problem-first, technically-driven engineer and leader obsessed with solving the right problems the right way, quickly. I combine deep technical expertise with clear, persuasive communication to align teams, eliminate blockers, and deliver results under ambitious timelines. Over the past year, I've balanced my full-time role at Alarm.com with serving as Founding Engineer at OneDeal, a Techstars-backed company, where we built an agentic business search engine for the SMB acquisition space. I'm eager to collaborate with smart, risk-tolerant builders who validate before building, and I'm ready to turn innovative ideas into scalable outcomes.
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
                  title="Founding Engineer"
                  company="OneDeal"
                  dateRange="10/2024 – 10/2025"
                  description={[
                    "Designed and implemented agentic scouts that automatically source off-market private businesses matching investor-defined parameters, achieving ~80 sourced per hour vs. 4 per week manually, leveraging TypeScript, Amazon Bedrock, Bright Data, DynamoDB, and ECS.",
                    "Built a production-grade web platform for private equity firms and SMB investors, using React.js, TypeScript, and DynamoDB, enabling scalable search and evaluation of acquisition targets."
                  ]}
                  skills={[
                    "TypeScript",
                    "React.js",
                    "Amazon Bedrock",
                    "Bright Data",
                    "DynamoDB",
                    "ECS",
                    "AI Agents"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Software Engineer I → Software Engineer II"
                  company="Alarm.com"
                  dateRange="08/2021 – Present | Centennial, CO (Promoted April 2024)"
                  description={[
                    "Led the engineering effort for the Stripe Customer-Managed Subscriptions project, overseeing resource planning, specification refinement, design, implementation, and coordination across internal stakeholders and third-party vendors. Tech stack: C#/.NET Core, SQL, Ember.js, TypeScript.",
                    "Ideated and built a self-validating, LLM-powered refactoring tool that modernizes legacy database-layer code and autonomously generates sanity tests to verify and iterate on its own output, increasing maintenance productivity by ~8x (based on tracked ticket throughput). Built with: C#, .NET 8, VSIX, GPT-4o integration.",
                    "Ideated and shipped internal Developer Experience (DevEx) tooling projects including Google Chrome extensions, a two-factor-authentication microservice, and gamification features using C#/.NET, SQL, TypeScript/JavaScript, HTML, and CSS.",
                    "Filed a provisional patent and submitted multiple additional inventions within the domains of IoT and smart-security solutions."
                  ]}
                  skills={[
                    "C#/.NET",
                    ".NET 8",
                    "SQL",
                    "Ember.js",
                    "TypeScript",
                    "LLM Integration",
                    "Developer Experience"
                  ]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Software Engineer Intern"
                  company="Alarm.com"
                  dateRange="06/2020 – 08/2020 | Centennial, CO"
                  description={[
                    "Architected a dynamic and auto-translated email sent to hundreds of thousands of users per year."
                  ]}
                  skills={["C#/.NET", "Email Systems", "Localization"]}
                  accentColor="purple-500"
                />

                <ExperienceItem
                  title="Software Engineer Intern"
                  company="Garmin"
                  dateRange="05/2019 – 08/2019 | Olathe, KS"
                  description={[
                    "Created 80+ tests in C for the GI 275 Attitude Indicator following FAA standards."
                  ]}
                  skills={["C", "Embedded Testing", "FAA Standards"]}
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

          {/* Languages, Frameworks, Tools Section */}
          <Card accentColor="cyan-500" padding="p-10">
            <CardHeader
              icon={<Icon icon={Code} />}
              title="Languages, Frameworks, Tools"
              accentColor="cyan-500"
            />
            <CardContent>
              <TechStackGrid>
                <TechStackCategory
                  title="JavaScript"
                  skills={["JavaScript", "TypeScript", "Node.js", "React.js", "Ember.js"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="C#/.NET"
                  skills={[".NET Framework", ".NET Core", "C# Lambda"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="HTML, CSS"
                  skills={["SASS", "Tailwind", "Shadcn"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Database"
                  skills={["SQL Server", "PostgreSQL", "DynamoDB"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="API"
                  skills={["Integration", "Design", "Scale"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Cloud"
                  skills={["Azure", "AWS", "Google Cloud", "Supabase"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Atlassian Suite"
                  skills={["Jira", "Confluence", "Bitbucket", "Bamboo"]}
                  accentColor="cyan-500"
                />
                <TechStackCategory
                  title="Tools"
                  skills={["Cursor", "Azure OpenAi", "Amazon Bedrock", "BrightData"]}
                  accentColor="cyan-500"
                />
              </TechStackGrid>
            </CardContent>
          </Card>

          {/* Soft Skills Section */}
          <Card accentColor="orange-500" padding="p-10">
            <CardHeader
              icon={<Icon icon={Users} />}
              title="Soft Skills"
              accentColor="orange-500"
            />
            <CardContent>
              <TechStackGrid>
                <TechStackCategory
                  title="People Skills"
                  skills={[
                    "Emotional Intelligence",
                    "Cross-Team Collaboration",
                    "Written and Verbal Communication",
                    "Knowledge Sharing",
                    "Mentorship",
                    "Leadership"
                  ]}
                  accentColor="orange-500"
                />
                <TechStackCategory
                  title="Intrapersonal Skills"
                  skills={[
                    "Organization",
                    "Accountability",
                    "Integrity",
                    "Growth-oriented Mindset"
                  ]}
                  accentColor="orange-500"
                />
                <TechStackCategory
                  title="Product Skills"
                  skills={[
                    "AI Integrations",
                    "Ideation",
                    "Time Estimation",
                    "Customer Discovery",
                    "Customer Validation"
                  ]}
                  accentColor="orange-500"
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