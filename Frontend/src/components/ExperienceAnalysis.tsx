import React from 'react';
import { ExperienceAnalysis as ExperienceAnalysisType } from '../types';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceAnalysisProps {
  experiences: ExperienceAnalysisType[];
}

const ExperienceAnalysis: React.FC<ExperienceAnalysisProps> = ({ experiences }) => {
  const [expandedExperiences, setExpandedExperiences] = React.useState<string[]>([]);

  const toggleExperience = (company: string) => {
    setExpandedExperiences(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <Briefcase size={24} className="text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-white">Experience Analysis</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Analysis of the skills and technologies from your work experience.
      </p>
      
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="flex items-center justify-between p-4 bg-white cursor-pointer"
              onClick={() => toggleExperience(experience.company)}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{experience.role}</h3>
                <p className="text-gray-600">{experience.company}</p>
              </div>
              
              <button className="text-gray-500 hover:text-gray-700">
                {expandedExperiences.includes(experience.company) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            
            {expandedExperiences.includes(experience.company) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center"
                      >
                        <span className="text-gray-800">{tech.name}</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                          {tech.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        className="bg-primary-50 px-3 py-1 rounded-full border border-primary-200 text-primary-700"
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Interview Focus Areas:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {experience.interviewFocus.map((focus, idx) => (
                      <li key={idx}>{focus}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAnalysis;