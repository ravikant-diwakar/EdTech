import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Github as GitHub, Clock, Cloud, CalendarCheck, ArrowRight } from 'lucide-react';
import CourseFeatures from './CourseFeatures';
import LearningFeatureCard from './LearningFeatureCard';
import Banner from './Banner';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow bg-black">

      {/* 1. Primary: Book & Course Management (The Banner) */}
      <Banner />



      {/* 3. Premium Learning Feature Section (Mirroring Hero) */}
      <section className="py-12 sm:py-20 bg-black relative overflow-hidden text-center">
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12 items-center">

            {/* Left Side - The Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1 mt-10 lg:mt-0">
              <LearningFeatureCard />
            </div>

            {/* Right Side - Text Content */}
            <div className="lg:col-span-6 lg:text-left order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Structured Learning, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Outcome Driven Results.
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Move beyond random tutorials. Our curriculum is designed by industry veterans to take you from a beginner to a job-ready developer with a structured roadmap, real-world projects, and continuous assessment.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/courses')}
                  className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                >
                  Explore Curriculum
                </button>
                <button
                  onClick={() => navigate('/mylearning')}
                  className="px-8 py-3 bg-transparent border border-gray-700 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                  My Learning Path
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Secondary: AI Interview Prep (Original Hero moved down) */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-sm text-gray-500">AI Powered Tools</span>
        </div>
      </div>

      {/* Hero Section */}
      {/* <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36"> */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 bg-[url('/home.jpg')] bg-cover bg-center opacity-90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl px-3 lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              {/* <div className="relative z-10 mx-auto max-w-2xl px-3 lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6 mt-8 sm:mt-0"> */}
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-fade-in">
                Prepare for Tech Interviews with AI
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-300 animate-fade-in-delay">
                <span className="relative inline-block align-middle">
                  <span className="inline-block px-1.5 py-0.5 border border-green-600 rounded-md text-white bg-black">
                    Upload your resume
                  </span>
                  <span className="absolute -top-2 -right-2 text-[8px] sm:text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-sm font-bold leading-none">
                    AI
                  </span>
                </span>
                <span className="ml-1 sm:ml-2 text-white">
                  and let our AI analyze your experience to provide{' '}
                  <span className="font-semibold text-white underline underline-offset-4 decoration-green-500">
                    personalized interview preparation guidance.
                  </span>
                </span>
              </p>

              <div className="mt-6 sm:mt-8 mb-16 sm:mb-0 flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/analyzer')}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg rounded-full border border-gray-600 text-gray-300 bg-[#0c0c0c] hover:bg-[#2a2a2a] transition duration-200 whitespace-nowrap"
                >
                  Analyze Resume
                  <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
              </div>
            </div>

            <div className="relative mt-8 sm:mt-12 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 flex justify-center lg:justify-end px-0 sm:px-6">
              {/* Outer border */}
              <div className="rounded-2xl w-screen max-w-full sm:max-w-lg border border-gray-800/50 p-[1px] bg-black">

                {/* Black gap between outer and inner */}
                <div className="bg-black p-[4px] rounded-2xl">

                  {/* Inner content box with its own border */}
                  <div className="bg-[#0e0e0f] rounded-2xl border border-[#2c2c2c] px-5 sm:px-8 py-6 sm:py-8 text-white space-y-5 sm:space-y-6 text-sm sm:text-lg">

                    <h2 className="text-lg sm:text-2xl font-semibold">AI Interview Prep Assistant</h2>

                    {/* Current Stage */}
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 mb-1">Current Stage</div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] sm:text-xs rounded-full bg-blue-800/30 text-blue-300 ring-1 ring-blue-500">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full" /> Beta Testing
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400">AI-Powered</span>
                        <div className="flex -space-x-1.5 sm:-space-x-2">
                          <div className="relative z-30 w-6 h-6 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="AI Dev" className="w-3.5 h-3.5" />
                          </div>
                          <div className="relative z-20 w-6 h-6 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="ML Engineer" className="w-3.5 h-3.5" />
                          </div>
                          <div className="relative z-10 w-6 h-6 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1087/1087815.png" alt="UX Designer" className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Features */}
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 mb-1">Core Features</div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <span className="flex items-center gap-1 text-[9px] sm:text-xs px-2 py-1 rounded bg-[#1c1c1c] border border-[#333]">
                          <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="resume" />
                          Upload Resume
                        </span>
                        <span className="flex items-center gap-1 text-[9px] sm:text-xs px-2 py-1 rounded bg-[#1c1c1c] border border-[#333] text-green-400">
                          <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="ai" />
                          AI Analysis
                        </span>
                        <span className="flex items-center gap-1 text-[9px] sm:text-xs px-2 py-1 rounded bg-[#1c1c1c] border border-[#333] text-yellow-300">
                          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="target" />
                          Role-Based Questions
                        </span>
                        <span className="flex items-center gap-1 text-[9px] sm:text-xs px-2 py-1 rounded bg-[#1c1c1c] border border-[#333] text-pink-300">
                          <img src="https://cdn-icons-png.flaticon.com/512/2950/2950651.png" className="w-3.5 h-3.5 sm:w-4 sm:h-4" alt="practice" />
                          Mock Interview Mode
                        </span>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <div className="text-xs sm:text-sm text-gray-400 mb-1">Development Milestones</div>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li className="text-green-300 flex items-center gap-1">
                          <span>✅</span>
                          <span className="text-white"> Resume Parser Integration</span>
                          <span className="text-gray-500 ml-auto">Complete</span>
                        </li>
                        <li className="text-green-300 flex items-center gap-1">
                          <span>✅</span>
                          <span className="text-white"> Initial AI Model Setup</span>
                          <span className="text-gray-500 ml-auto">Complete</span>
                        </li>
                        <li className="text-yellow-300 flex items-center gap-1">
                          <span>⏳</span> {/* Hourglass, progress indication */}
                          <span className="text-white">Interactive Interview Simulations</span>
                          <span className="text-gray-500 ml-auto">In Progress</span>
                        </li>
                        <li className="text-red-300 flex items-center gap-1">
                          <span>📅</span> {/* Calendar for upcoming */}
                          <span className="text-white">Public Launch</span>
                          <span className="text-gray-500 ml-auto">Q3 2025</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* new-features section */}
      <section className="py-8 sm:py-18 bg-black relative overflow-hidden">
        {/* Dotted Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs sm:text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Tech Interview Toolkit
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-0 md:mb-6">
                  Collaborate across<br />Modules and Features
                </h2>
              </div>
              <div>
                <p className="text-base sm:text-lg text-white/60">
                  Expand the capabilities of your interview preparation journey with a wide variety of AI-powered modules that keep your career growth aligned and focused.
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Intercom Card */}
            <div className="bg-black border border-white/15 rounded-xl flex flex-col">
              <div className="flex-1 p-4">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>AI Resume Analysis</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/40">now</span>
                  </div>
                  <div className="h-px bg-white/20 mb-4 w-full" />
                  <p className="text-sm text-white/80">We’ve analyzed your resume and ...</p>
                </div>

                <div className="p-3 bg-white/5 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">J</span>
                    </div>
                    <span className="text-sm text-white">Java Developer</span>
                    <span className="text-xs text-white/40">New request</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-4 h-4 text-white/60" />
                    <span className="text-sm text-white">Technical questions ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <CalendarCheck className="w-3 h-3" />
                    <span>Preparation</span>
                    <span className="mx-2">·</span>
                    <span>Q4 2025</span>
                  </div>
                </div>
              </div>
              <div
                className="p-4 border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                onClick={() => navigate('/analyzer')}
                role="button"
                tabIndex={0}
              >
                <div className="text-sm text-white/40 mb-1">Personalized Interview Guidance</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">
                    Tailored prep plans from<br />your resume
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>


            {/* Mobile Card */}
            <div className="bg-black border border-white/15 rounded-xl flex flex-col">
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="w-48 h-80 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl rotate-12 relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* LinkedIn Logo SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 mb-2 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.594 1.997 3.594 4.59v5.606z" />
                    </svg>
                    <span className="text-xl font-medium text-gray-500">LinkedIn</span>
                  </div>

                </div>
              </div>
              <div
                className="p-4 border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                onClick={() => navigate('/linkedin-boost')}
                role="button"
                tabIndex={0}
              >
                <div className="text-sm text-white/40 mb-1">LinkedIn Optimization</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">
                    Boost your profile to attract top<br />recruiters and opportunities
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>

            {/* Linear Asks Card */}
            <div className="bg-black border border-white/15 rounded-xl flex flex-col">
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-[#5e6ad2]/20 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div
                className="p-4 border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                onClick={() => navigate('/interview')}
                role="button"
                tabIndex={0}
              >
                <div className="text-sm text-white/40 mb-1">AI Interview Simulator</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">
                    Practice real interviews with<br />instant feedback
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </div>
              </div>

            </div>
            {/* GitHub Card */}
            <div className="bg-black border border-white/15 rounded-xl flex flex-col">
              <div className="flex-1 p-4">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <GitHub className="w-4 h-4" />
                    <span>github.com/ravikant-diwakar</span>
                  </div>
                  <div className="h-px bg-white/20 mb-4 w-full" />
                </div>

                <div className="space-y-4">
                  {[
                    "Interview prep guide uploaded",
                    "Latest notes available for review",
                    "Practice with common interview questions",
                    "Company-specific PYQs added",
                    "New resources updated for 2025",
                  ].map((text, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-4 border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                onClick={() => navigate('/smart-prep')}
                role="button"
                tabIndex={0}
              >
                <div className="text-sm text-white/40 mb-1">More Career Tools</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">
                    Unlock expert tools for<br />career growth
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* new-features-section ends*/}

      <section className="py-12 md:py-16 lg:py-20 bg-black relative overflow-hidden">
        {/* Dotted Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Side - Text Content */}
            <div className="text-white">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                Unlock the Power of AI <br className="hidden sm:block" />
                for Smarter Preparation
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Our advanced AI tools simplify your preparation process with smart resume analysis and tailored interview planning.
                Get actionable insights in minutes, not days.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="w-full flex justify-center">
              <img
                src="/skilln.png"
                alt="AI Process Illustration"
                className="w-full max-w-md md:max-w-lg h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <CourseFeatures />

      {/* Features Section */}
      {/* <section className="py-10 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-tight text-white animate-fade-in">
              Why Choose SkillN?
            </h2>

            <button
              className="mt-3 inline-flex items-center gap-1 rounded-full border border-gray-600 bg-[#0c0c0c] px-2.5 py-[2px] text-[10px] sm:text-xs text-gray-300 hover:bg-[#2a2a2a] transition duration-200 whitespace-nowrap"
            >
              AI-powered interview preparation by SkillN
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                icon={<BrainCircuit className="h-8 w-8" />}
                title="AI-Powered Analysis"
                description="Advanced AI analyzes your resume to identify key areas for interview focus"
              />
              <Feature
                icon={<Target className="h-8 w-8" />}
                title="Targeted Preparation"
                description="Get personalized suggestions for topics to study based on your experience"
              />
              <Feature
                icon={<Sparkles className="h-8 w-8" />}
                title="Skills Assessment"
                description="Detailed analysis of your technical skills and project experience"
              />
              <Feature
                icon={<Users className="h-8 w-8" />}
                title="Interview Ready"
                description="Prepare effectively with insights from thousands of successful interviews"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-12 sm:py-24 bg-black relative overflow-hidden">
        {/* Dotted Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-0 lg:flex lg:items-center lg:justify-between">
            {/* Left side - Title */}
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-5xl font-bold text-white leading-tight animate-fade-in">
                How Our AI Powered <br className="hidden sm:block" />
                Process Works
              </h2>
            </div>

            {/* Right side - Paragraph */}
            <div className="mt-6 lg:mt-0 max-w-xl text-gray-400 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 animate-fade-in-delay">
              <p>
                Complete three easy steps to get a personalized interview preparation plan tailored specifically to your skills and experience.{' '}
                <span className="text-white font-semibold hover:underline cursor-pointer">Analyze Resume →</span>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 py-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Step
                number="1"
                title="Upload Resume"
                description="Upload your resume in PDF or DOCX format"
              />
              <Step
                number="2"
                title="AI Analysis"
                description="Our AI analyzes your experience and skills"
              />
              <Step
                number="3"
                title="Get Insights"
                description="Receive personalized interview preparation guidance"
              />
            </div>
          </div>
        </div>
      </section>





















      <CourseFeatures />
    </main>
  );
};

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="relative p-6 bg-black rounded-xl border border-gray-800 hover:border-blue-500 transition-all duration-200 animate-fade-in-delay">
      <div className="absolute -top-4 left-6 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-white mt-4 mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

export default HomePage;