import { PageHeader } from '@/Components/Shared/PageHeader';
import CompactEmailSignup from '@/Components/Shared/CompactEmailSignup';
import { Card, CardHeader, CardContent } from '@/Components/ui/Card';
import { Icon } from '@/Components/ui/Icon';
import { Badge, BadgeGroup } from '@/Components/ui/Badge';
import { FeatureItem, FeatureList } from '@/Components/ui/FeatureItem';
import { ExperienceItem, ExperienceList } from '@/Components/ui/ExperienceItem';
import { CertificationItem, CertificationList } from '@/Components/ui/CertificationItem';
import { TechStackCategory, TechStackGrid } from '@/Components/ui/TechStackCategory';
import { Briefcase, GraduationCap, Award, Code, Download } from 'lucide-react';

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
                <div className="space-y-8 lg:space-y-12 pb-40">

                    {/* Personal Statement */}
                    <Card accentColor="emerald-500" padding="p-10" className="mt-12">
                        <CardContent>
                            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-6">Personal Statement</h2>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                I am a technically driven leader focused on leveraging AI to solve complex problems quickly. I combine deep technical expertise with clear communication skills to align teams, eliminate blockers, and deliver results under ambitious timelines. Over the past year, I have balanced my full-time role with serving as Founding Engineer at OneDeal, where I helped build out an agentic business search engine. I’m eager to partner with smart, risk-tolerant builders who value speed and innovation, and I am ready to contribute by turning bold ideas into scalable outcomes.
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
                                    dateRange="October 2024 - Present (Part-Time)"
                                    description={[
                                        "Designed and implemented agentic 'scouts' which are able to source private, not-for-sale businesses fitting specific search parameters -- using TypeScript, Amazon Bedrock, Bright Data, and DynamoDB, and orchestrated with ECS",
                                        "Built a website used by private equity firms and other investors to research and acquire small/medium sized domestic businesses using React.js, TypeScript, and DynamoDB"
                                    ]}
                                    skills={["Team Leadership", "Innovation", "AI Agent Development & Orchestration", "DevOps", "React.js", "TypeScript", "DynamoDB", "ECS", "Amazon Bedrock", "Bright Data"]}
                                    accentColor="purple-500"
                                />
                                <ExperienceItem
                                    title="Software Engineer II"
                                    company="Alarm.com"
                                    dateRange="April 2024 - Present"
                                    description={[
                                        "Leading the Stripe Customer-Managed Subscriptions project including resource planning, design, implementation, and stakeholder communication",
                                        "Built a self-validating ChatGPT-powered tool that autonomously refactors legacy code and generates tests, boosting productivity by ~8x",
                                        "Filed provisional patents in core business areas"
                                    ]}
                                    skills={["Team Leadership", "AI Integration", "Patent Filing", "Full-Stack Development"]}
                                    accentColor="purple-500"
                                />
                                <ExperienceItem
                                    title="Software Engineer"
                                    company="Alarm.com"
                                    dateRange="August 2021 - April 2024"
                                    description={[
                                        "Designed, developed, and tested full-stack customer-facing systems in an agile environment using C#/ASP.NET, JavaScript, and SQL",
                                        "Shipped multiple side projects including internal tools, Chrome extensions, a Login-with-Two-Factor microservice, and gamification features"
                                    ]}
                                    skills={["C# / ASP.NET", "JavaScript", "SQL", "Microservices"]}
                                    accentColor="purple-500"
                                />
                                <ExperienceItem
                                    title="Software Engineer Intern"
                                    company="Garmin"
                                    dateRange="May 2019 - August 2019"
                                    description={[
                                        "Created 80+ tests in C for the GI 275 Attitude Indicator following FAA standards",
                                        "Ensuring aviation software met critical safety and reliability requirements"
                                    ]}
                                    skills={["C Programming", "Aviation Software", "FAA Standards", "Testing"]}
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
                                title="Bachelor of Science in Computer Science"
                                company="University of Miami"
                                dateRange="May 2021"
                                description={[
                                    "Minor in Mathematics, GPA 3.96",
                                    "Strong foundation in algorithms, data structures, and mathematical problem-solving that continues to inform my approach to complex engineering challenges"
                                ]}
                                skills={["Computer Science", "Mathematics", "Academic Excellence"]}
                                accentColor="blue-500"
                                showBorder={false}
                            />
                        </CardContent>
                    </Card>

                    {/* Certifications Section */}
                    <Card accentColor="green-500" padding="p-10">
                        <CardHeader
                            icon={<Icon icon={Award} />}
                            title="Certifications"
                            accentColor="green-500"
                        />
                        <CardContent>
                            <CertificationList>
                                <CertificationItem
                                    title="AI Fluency: Framework & Foundations"
                                    issuer="Anthropic"
                                    dateEarned="September 2025"
                                    expirationDate=""
                                    credentialId="kjfvgw4qx8ax"
                                    verificationUrl="http://verify.skilljar.com/c/kjfvgw4qx8ax"
                                    skills={["AI", "Prompt Engineering", "Prompt Validation", "Decision-Discernment Loop", "Delegation", "Diligence"]}
                                    accentColor="green-500"
                                />
                                <CertificationItem
                                    title="Model Context Protocol: Advanced Topics"
                                    issuer="Anthropic"
                                    dateEarned="September 2025"
                                    expirationDate=""
                                    credentialId="z5mrnekmmig6"
                                    verificationUrl="http://verify.skilljar.com/c/z5mrnekmmig6"
                                    skills={["AI", "Model Context Protocol", "Sampling", "Security"]}
                                    accentColor="green-500"
                                />
                                <CertificationItem
                                    title="Microsoft Azure Fundamentals"
                                    issuer="Microsoft"
                                    dateEarned="October 2024"
                                    credentialId="5B3042118C054743"
                                    verificationUrl="https://learn.microsoft.com/api/credentials/share/en-us/EvanJacobson/5B3042118C054743"
                                    skills={["Azure", "Cloud Services", "Azure Portal", "Resource Management"]}
                                    accentColor="green-500"
                                    showBorder={false}
                                />
                            </CertificationList>
                        </CardContent>
                    </Card>

                    {/* Tech Stack Section */}
                    <Card accentColor="cyan-500" padding="p-10">
                        <CardHeader
                            icon={<Icon icon={Code} />}
                            title="Tech Stack"
                            accentColor="cyan-500"
                        />
                        <CardContent>
                            <TechStackGrid>
                                <TechStackCategory
                                    title="Frontend"
                                    skills={["JavaScript", "TypeScript", "React", "HTML/CSS", "Tailwind"]}
                                    accentColor="cyan-500"
                                />
                                <TechStackCategory
                                    title="Backend"
                                    skills={["C# / ASP.NET", "Node.js", "Express", "API Design"]}
                                    accentColor="cyan-500"
                                />
                                <TechStackCategory
                                    title="Database & Cloud"
                                    skills={["SQL", "NoSQL", "Azure", "AWS", "Google Cloud"]}
                                    accentColor="cyan-500"
                                />
                                <TechStackCategory
                                    title="Tools & Skills"
                                    skills={["AI Integration", "Jira", "Leadership", "Mentorship"]}
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