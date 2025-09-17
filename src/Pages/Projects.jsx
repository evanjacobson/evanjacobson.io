import { PageHeader } from '@/Components/Shared/PageHeader';
import { ProjectComponent } from '@/Components/Shared/ProjectComponent';
import { Zap, Lightbulb, Shield, Star } from 'lucide-react';

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
                            status="Live Platform"
                            description="A platform for visualizing market and sector analyses, and surfacing actionable trade recommendations. Content is automatically gathered, normalized, and broken down into semantic chunks for efficient exploration."
                            techStack={["React", ".NET Core", "AWS Lambda", "DynamoDB"]}
                            accentColor="red"
                            icon={Zap}
                            href="https://app.evanjacobson.io/"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;