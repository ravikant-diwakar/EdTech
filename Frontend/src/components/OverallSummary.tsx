import React from 'react';
import { Lightbulb } from 'lucide-react';

interface OverallSummaryProps {
  summary: string;
}

const OverallSummary: React.FC<OverallSummaryProps> = ({ summary }) => {
  if (!summary) return null;

  const paragraphs = summary.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary-900/20 to-primary-600/20 rounded-xl border border-primary-500/20 p-6 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-lg shadow-lg mr-4">
            <Lightbulb size={18} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
            AI Analysis Summary
          </h2>
        </div>

        <div className="space-y-4 text-base">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className="text-gray-300 leading-relaxed animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {/* <div className="space-y-4 text-base">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-300 leading-relaxed animate-fade-in text-justify"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div> */}

      </div>
    </div>
  );
};

export default OverallSummary;