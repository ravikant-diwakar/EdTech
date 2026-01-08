import React, { useRef } from 'react';
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  onGetFreeReview?: () => void;
  onSeePreview?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGetFreeReview, onSeePreview }) => {
  return (
    <div className="w-full bg-transparent overflow-hidden m-0 p-0 relative z-10">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 pb-4">
        {/* Left Side */}
        <div className="pr-4">
          <p className="uppercase text-sm tracking-wider text-white/70 mb-12">
            Personalized Interview Guidance
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight -mt-4 lg:mt-0 mb-5">
            Ready to Analyze Your Resume
          </h1>

          <p className="text-base text-gray-300 mb-12 max-w-xl">
            Upload your resume in <span className="text-green-400 font-medium">PDF</span> or <span className="text-green-400 font-medium">DOCX</span> format, and let our AI evaluate it to offer powerful insights and interview guidance tailored to your profile.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onGetFreeReview}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              Get a free review
            </button>
            <button
              onClick={onSeePreview}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              See preview
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
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
              src="/analyzer.png"
              alt="Resume Analyzer Preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;