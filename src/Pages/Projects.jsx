import { PageHeader } from '@/Components/Shared/PageHeader';
import { Card, CardHeader, CardContent } from '@/Components/ui/Card';
import { Badge, BadgeGroup } from '@/Components/ui/Badge';
import { Icon } from '@/Components/ui/Icon';
import { Zap, ArrowUpRight, Lightbulb, Shield, Star } from 'lucide-react';

function Projects() {
    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <PageHeader
                    title="Projects"
                    description="Software projects and applications I've built"
                />

                <div className="mt-12 pb-40">
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Trade Intel Project */}
                        <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 overflow-hidden hover:bg-slate-800/70 hover:border-slate-600/50 hover:-translate-y-2 transition-all duration-500">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-t-3xl"></div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-50 group-hover:text-white transition-colors">Trade Intel</h3>
                                        <p className="text-red-400 text-sm font-medium">Live Platform</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    A platform for visualizing market and sector analyses, and surfacing actionable trade recommendations.
                                    Content is automatically gathered, normalized, and broken down into semantic chunks for efficient exploration.
                                </p>

                                {/* Tech Stack */}
                                <BadgeGroup accentColor="red-500" className="mb-8">
                                    <Badge color="slate">React</Badge>
                                    <Badge color="slate">.NET Core</Badge>
                                    <Badge color="slate">AWS Lambda</Badge>
                                    <Badge color="slate">DynamoDB</Badge>
                                </BadgeGroup>

                                {/* CTA */}
                                <a href="https://app.evanjacobson.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 group/btn">
                                    <span>Visit Trade Intel</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;