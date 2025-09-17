import { PageHeader } from '@/Components/Shared/PageHeader';
import { ProjectComponent } from '@/Components/Shared/ProjectComponent';
import { Zap, Brain, Github, LucideGamepad2 } from 'lucide-react';

function Projects() {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <PageHeader
                    title="Projects"
                    description="Software projects and applications I've built"
                />

                <div className="mt-12 pb-20">
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ProjectComponent
                            title="Trade Intel"
                            status="Investment Research Synthesis Platform"
                            description="A platform for visualizing market and sector analyses, and surfacing actionable trade recommendations. Content is automatically gathered, normalized, and broken down into semantic chunks for efficient exploration."
                            techStack={["React", ".NET Core", "AWS Lambda", "DynamoDB"]}
                            accentColor="red"
                            icon={Zap}
                            date="September 2025"
                            buttons={[
                                { 
                                    text: "Launch Trade-Intel", 
                                    href: "https://app.evanjacobson.io/"
                                },
                                { 
                                    text: "GitHub (Coming Soon)", 
                                    href: "#",
                                    icon: Github,
                                    colorOverride: "slate"
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="Custom Chatbot with Ultra-Low-Cost RAG"
                            status="Built to power an Early Childhood Education Startup"
                            description="A (nearly) plug-and-play chatbot with ultra-low-cost RAG document retrieval and search, built to power an early childhood education startup. Features include sturdy guardrails, a drop-in UI, and a secure API."
                            techStack={["Azure OpenAI", "Azure Cognitive Search", "Azure Functions", "JavaScript", "Squarespace"]}
                            accentColor="blue"
                            icon={Brain}
                            date="August 2025"
                            buttons={[
                                { 
                                    text: "Visit OrAi", 
                                    href: "https://www.oraieducator.com/"
                                },
                                { 
                                    text: "GitHub", 
                                    href: "https://github.com/evanjacobson/ChatbotWithRAG",
                                    icon: Github,
                                    colorOverride: "slate"
                                }
                            ]}
                        />
                        <ProjectComponent
                            title="Mounts"
                            status="a Minecraft Server Plugin"
                            description="A Minecraft Server Plugin that allows players to buy and own horses, and prevent them from being stolen or harmed by other players."
                            techStack={["Java", "Spigot/Paper"]}
                            accentColor="green"
                            icon={LucideGamepad2}
                            date="September 2024"
                            buttons={[
                                { 
                                    text: "GitHub", 
                                    href: "https://github.com/evanjacobson/Mounts-Minecraft-Server-Plugin",
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