import React from 'react';
import { ProjectAnalysis as ProjectAnalysisType } from '../types';
import { Code, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';

interface ProjectAnalysisProps {
  projects: ProjectAnalysisType[];
}

const ProjectAnalysis: React.FC<ProjectAnalysisProps> = ({ projects }) => {
  const [expandedProjects, setExpandedProjects] = React.useState<string[]>([]);

  const toggleProject = (projectName: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectName) 
        ? prev.filter(p => p !== projectName)
        : [...prev, projectName]
    );
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <Code size={24} className="text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-white">Project Analysis</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Analysis of the technologies and skills demonstrated in your projects.
      </p>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="flex items-center justify-between p-4 bg-white cursor-pointer"
              onClick={() => toggleProject(project.name)}
            >
              <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
              <button className="btn-secondary py-1 px-3 text-sm">
                {expandedProjects.includes(project.name) ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            
            {expandedProjects.includes(project.name) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-success-50 p-3 rounded border border-success-500/20">
                    <div className="flex items-center mb-2">
                      <ThumbsUp size={18} className="text-primary-700 mr-2" />
                      <h5 className="font-medium text-primary-700">Strengths</h5>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {project.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-error-50 p-3 rounded border border-error-500/20">
                    <div className="flex items-center mb-2">
                      <ThumbsDown size={18} className="text-primary-700 mr-2" />
                      <h5 className="font-medium text-primary-700">Areas to Improve</h5>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {project.weaknesses.map((weakness, idx) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-primary-100 p-3 rounded border border-primary-500/20">
                    <div className="flex items-center mb-2">
                      <Lightbulb size={18} className="text-primary-700 mr-2" />
                      <h5 className="font-medium text-primary-700">Interview Focus</h5>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {project.interviewFocus.map((focus, idx) => (
                        <li key={idx}>{focus}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAnalysis;