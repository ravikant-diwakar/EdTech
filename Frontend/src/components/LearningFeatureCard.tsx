import React from 'react';

const LearningFeatureCard = () => {
    return (
        <div className="rounded-2xl w-full max-w-lg border border-gray-800/50 p-[1px] bg-black shadow-2xl shadow-blue-900/10">
            {/* Black gap between outer and inner */}
            <div className="bg-black p-[4px] rounded-2xl">
                {/* Inner content box with its own border */}
                <div className="bg-[#0e0e0f] rounded-2xl border border-[#2c2c2c] px-4 sm:px-8 py-6 sm:py-8 text-white space-y-4 sm:space-y-6">

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-semibold">Premium Learning Path</h2>
                        <div className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-[10px] text-blue-300 font-mono">
                            V2.0
                        </div>
                    </div>

                    {/* Current Focus */}
                    <div>
                        <div className="text-xs sm:text-sm text-gray-400 mb-2">Focus Areas</div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300 ring-1 ring-purple-500/50">
                                Full Stack
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-cyan-900/30 text-cyan-300 ring-1 ring-cyan-500/50">
                                System Design
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-orange-900/30 text-orange-300 ring-1 ring-orange-500/50">
                                DevOps
                            </span>
                        </div>
                    </div>

                    {/* Core Modules Grid */}
                    <div>
                        <div className="text-xs sm:text-sm text-gray-400 mb-2">Core Modules</div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#1c1c1c] border border-[#333] p-2 rounded flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">V</div>
                                <span className="text-xs text-gray-300">Video Lessons</span>
                            </div>
                            <div className="bg-[#1c1c1c] border border-[#333] p-2 rounded flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">L</div>
                                <span className="text-xs text-gray-300">Live Labs</span>
                            </div>
                            <div className="bg-[#1c1c1c] border border-[#333] p-2 rounded flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">P</div>
                                <span className="text-xs text-gray-300">Projects</span>
                            </div>
                            <div className="bg-[#1c1c1c] border border-[#333] p-2 rounded flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold">M</div>
                                <span className="text-xs text-gray-300">Mentorship</span>
                            </div>
                        </div>
                    </div>

                    {/* Learning Roadmap */}
                    <div>
                        <div className="text-xs sm:text-sm text-gray-400 mb-2">Curriculum Roadmap</div>
                        <div className="relative space-y-4 pl-2">
                            {/* Connecting Line */}
                            <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-gray-800"></div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-black z-10"></div>
                                <div className="flex-1 bg-white/5 p-2 rounded border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white font-medium">Foundation & Basics</span>
                                        <span className="text-[10px] text-green-400">Mastered</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-black z-10"></div>
                                <div className="flex-1 bg-white/5 p-2 rounded border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white font-medium">Advanced Data Structures</span>
                                        <span className="text-[10px] text-blue-400">In Progress</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-600 ring-4 ring-black z-10"></div>
                                <div className="flex-1 bg-white/5 p-2 rounded border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 font-medium">System Design Architecture</span>
                                        <span className="text-[10px] text-gray-500">Locked</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LearningFeatureCard;
