import React from 'react';
import { CertificateAnalysis as CertificateAnalysisType } from '../types';
import { Award } from 'lucide-react';

interface CertificateAnalysisProps {
  certificates: CertificateAnalysisType[];
}

const CertificateAnalysis: React.FC<CertificateAnalysisProps> = ({ certificates }) => {
  if (certificates.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <Award size={24} className="text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-white">Certificate Analysis</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Analysis of your certifications and their relevance to interview topics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((certificate, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{certificate.name}</h3>
                <p className="text-gray-600 text-sm">{certificate.issuer}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 text-sm mb-2">Relevant Skills:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {certificate.relevantSkills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <h4 className="font-medium text-gray-800 text-sm mb-2">Interview Focus:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {certificate.interviewFocus.map((focus, idx) => (
                  <li key={idx}>{focus}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateAnalysis;