// import React, { useState } from 'react';
// import { Linkedin, Upload, Sparkles, User, Briefcase, GraduationCap, Code, Target, CheckCircle, Camera, Award } from 'lucide-react';
// import FileUpload from './FileUpload';
// import LoadingState from './LoadingState';
// import EmptyState from './EmptyState';
// import { parseResume } from '../services/resumeParser';
// import { generateLinkedInSuggestions } from '../services/groqService';

// interface LinkedInSuggestions {
//   headline: string;
//   aboutSection: string;
//   workExperience: string[];
//   education: string;
//   projects: string;
//   finalTips: string[];
//   keywords: string[];
//   profilePhotoTips: string[];
//   skillsRecommendations: string[];
// }

// const LinkedInBooster: React.FC = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [suggestions, setSuggestions] = useState<LinkedInSuggestions | null>(null);
//   const [resumeText, setResumeText] = useState<string>('');

//   const handleFileSelected = async (file: File) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const extractedText = await parseResume(file);
//       setResumeText(extractedText);

//       const result = await generateLinkedInSuggestions(extractedText);
//       setSuggestions(result);
//     } catch (error) {
//       console.error('Error processing resume:', error);
//       setError(typeof error === 'object' && error !== null && 'message' in error
//         ? String(error.message)
//         : 'An error occurblack while processing your resume. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     // You could add a toast notification here
//   };

//   const LinkedInEmptyState = () => (
//     <div className="flex flex-col items-center justify-center py-12 text-center">
//       {/* <div className="bg-black-600 p-8 rounded-full text-white mb-8">
//         <Linkedin size={56} />
//       </div> */}

//       {/* <h2 className="text-3xl font-bold text-white mb-4">Boost Your LinkedIn Profile</h2> */}

//       {/* <p className="text-gray-400 text-lg max-w-2xl mb-8">
//         Upload your resume and get AI-poweblack suggestions to optimize your LinkedIn profile for maximum visibility and engagement.
//       </p> */}

//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
//         <div className="feature-card">
//           <div className="flex items-start space-x-4">
//             <div className="text-black-500 mt-1">
//               <Sparkles size={24} />
//             </div>
//             <div className="flex-1 text-left">
//               <h3 className="font-semibold text-white text-xl mb-2">What We'll Optimize</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Professional headline with industry keywords
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Compelling About section that showcases value
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Work experience with measurable achievements
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Project descriptions that tell a story
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="feature-card">
//           <div className="flex items-start space-x-4">
//             <div className="text-black-500 mt-1">
//               <Target size={24} />
//             </div>
//             <div className="flex-1 text-left">
//               <h3 className="font-semibold text-white text-xl mb-2">What You'll Get</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Ready-to-use content for each section
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Industry-specific keywords and phrases
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Professional photo and layout tips
//                 </li>
//                 <li className="flex items-center">
//                   <span className="mr-2">•</span>
//                   Skills and endorsement recommendations
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       {/* <div className="bg-black text-white px-6 py-0 md:flex md:justify-between md:items-center"> */}
//       <div className="bg-black text-white px-0 py-0 md:py-12 md:flex md:justify-between md:items-center">

//         <div className="md:w-1/2 space-y-6">
//           <h2 className="text-2xl text-left md:text-4xl font-semibold">
//             Instantly get a free LinkedIn profile review
//           </h2>
//           <p className="text-sm text-justify text-left text-gray-400 md:text-base">
//             95% of all recruiters and hiring managers use LinkedIn to find candidates. LinkedIn is more important than ever in building your personal brand and career.
//           </p>
//           <p className="text-sm text-justify text-left text-gray-400 md:text-base">
//             However, most people don’t take advantage of LinkedIn. Most profiles on LinkedIn are vague and aren’t optimized for what recruiters are looking for. Our AI-powered engine gives you detailed tips to improve your LinkedIn profile, including headline examples, so you don’t miss out on opportunities.
//           </p>
//           {/* okk */}
//         </div>
//         <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
//           <img src="Instantly.png" alt="LinkedIn Profile Review Illustration" className="w-full max-w-md" />
//         </div>
//       </div>

//       {/* <div className="bg-black text-white px-0 py-0 grid md:grid-cols-2 gap-5 items-center">
//         <div className="flex justify-center">
//           <img src="linkedin-logo.png" alt="LinkedIn Opportunity Graphic" className="w-full max-w-sm" />
//         </div>
//         <div className="space-y-6">
//           <h2 className="text-2xl text-left md:text-4xl font-semibold">
//             Get more opportunities on LinkedIn
//           </h2>
//           <p className="text-sm text-justify text-left text-gray-400 md:text-base">
//             Our AI-powered technology identifies gaps in your LinkedIn profile and gives you intelligent tips on how to rank higher. Increase your profile visibility by up to 5x and boost your chances of getting noticed by top recruiters and prospects.
//           </p>
//         </div>
//       </div> */}
//     </div>
//   );

//   return (
//     <main className="flex-grow container mx-auto px-4 py-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         {/* <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <div className="bg-black-600 p-3 rounded-full mr-4">
//               <Linkedin size={32} className="text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-white">LinkedIn Profile Booster</h1>
//           </div>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Transform your LinkedIn profile with AI-poweblack suggestions. Upload your resume and get personalized recommendations to attract recruiters and opportunities.
//           </p>
//         </div> */}
//         <section className="w-full text-white py-5 px-0">
//           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

//             {/* Left Side Content */}
//             <div>
//               <p className="uppercase text-sm tracking-wider text-white/70 mb-12">
//                 Free LinkedIn Boost
//               </p>

//               <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
//                 Get found on LinkedIn
//               </h2>

//               <p className="text-lg text-white/80 mb-10 max-w-xl">
//                 Get tailored tips to instantly optimize your LinkedIn profile. Increase your visibility and unlock up to 5x more job opportunities, leads, and professional connections.
//               </p>

//               {/* Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition">
//                   Get a free review
//                 </button>
//                 <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition">
//                   See preview
//                 </button>
//               </div>
//             </div>

//             {/* Right Side Image with Browser Frame */}
//             <div className="w-full flex justify-center lg:justify-end">
//               <div className="w-full max-w-[450px] bg-[#0e0e0e] rounded-xl shadow-2xl border border-white/10 overflow-hidden">

//                 {/* Top Bar with Dots */}
//                 <div className="flex items-center px-4 py-2 bg-[#1e1e1e] border-b border-white/5">
//                   <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
//                   <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
//                   <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//                 </div>

//                 {/* Screenshot Image */}
//                 <img
//                   src="/linkedin.png"
//                   alt="LinkedIn Review Preview"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>
//             </div>

//           </div>
//         </section>

//         <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />

//         {error && (
//           <div className="bg-black-900/30 border border-black-700/30 text-black-200 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}

//         {isLoading ? (
//           <LoadingState />
//         ) : suggestions ? (
//           <div className="space-y-8">
//             {/* Keywords Section */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-4 sm:p-4 md:p-6">
//               <div className="flex items-center mb-4">
//                 <Target size={24} className="text-green-500 mr-3" />
//                 <h2 className="text-xl font-bold text-green-500">Industry Keywords</h2>
//               </div>
//               <p className="text-gray-300 mb-4">Use these keywords throughout your profile to improve visibility:</p>
//               <div className="flex flex-wrap gap-2">
//                 {suggestions.keywords.map((keyword, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-black-900/30 text-black-300 rounded-full text-sm border border-black-700/30"
//                   >
//                     {keyword}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Headline Section */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-4 sm:p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <User size={24} className="text-green-500 mr-3" />
//                   <h2 className="text-xl font-bold text-green-500">Professional Headline</h2>
//                 </div>
//                 <button
//                   onClick={() => copyToClipboard(suggestions.headline)}
//                   className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
//                 >
//                   Copy
//                 </button>
//               </div>
//               <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                 <p className="text-gray-300 leading-relaxed">{suggestions.headline}</p>
//               </div>
//             </div>

//             {/* About Section */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <Sparkles size={24} className="text-green-500 mr-3" />
//                   <h2 className="text-xl font-bold text-green-500">About Me Section</h2>
//                 </div>
//                 <button
//                   onClick={() => copyToClipboard(suggestions.aboutSection)}
//                   className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
//                 >
//                   Copy
//                 </button>
//               </div>
//               <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                 <div className="whitespace-pre-line text-gray-300 leading-relaxed">
//                   {suggestions.aboutSection}
//                 </div>
//               </div>
//             </div>

//             {/* Work Experience */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center mb-4">
//                 <Briefcase size={34} className="text-green-500 mr-3" />
//                 <h2 className="text-xl font-bold text-green-500">Work Experience: What to Write & What to CUT!</h2>
//               </div>
//               <div className="space-y-2">
//                 {suggestions.workExperience.map((tip, index) => (
//                   <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                     <div className="flex items-start">
//                       <CheckCircle size={16} className="text-black-400 mr-2 mt-1.5 flex-shrink-0" />
//                       <p className="text-gray-300 leading-relaxed">{tip}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Education */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <GraduationCap size={44} className="text-green-500 mr-3" />
//                   <h2 className="text-xl font-bold text-green-500">Education: Make It More Than Just a Degree</h2>
//                 </div>
//                 <button
//                   onClick={() => copyToClipboard(suggestions.education)}
//                   className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
//                 >
//                   Copy
//                 </button>
//               </div>
//               <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                 <div className="whitespace-pre-line text-gray-300 leading-relaxed">
//                   {suggestions.education}
//                 </div>
//               </div>
//             </div>

//             {/* Projects */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <Code size={34} className="text-green-500 mr-3" />
//                   <h2 className="text-xl font-bold text-green-500">Projects: Show, Don't Just Tell!</h2>
//                 </div>
//                 <button
//                   onClick={() => copyToClipboard(suggestions.projects)}
//                   className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
//                 >
//                   Copy
//                 </button>
//               </div>
//               <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                 <div className="whitespace-pre-line text-gray-300 leading-relaxed">
//                   {suggestions.projects}
//                 </div>
//               </div>
//             </div>

//             {/* Skills Recommendations */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center mb-4">
//                 <Award size={24} className="text-green-500 mr-3" />
//                 <h2 className="text-xl font-bold text-green-500">Skills & Endorsements</h2>
//               </div>
//               <p className="text-gray-300 mb-4">Top skills to add for your target roles:</p>
//               <div className="space-y-3">
//                 {suggestions.skillsRecommendations.map((skill, index) => (
//                   <div key={index} className="bg-black/50 rounded-lg p-3 border border-gray-800">
//                     <p className="text-gray-300">{skill}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Profile Photo Tips */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center mb-4">
//                 <Camera size={34} className="text-green-500 mr-3" />
//                 <h2 className="text-xl font-bold text-green-500">Professional Profile Photo & Layout Tips</h2>
//               </div>
//               <div className="space-y-4">
//                 {suggestions.profilePhotoTips.map((tip, index) => (
//                   <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                     <div className="flex items-start">
//                       <CheckCircle size={16} className="text-black-400 mr-2 mt-1 flex-shrink-0" />
//                       <p className="text-gray-300 leading-relaxed">{tip}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Final Tips */}
//             <div className="bg-gradient-to-r from-black-900/20 to-black-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
//               <div className="flex items-center mb-4">
//                 <Sparkles size={24} className="text-green-500 mr-3" />
//                 <h2 className="text-xl font-bold text-green-500">Final Tips for Profile Success</h2>
//               </div>
//               <div className="space-y-4">
//                 {suggestions.finalTips.map((tip, index) => (
//                   <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                     <div className="flex items-start">
//                       <CheckCircle size={16} className="text-black-400 mr-2 mt-1 flex-shrink-0" />
//                       <p className="text-gray-300 leading-relaxed">{tip}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Summary */}
//             <div className="bg-gradient-to-r from-primary-900/20 to-primary-600/20 rounded-xl border border-primary-500/20 p-4 backdrop-blur-sm">
//               <h2 className="text-2xl font-bold text-green-500 mb-6">🚀 Ready to Transform Your LinkedIn?</h2>
//               <p className="text-gray-300 text-lg mb-6">
//                 You now have all the tools to create a compelling LinkedIn profile that stands out to recruiters and hiring managers.
//                 Start implementing these suggestions one section at a time for maximum impact.
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                   <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 1</h3>
//                   <p className="text-gray-300 text-sm">Update your headline and about section first</p>
//                 </div>
//                 <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                   <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 2</h3>
//                   <p className="text-gray-300 text-sm">Optimize work experience with achievements</p>
//                 </div>
//                 <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
//                   <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 3</h3>
//                   <p className="text-gray-300 text-sm">Add skills and update your profile photo</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <LinkedInEmptyState />
//           // <div className="max-w-5xl mx-auto">
//           //   <LinkedInEmptyState />
//           // </div>

//         )}
//       </div>
//     </main>
//   );
// };

// export default LinkedInBooster;


import React, { useState, useRef } from 'react';
import { Linkedin, Upload, Sparkles, User, Briefcase, GraduationCap, Code, Target, CheckCircle, Camera, Award } from 'lucide-react';
import FileUpload from './FileUpload';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { parseResume } from '../services/resumeParser';
import { generateLinkedInSuggestions } from '../services/groqService';

interface LinkedInSuggestions {
  headline: string;
  aboutSection: string;
  workExperience: string[];
  education: string;
  projects: string;
  finalTips: string[];
  keywords: string[];
  profilePhotoTips: string[];
  skillsRecommendations: string[];
}

const LinkedInBooster: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<LinkedInSuggestions | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  
  // Create a ref for the file upload section
  const fileUploadRef = useRef<HTMLDivElement>(null);

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const extractedText = await parseResume(file);
      setResumeText(extractedText);

      const result = await generateLinkedInSuggestions(extractedText);
      setSuggestions(result);
    } catch (error) {
      console.error('Error processing resume:', error);
      setError(typeof error === 'object' && error !== null && 'message' in error
        ? String(error.message)
        : 'An error occurred while processing your resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Function to scroll to file upload section
  const scrollToFileUpload = () => {
    fileUploadRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Function to open PDF preview
  const openPDFPreview = () => {
    // Open the LinkedIn preview PDF in a new window
    window.open('/linkedin-preview.pdf', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
  };

  const LinkedInEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-black text-white px-0 py-0 md:py-12 md:flex md:justify-between md:items-center">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl text-left md:text-4xl font-semibold">
            Instantly get a free LinkedIn profile review
          </h2>
          <p className="text-sm text-justify text-left text-gray-400 md:text-base">
            95% of all recruiters and hiring managers use LinkedIn to find candidates. LinkedIn is more important than ever in building your personal brand and career.
          </p>
          <p className="text-sm text-justify text-left text-gray-400 md:text-base">
            However, most people don't take advantage of LinkedIn. Most profiles on LinkedIn are vague and aren't optimized for what recruiters are looking for. Our AI-powered engine gives you detailed tips to improve your LinkedIn profile, including headline examples, so you don't miss out on opportunities.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src="Instantly.png" alt="LinkedIn Profile Review Illustration" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <section className="w-full text-white py-5 px-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Side Content */}
            <div>
              <p className="uppercase text-sm tracking-wider text-white/70 mb-12">
                Free LinkedIn Boost
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Get found on LinkedIn
              </h2>

              <p className="text-lg text-white/80 mb-10 max-w-xl">
                Get tailored tips to instantly optimize your LinkedIn profile. Increase your visibility and unlock up to 5x more job opportunities, leads, and professional connections.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={scrollToFileUpload}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  Get a free review
                </button>
                <button 
                  onClick={openPDFPreview}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
                >
                  See preview
                </button>
              </div>
            </div>

            {/* Right Side Image with Browser Frame */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[450px] bg-[#0e0e0e] rounded-xl shadow-2xl border border-white/10 overflow-hidden">

                {/* Top Bar with Dots */}
                <div className="flex items-center px-4 py-2 bg-[#1e1e1e] border-b border-white/5">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>

                {/* Screenshot Image */}
                <img
                  src="/linkedin.png"
                  alt="LinkedIn Review Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* File Upload Section with ref */}
        <div ref={fileUploadRef}>
          <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700/30 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingState />
        ) : suggestions ? (
          <div className="space-y-8">
            {/* Keywords Section */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-4 sm:p-4 md:p-6">
              <div className="flex items-center mb-4">
                <Target size={24} className="text-green-500 mr-3" />
                <h2 className="text-xl font-bold text-green-500">Industry Keywords</h2>
              </div>
              <p className="text-gray-300 mb-4">Use these keywords throughout your profile to improve visibility:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-900/30 text-gray-300 rounded-full text-sm border border-gray-700/30"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Headline Section */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-4 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <User size={24} className="text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-green-500">Professional Headline</h2>
                </div>
                <button
                  onClick={() => copyToClipboard(suggestions.headline)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <p className="text-gray-300 leading-relaxed">{suggestions.headline}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Sparkles size={24} className="text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-green-500">About Me Section</h2>
                </div>
                <button
                  onClick={() => copyToClipboard(suggestions.aboutSection)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {suggestions.aboutSection}
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center mb-4">
                <Briefcase size={34} className="text-green-500 mr-3" />
                <h2 className="text-xl font-bold text-green-500">Work Experience: What to Write & What to CUT!</h2>
              </div>
              <div className="space-y-2">
                {suggestions.workExperience.map((tip, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-2 mt-1.5 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GraduationCap size={44} className="text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-green-500">Education: Make It More Than Just a Degree</h2>
                </div>
                <button
                  onClick={() => copyToClipboard(suggestions.education)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {suggestions.education}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Code size={34} className="text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-green-500">Projects: Show, Don't Just Tell!</h2>
                </div>
                <button
                  onClick={() => copyToClipboard(suggestions.projects)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {suggestions.projects}
                </div>
              </div>
            </div>

            {/* Skills Recommendations */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center mb-4">
                <Award size={24} className="text-green-500 mr-3" />
                <h2 className="text-xl font-bold text-green-500">Skills & Endorsements</h2>
              </div>
              <p className="text-gray-300 mb-4">Top skills to add for your target roles:</p>
              <div className="space-y-3">
                {suggestions.skillsRecommendations.map((skill, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-300">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Photo Tips */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center mb-4">
                <Camera size={34} className="text-green-500 mr-3" />
                <h2 className="text-xl font-bold text-green-500">Professional Profile Photo & Layout Tips</h2>
              </div>
              <div className="space-y-4">
                {suggestions.profilePhotoTips.map((tip, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Tips */}
            <div className="bg-gradient-to-r from-gray-900/20 to-gray-600/20 rounded-xl border border-gray-100/20 p-3 sm:p-4 md:p-6">
              <div className="flex items-center mb-4">
                <Sparkles size={24} className="text-green-500 mr-3" />
                <h2 className="text-xl font-bold text-green-500">Final Tips for Profile Success</h2>
              </div>
              <div className="space-y-4">
                {suggestions.finalTips.map((tip, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Summary */}
            <div className="bg-gradient-to-r from-primary-900/20 to-primary-600/20 rounded-xl border border-primary-500/20 p-4 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-green-500 mb-6">🚀 Ready to Transform Your LinkedIn?</h2>
              <p className="text-gray-300 text-lg mb-6">
                You now have all the tools to create a compelling LinkedIn profile that stands out to recruiters and hiring managers.
                Start implementing these suggestions one section at a time for maximum impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 1</h3>
                  <p className="text-gray-300 text-sm">Update your headline and about section first</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 2</h3>
                  <p className="text-gray-300 text-sm">Optimize work experience with achievements</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">Step 3</h3>
                  <p className="text-gray-300 text-sm">Add skills and update your profile photo</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LinkedInEmptyState />
        )}
      </div>
    </main>
  );
};

export default LinkedInBooster;