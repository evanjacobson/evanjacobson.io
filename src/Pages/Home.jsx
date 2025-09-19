import { Card, CardContent } from '@/Components/ui/Card';
import { Briefcase, Mail, MapPin, ChevronDown, Rocket, Brain, Users } from 'lucide-react';

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
            <section id="about" className="py-8 sm:py-12 md:py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-slate-50 mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-center">
                        Currently...
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-3 sm:p-6 md:p-8 flex flex-col flex-1 items-center text-center relative z-10">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-emerald-500 rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    Software Engineer
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Alarm.com</p>
                            </CardContent>
                        </Card>
                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-3 sm:p-6 md:p-8 flex flex-col flex-1 items-center text-center relative z-10">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-emerald-500 rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    Founding Engineer
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">OneDeal</p>
                            </CardContent>
                        </Card>
                        <Card accentColor="emerald-500" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-3 sm:p-6 md:p-8 flex flex-col flex-1 items-center text-center relative z-10">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-emerald-500 rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                                    Based in
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Denver, Colorado</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex justify-center sm:hidden">
                        <button
                            onClick={() => scrollToSection('opportunities')}
                            className="mt-8 text-slate-400 animate-bounce hover:text-emerald-400 transition-colors"
                        >   
                            <ChevronDown className="w-10 h-10" />
                        </button>
                    </div>
                </div>
            </section>

            {/* OPPORTUNITIES */}
            <section id="opportunities" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-50 mb-8 sm:mb-12 text-center">
                        Where I'll Thrive
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <Card accentColor="purple-600" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 items-center text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4">
                                    Early-Stage Startups
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">
                                    I'm eager to connect with potential cofounders to build something from the ground up, or to join an existing team.
                                </p>
                            </CardContent>
                        </Card>

                        <Card accentColor="purple-600" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 items-center text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4">
                                    AI-Powered Solutions
                                </h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed flex-1">
                                    I enjoy building AI-powered tools, automations, pipelines, and more, to solve complex problems.
                                </p>
                            </CardContent>
                        </Card>

                        <Card accentColor="purple-600" className="hover:-translate-y-2 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                            <CardContent className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 items-center text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4">
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