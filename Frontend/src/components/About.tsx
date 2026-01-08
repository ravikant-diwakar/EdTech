import React from 'react';
import { Bot, BookOpen, Video, Library, GraduationCap, Users, Lightbulb, Code, Heart, Globe, ArrowRight, CheckCircle } from "lucide-react";

const About: React.FC = () => {
    return (
        <main className="flex-grow bg-black text-white relative">

            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">About Us</h1>
                    <div className="w-20 h-1 bg-blue-500 mt-4 rounded-full"></div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-12 sm:py-20 bg-black relative overflow-hidden">
                {/* Dotted Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Empowering careers through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI & Structural Learning</span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
                                At SkillN, we bridge the gap between traditional learning and modern tech requirements.
                                We combine AI-powered interview prep with a robust library of books and expert-led courses
                                to provide a complete ecosystem for your career growth.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => window.location.href = '/courses'}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium w-full sm:w-auto"
                                >
                                    Explore Courses
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => window.location.href = '/books'}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-black border border-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors font-medium w-full sm:w-auto"
                                >
                                    Browse Books
                                </button>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-gray-800 p-8 relative">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl pointer-events-none"></div>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="text-center">
                                    <div className="bg-neutral-950 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                                        <Video size={28} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">50+</h3>
                                    <p className="text-gray-400 text-sm">Premium Courses</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-neutral-950 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                                        <BookOpen size={28} className="text-purple-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">100+</h3>
                                    <p className="text-gray-400 text-sm">Technical Books</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-neutral-950 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                        <Bot size={28} className="text-green-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">AI</h3>
                                    <p className="text-gray-400 text-sm">Resume Analyzer</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-neutral-950 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                                        <Users size={28} className="text-orange-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">10k+</h3>
                                    <p className="text-gray-400 text-sm">Active Learners</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New: Book & Course Features Section */}
            <section className="py-16 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Complete Learning Ecosystem</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We don't just provide tools; we provide content. From in-depth books to interactive video courses, we have everything you need to master your craft.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Course Card */}
                        <div className="group relative bg-[#0e0e0f] rounded-2xl border border-gray-800 p-8 overflow-hidden hover:border-blue-500/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-blue-400">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Premium Video Courses</h3>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Expert-led video tutorials",
                                    "Hands-on coding projects",
                                    "Structured learning paths",
                                    "Certification upon completion"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <CheckCircle size={18} className="text-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <a href="/courses" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Explore Courses <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        {/* Book Card */}
                        <div className="group relative bg-[#0e0e0f] rounded-2xl border border-gray-800 p-8 overflow-hidden hover:border-purple-500/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20 text-purple-400">
                                    <Library size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Extensive Book Library</h3>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Curated collection of tech books",
                                    "PDF & ePub formats available",
                                    "Deep dives into complex topics",
                                    "Resources for every skill level"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <CheckCircle size={18} className="text-purple-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <a href="/books" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Browse Library <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-black relative overflow-hidden">
                {/* Dotted Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 hover:border-blue-500/50 transition-all duration-300 group">
                            <div className="bg-neutral-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                <Lightbulb size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Continuously pushing the boundaries of what's possible with AI and technology to create better solutions.
                            </p>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 hover:border-green-500/50 transition-all duration-300 group">
                            <div className="bg-neutral-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                                <Heart size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Empathy</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Understanding the challenges job seekers face and creating solutions that truly address their needs.
                            </p>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 group">
                            <div className="bg-neutral-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                <Code size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Delivering high-quality, reliable tools that professionals can depend on for their career growth.
                            </p>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-6 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="bg-neutral-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                                <Globe size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Accessibility</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Making career development tools accessible to everyone, regardless of background or experience level.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-8 text-center hover:border-blue-500/50 transition-all duration-300 group max-w-sm w-full">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-105 transition-transform border-4 border-gray-800 group-hover:border-blue-500/30">
                                <img
                                    src="/ravikant.jpg"
                                    alt="Ravikant Diwakar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Ravikant Diwakar</h3>
                            <p className="text-gray-400 mb-4 font-medium">Founder & CEO</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default About;