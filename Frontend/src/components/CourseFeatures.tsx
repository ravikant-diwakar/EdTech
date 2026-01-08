import React from 'react';
import { BookOpen, Users, Trophy, Target, Video, Shield } from 'lucide-react';

const CourseFeatures = () => {
    const features = [
        {
            icon: <Video className="w-8 h-8 text-blue-500" />,
            title: "Interactive Video Lessons",
            description: "High-quality video content with expert instructors guiding you through every concept step-by-step."
        },
        {
            icon: <Users className="w-8 h-8 text-purple-500" />,
            title: "Community Driven",
            description: "Join thousands of learners in our active discord community. Get help, share knowledge, and grow together."
        },
        {
            icon: <Trophy className="w-8 h-8 text-yellow-500" />,
            title: "Recognized Certificates",
            description: "Earn valuable certificates upon completion to showcase your skills to potential employers."
        },
        {
            icon: <Target className="w-8 h-8 text-green-500" />,
            title: "Hands-on Projects",
            description: "Build real-world projects that you can add to your portfolio and demonstrate your practical skills."
        },
        {
            icon: <Shield className="w-8 h-8 text-red-500" />,
            title: "Lifetime Access",
            description: "Pay once and get lifetime access to all course materials, including future updates and new resources."
        },
        {
            icon: <BookOpen className="w-8 h-8 text-cyan-500" />,
            title: "Comprehensive Notes",
            description: "Get detailed downloadable notes, cheat sheets, and resources to supplement your learning journey."
        }
    ];

    return (
        <section className="py-12 sm:py-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Platform</span>?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We provide a comprehensive learning experience designed to help you master new skills and advance your career.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-default"
                        >
                            <div className="bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-700 group-hover:border-gray-600">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseFeatures;
