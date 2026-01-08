import React from 'react';
import { Loader2, CheckCircle, CircleDot } from 'lucide-react';

interface LoadingStateProps {
  currentStep?: number;
}

const steps = [
  "Extracting resume content",
  "Identifying skills and experience",
  "Analyzing for interview preparation",
  "Preparing recommendations",
];

const LoadingState: React.FC<LoadingStateProps> = ({ currentStep = 2 }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Loader2 className="w-10 h-10 text-white animate-spin mb-6" />
      <h2 className="text-2xl font-semibold mb-2 text-white">Analyzing your resume…</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        We're analyzing your resume to identify key areas for interview preparation.
      </p>

      <div className="space-y-5 text-left w-full max-w-md">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex items-center gap-3 relative">
              {isCompleted ? (
                <div className="relative">
                  <CheckCircle className="text-green-500 w-5 h-5 animate-pulse" />
                </div>
              ) : isCurrent ? (
                <CircleDot className="text-blue-500 w-5 h-5 animate-ping" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-500 animate-pulse opacity-40" />
              )}

              <span
                className={`text-sm ${
                  isCompleted
                    ? 'text-green-500'
                    : isCurrent
                    ? 'text-blue-500 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {step}
              </span>

              {/* Animated bar under each */}
              <div className="ml-auto w-24 h-1 bg-gray-700 rounded overflow-hidden">
                <div
                  className={`h-full ${
                    isCompleted || isCurrent
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 animate-loading-bar'
                      : 'bg-gray-500'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
