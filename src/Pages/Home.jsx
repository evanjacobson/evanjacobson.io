import { Card, CardContent } from '@/Components/ui/Card';
import { Briefcase, Mail, MapPin, ChevronDown } from 'lucide-react';

function Home() {
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 min-h-[100dvh]">
            {/* HERO: Clean, focused, impactful */}
            <section className="min-h-[calc(100dvh-73px)] md:min-h-[100dvh] flex items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                
                <div className="max-w-2xl relative z-10">
                    <img
                        src="/images/Evan%20Jacobson.jpg"
                        alt="Evan Jacobson"
                        className="w-32 h-32 rounded-3xl border-3 border-emerald-500 object-cover mx-auto mb-8 shadow-2xl shadow-emerald-500/30"
                    />
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-slate-50 to-emerald-400 bg-clip-text text-transparent leading-tight">
                        Evan Jacobson
                    </h1>

                    <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8 font-light">
                        I ship AI products quickly.
                    </p>
                    
                    <button
                        onClick={() => scrollToSection('footer')}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl"
                    >
                        <Mail className="w-5 h-5" />
                        Let's Connect
                    </button>
                </div>
                
                {/* Scroll indicator */}
                <button
                    onClick={() => scrollToSection('about')}
                    className="absolute bottom-8 -translate-x-1/2 text-slate-400 animate-bounce hover:text-emerald-400 transition-colors"
                >
                    <ChevronDown className="w-10 h-10" />
                </button>
            </section>

            {/* ABOUT: Current status and credentials */}
            <section id="about" className="py-20 md:pb-20 px-4 bg-slate-800/20">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-50 mb-6 md:mb-8 lg:mb-12">
                        Currently...
                    </h2>

                    <div className="flex justify-center gap-3 sm:gap-4 md:gap-8 flex-wrap mb-6 md:mb-8 lg:mb-12">
                        <Card accentColor="emerald-500" className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] hover:-translate-y-2 transition-transform duration-300">
                            <CardContent className="p-2 py-3 sm:p-4 md:p-8 text-center">
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl mx-auto mb-1 sm:mb-4 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-emerald-400 mb-0 sm:mb-2">
                                    Software Engineer
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">Alarm.com</p>
                            </CardContent>
                        </Card>

                        <Card accentColor="emerald-500" className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] hover:-translate-y-2 transition-transform duration-300">
                            <CardContent className="p-2 py-3 sm:p-4 md:p-8 text-center">
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl mx-auto mb-1 sm:mb-4 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-emerald-400 mb-0 sm:mb-2">
                                    Founding Engineer
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">OneDeal</p>
                            </CardContent>
                        </Card>

                        <Card accentColor="emerald-500" className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] hover:-translate-y-2 transition-transform duration-300">
                            <CardContent className="p-2 py-3 sm:p-4 md:p-8 text-center">
                                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl mx-auto mb-2 sm:mb-4 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-emerald-400 mb-1 sm:mb-2">
                                    Based in
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400">Denver, Colorado</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* OPPORTUNITIES */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-50 mb-8 sm:mb-12 text-center">
                        Where I'll Thrive
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    Early-Stage Startups
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">
                                    I'm eager to connect with potential cofounders to build something from the ground up, or to join an existing team.
                                </p>
                            </CardContent>
                        </Card>

                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    AI-Powered Solutions
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">
                                    I enjoy building AI-powered tools, automations, pipelines, and more, to solve complex problems.
                                </p>
                            </CardContent>
                        </Card>

                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    Technical Leadership
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">
                                    I excel at leading technical initiatives, mentoring teams, and driving architectural decisions.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;